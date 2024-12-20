
  const Login = (props: any) => {
    
    console.log(props?.thresholdData)

    const handleSetLoginDetails = (e: any) => {
      
      props?.setLoginDetails((prev: any) => ({...prev, [e.target.name] : e.target.value}))
    }

    return (
      <>
        <section className="bg-gray-200 dark:bg-gray-900 h-screen">
          
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">


                <div className=' flex flex-col py-4 px-4'>
                <p className="text-sm font-medium text-gray-500 text-center dark:text-gray-400">Registered Count /Account Limited</p>
                <div className="flex items-center mt-4 w-full">
                    <div className="w-3/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-300 rounded" style={{ width: `${props?.thresholdData?.percentage}%` }} ></div>
                        {/* <div className="h-5 bg-yellow-300 rounded" style={{ width: '70%' }} ></div> */}
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{props?.thresholdData?.registered}</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2">of</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{props?.thresholdData?.threshold}</span>
                </div>
              </div>


              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={props?.handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Icloud Email
                    </label>
                    <input
                      value={props?.loginDetails?.email}
                      onChange={handleSetLoginDetails}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="test@icloud.com"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      value={props?.loginDetails?.password}
                      onChange={handleSetLoginDetails}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={props.isLoading}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-0 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {props.isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default Login;
  