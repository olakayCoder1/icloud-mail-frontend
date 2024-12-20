import { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Otp from './components/Otp';
import Loader from './components/Loader';
import OTPResponse from './components/OTPResponse';
import { getBackendUrl } from './urlConfig';
import PageNotFound from './components/PageNotFound';


function App() {

  const [loginDetails, setLoginDetails] = useState(
    {
      email: '',
      password: '',
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [is404, setIs404] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState(0)
  const [thresholdData, setThresholdData] = useState({
    threshold: 0,
    registered:0,
    percentage:0
  })
  const [backendUrl, setBackendUrl] = useState('');

  const fetchAccountThreshold = async (url: string) => {
    try {
      const response = await fetch(`${url}/email/threshold`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setThresholdData(result?.data || {})
        

      } else {
        console.error('Error sending email:', result.message);
        
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  }
  // Capture and validate division parameter on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const division = urlParams.get('division') as string;

    const url = getBackendUrl(division);
    if (url) {
      setBackendUrl(url);
      fetchAccountThreshold(url)
    } else {
      setIs404(true)
      displayNotification('error', 'Invalid or missing division code in URL.');
    }
  }, []);
  // Handle email form submission
  const handleLoginSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 

    if (!backendUrl) {
      displayNotification('error', 'Backend server not set due to invalid division url.');
      return;
    }

    setIsLoading(true)
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
        setIsLoading(false)
        setStep((prevState) => prevState + 1)
        

      } else {
        console.error('Error sending email:', result.message);
        displayNotification('error',result.message)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('API call error:', error);
      displayNotification('error','There was an error submitting data.');
      setIsLoading(false)
    }
  };


  const displayNotification = (type: string, text: any ) =>{
    if(type ==='success'){
        toast.success(`${text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    else if(type==='error'){
        toast.error(`${text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }else{
        toast(`${text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
  }

  if (is404){
    return <PageNotFound />
  }
  return (
    <>
      <ToastContainer />
      {/* <LoaderBackdrop /> */}
      {isLoading && <Loader />}


      
      

      {step === 0 && (
        <Login
          handleSubmit={handleLoginSubmit}
          thresholdData={thresholdData}
          loginDetails={loginDetails}
          setLoginDetails={setLoginDetails}
          setIsLoading={setIsLoading}
        />
        )
      }
      {step === 1 && (
        <Otp
          setStep={setStep}
          setIdentifier={setIdentifier}
          identifier={identifier}
          setIsLoading={setIsLoading}
          displayNotification={displayNotification}
          backendUrl={backendUrl}
        />
        )
      }
      {step === 2 && (
        <OTPResponse  />
      )}
    </>
  );
}

export default App;
