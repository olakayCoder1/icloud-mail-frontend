import React from 'react';

export default function EmailSender({ emailData, handleChange, onSubmitForm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm(emailData); // Send the updated emailData to the parent
  };

  return (
    <section className="bg-gray-200 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Send Email Via ICloud
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="to" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Recipient
                </label>
                <input
                  type="email"
                  id="to"
                  name="to"
                  value={emailData.to}
                  onChange={handleChange} // Call handleChange to update the parent state
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter recipient email..."
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={emailData.subject}
                  onChange={handleChange} // Call handleChange to update the parent state
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email subject..."
                  required
                />
              </div>
              <div>
                <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your message
                </label>
                <textarea
                  id="body"
                  name="body"
                  rows="4"
                  value={emailData.body}
                  onChange={handleChange} // Call handleChange to update the parent state
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
