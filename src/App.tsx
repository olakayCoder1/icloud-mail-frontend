import { useState } from 'react';
import './App.css';
import EmailSender from './components/EmailSender';
import Login from './components/Login';
import Otp from './components/Otp';

function App() {
  const [emailData, setEmailData] = useState({
    email: '',
    password: '',
    to: '',
    subject: '',
    body: '',
    queue_id: 'some-unique-id', // This can be dynamically generated or passed from somewhere else
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [isMessage, setIsMessage] = useState(false);

  // Function to handle form input changes (update the emailData state)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevState) => ({
      ...prevState,
      [name]: value, // Update the field that corresponds to the name attribute of the input
    }));
  };

  // Function to handle login form submission (e.g., after submitting login form)
  const handleLogin = ({ password, email }) => {
    setIsLoggedIn(true);
    setIsMessage(true);
    setEmailData((prevState) => ({
      ...prevState,
      email,
      password,
    }));
  };

  // Function to check if all required fields are provided
  const isFormValid = () => {
    return Object.values(emailData).every((field) => field.trim() !== '');
  };

  // Handle email form submission
  const handleMessage = async (e) => {
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/send-webhook-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Email request queued:', result);
        setOtpVisible(true);
        setIsMessage(false);
        setIdentifier(result?.identifier);
      } else {
        console.error('Error sending email:', result.message);
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  return (
    <>
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {otpVisible && <Otp onSubmitForm={() => {}} identifier={identifier} />}
      {isMessage && <EmailSender emailData={emailData} handleChange={handleChange} onSubmitForm={handleMessage} />}
    </>
  );
}

export default App;
