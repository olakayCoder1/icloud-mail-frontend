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
          setStep={setStep}
          emailData={emailData}
          setIsLoading={setIsLoading}
          setEmailData={setEmailData}
        />
        )
      }
      {step === 1 && (
        <EmailSender
          setStep={setStep}
          emailData={emailData}
          setEmailData={setEmailData}
          setIdentifier={setIdentifier}
          setIsLoading={setIsLoading}
          displayNotification={displayNotification}
        />
        )
      }
      {step === 2 && (
        <Otp
          setStep={setStep}
          setIdentifier={setIdentifier}
          identifier={identifier}
          setIsLoading={setIsLoading}
          displayNotification={displayNotification}
        />
        )
      }
      {step === 3 && (
        <OTPResponse  setIdentifier={setIdentifier}  setStep={setStep}/>
      )}
    </>
  );
}

export default App;
