export default function EmailSender(props) {

  const handleInputChange = (e) => {
    props.setEmailData((prevState) => ({ ...prevState, [e.target.name]: e.target.value}))  
  };


  const isFormValid = () => {
    return Object.values(props?.emailData).every((field) => field.trim() !== '');
  };


  // Handle email form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!isFormValid()) {
      props?.displayNotification('error','Please fill in all required fields.');
      return;
    }

    props?.setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/email/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props?.emailData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Email request queued:', result);
        // toast.success(result?.message, {
        //   position: "top-center"
        // });
        // increament step by 1
        
        props?.setIdentifier(result?.identifier);
        props?.setIsLoading(false)
        props?.setEmailData({
          email: '',
          password: '',
          to: '',
          subject: '',
          body: '',
          queue_id: 'some-unique-id',
        })
        props.setStep((prevState) => prevState + 1)
        

      } else {
        console.error('Error sending email:', result.message);
        props?.setIsLoading(false)
      }
    } catch (error) {
      console.error('API call error:', error);
      props?.displayNotification('error','There was an error submitting data.');
      props?.setIsLoading(false)
    }
  };


  return (
    <section className="bg-gray-200 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Send Email Via ICloud
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="to" className="block mb-2 text-sm font-medium text-gray-900">
                  Recipient
                </label>
                <input
                  type="email"
                  id="to"
                  name="to"
                  value={props?.emailData?.to}
                  onChange={handleInputChange} // Call handleChange to update the parent state
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Enter recipient email..."
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={props?.emailData.subject}
                  onChange={handleInputChange} // Call handleChange to update the parent state
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Enter email subject..."
                  required
                />
              </div>
              <div>
                <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900">
                  Your message
                </label>
                <textarea
                  id="body"
                  name="body"
                  rows="4"
                  value={props?.emailData.body}
                  onChange={handleInputChange} // Call handleChange to update the parent state
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Write your thoughts here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-0 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
