import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailSender from './components/EmailSender';
import Login from './components/Login';
import Otp from './components/Otp';
import Loader from './components/Loader';
import OTPResponse from './components/OTPResponse';


interface LoginProps {
  email: string;
  password: string;
}


function App() {
  const [emailData, setEmailData] = useState({
    email: 'test@test.com',
    password: 'test',
    to: 'test@test.com',
    subject: 'test subject',
    body: 'This can be dynamically generated or passed from somewhere else',
    queue_id: 'some-unique-id', // 
  });

  const [loginDetails, setLoginDetails] = useState(
    {
      email: '',
      password: '',
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState(0)



  const handleLogin = ({ password, email }: LoginProps) => {
    setIsLoading(true)
    setTimeout(() => {
      setEmailData((prevState) => ({
        ...prevState,
        email,
        password,
      }));
      // increase step by 1
      setStep(step + 1)
      setIsLoading(false)
      }, 3000);
  };


  // Handle email form submission
  const handleLoginSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 

    setIsLoading(true)
    try {
      const response = await fetch('https://icloud-mail-backend.onrender.com/api/v1/email/login', {
      // const response = await fetch('http://127.0.0.1:5000/api/v1/email/login', {
      // const response = await fetch('https://icloud-mail-backend.onrender.com/api/v1/email/initiate', {
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
  return (
    <>
      <ToastContainer />
      {/* <LoaderBackdrop /> */}
      {isLoading && <Loader />}
      {step === 0 && (
        <Login
          onLogin={handleLogin}
          handleSubmit={handleLoginSubmit}
          loginDetails={loginDetails}
          setLoginDetails={setLoginDetails}
          setIsLoading={setIsLoading}
          setEmailData={setEmailData}
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
        />
        )
      }
      {step === 2 && (
        <OTPResponse  setIdentifier={setIdentifier}  setStep={setStep}/>
      )}
    </>
  );
}

export default App;
