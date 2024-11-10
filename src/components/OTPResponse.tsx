export default function OTPResponse(props: any) {
    

    return (
        <>
            <section className="bg-gray-200 dark:bg-gray-900 h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="relative p-4 w-full h-screen flex flex-col justify-center items-center">
                        <div className="relative p-4 w-full max-w-sm text-center bg-white rounded-lg shadow sm:p-5">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Success</span>
                            </div>
                            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">OTP Submitted Successfully.</p>
                            <button onClick={()=> props.setStep(0)} data-modal-toggle="successModal" type="button" className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-0 focus:outline-none focus:ring-primary-300">
                                Send Another Mail
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
