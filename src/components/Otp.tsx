import React, { useState, useRef } from 'react';

export default function Otp({ onSubmitForm, identifier }) {
    const [otp, setOtp] = useState(Array(6).fill('')); // Keep track of OTP values in an array
    const inputRefs = useRef([]); // To hold references to all input elements

    // Handle input change
    const handleChange = (e, index) => {
        const value = e.target.value;

        // Only allow numeric input and update the OTP state
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next input if value is entered
            if (value && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    // Handle backspace key for navigation
    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            // Move focus to the previous input if backspace is pressed and current input is empty
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that all OTP inputs are filled
        if (otp.some(value => value === '')) {
            alert('Please enter all the digits of the OTP');
            return;
        }

        // Prepare OTP data
        const otpData = otp.join(''); // Convert OTP array to a string

        // Make the request to submit OTP
        try {
            const response = await fetch('http://127.0.0.1:5000/submit-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier, // Send the identifier
                    otp: otpData, // Send the OTP as a string
                }),
            });

            const data = await response.json();

            // Handle response
            if (data.status) {
                alert('OTP submitted successfully!');
                onSubmitForm(); // Call the callback passed as a prop on success
            } else {
                alert('Failed to submit OTP');
            }
        } catch (error) {
            console.error('Error submitting OTP:', error);
            alert('There was an error submitting the OTP. Please try again.');
        }
    };

    return (
        <>
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-200 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Verification Code</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>Enter verification code sent to your device/email/phone number {identifier}</p>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-16">
                                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xl">
                                        {otp.map((value, index) => (
                                            <div key={index} className="w-16 h-16">
                                                <input
                                                    ref={(el) => inputRefs.current[index] = el} // Set reference for each input
                                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                    type="text"
                                                    maxLength="1"
                                                    value={value}
                                                    onChange={(e) => handleChange(e, index)}
                                                    onKeyDown={(e) => handleBackspace(e, index)} // Handle backspace key
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button
                                                type="submit"
                                                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                            >
                                                Submit Code
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
