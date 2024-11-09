export default function Login(props) {
    

    const handleSubmit = (e) => {
        props.setIsLoading(true)
        e.preventDefault(); // Prevent page reload
        console.log(props?.emailData)
        setTimeout( () => {
            props.setStep((prevState) => prevState + 1)
            props.setIsLoading(false)
        }, 3000);
    };


    const handleInputChange = (e) => {
        props.setEmailData((prevState) => ({ ...prevState, [e.target.name]: e.target.value}))  
      };
    
    return (
        <>
            <section className="bg-gray-200 dark:bg-gray-900 h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Icloud Email</label>
                                    <input value={props?.emailData?.email} onChange={handleInputChange}  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@icloud.com" required={true}/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={props?.emailData?.password} onChange={handleInputChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true}/>
                                </div>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-0 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
