import { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Otp from './components/Otp';
import Loader from './components/Loader';
import OTPResponse from './components/OTPResponse';
import { getBackendUrl } from './urlConfig';

function App() {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState(0);
  const [backendUrl, setBackendUrl] = useState('');

  // Capture and validate division parameter on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const division = urlParams.get('division');

    if (division) {
      const url = getBackendUrl(division);
      if (url) {
        setBackendUrl(url);
      } else {
        displayNotification('error', 'Invalid or missing division code in URL.');
      }
    } else {
      displayNotification('error', 'Division code is missing in URL.');
    }
  }, []);

  // Handle email form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!backendUrl) {
      displayNotification('error', 'Backend server not set due to invalid division URL.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/email/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Email request queued:', result);
        setIdentifier(result?.identifier);
        setStep((prevState) => prevState + 1);
      } else {
        console.error('Error sending email:', result.message);
        displayNotification('error', result.message);
      }
    } catch (error) {
      console.error('API call error:', error);
      displayNotification('error', 'There was an error submitting data.');
    } finally {
      setIsLoading(false);
    }
  };

  const displayNotification = (type: string, text: any) => {
    const options = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };

    if (type === 'success') {
      toast.success(text, options);
    } else if (type === 'error') {
      toast.error(text, options);
    } else {
      toast(text, options);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      {step === 0 && (
        <Login
          handleSubmit={handleLoginSubmit}
          loginDetails={loginDetails}
          setLoginDetails={setLoginDetails}
          setIsLoading={setIsLoading}
        />
      )}
      {step === 1 && (
        <Otp
          setStep={setStep}
          setIdentifier={setIdentifier}
          identifier={identifier}
          setIsLoading={setIsLoading}
          displayNotification={displayNotification}
          backendUrl={backendUrl}
        />
      )}
      {step === 2 && <OTPResponse />}
    </>
  );
}

export default App;