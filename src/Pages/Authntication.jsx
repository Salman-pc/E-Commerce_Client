import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginApi, SignUpApi } from '../services/allApi';

function Authentication() {


  const navigate = useNavigate()

  const [isSignIn, setIsSignIn] = useState(true);

  // State for form data
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
  });



  const handleSignIn =async (e) => {
    e.preventDefault();
    console.log('Sign In Data:', signInData);
    // Add authentication logic here
    try {
      const result = await LoginApi(signInData)

      if (result.status === 201) {
        console.log(result);

        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
        navigate('/home');
      }
      else {
        console.log(result);

        alert(result.response.data)
      }
    } catch (error) {
      console.log(error);

    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
   
    // Add registration logic here
    try {
      const result = await SignUpApi(signUpData)

      if (result.status === 201) {
        console.log(result);

        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
        navigate('/home');
      }
      else {
        console.log(result);

        alert(result.response.data)
      }
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full h-screen bg-white flex flex-col md:flex-row  overflow-hidden shadow-lg">

        {/* Left Panel */}
        <div className={`md:w-1/2 h-screen w-full flex flex-col items-center justify-center p-10 transition-all duration-500 ${isSignIn ? "bg-white" : "bg-blue-900 text-white"}`}>
          {isSignIn ? (
            // signIn
            <form onSubmit={handleSignIn} className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-yellow-500 mb-4 text-center">Sign In to Your Account</h2>
              <input
                type="email"
                name="email"
                value={signInData.email}
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                placeholder="Email"
                className="w-full p-3 mb-3 border rounded-lg focus:outline-none"
              />
              <input
                type="password"
                name="password"
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                placeholder="Password"
                className="w-full p-3 mb-3 border rounded-lg focus:outline-none"
              />
              <a href="#" className="text-sm text-blue-500 font-semibold mb-4 block text-right">Forgot password?</a>
              <button type="submit" className="w-full bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-600">SIGN IN</button>
            </form>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-6 text-center px-2">To keep connected with us please login with your personal info</p>
              <button onClick={() => setIsSignIn(true)} className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition">SIGN IN</button>
            </>
          )}
        </div>

        {/* Right Panel */}
        <div className={`md:w-1/2 w-full flex flex-col items-center justify-center p-10 transition-all duration-500 ${isSignIn ? "bg-blue-900 text-white" : "bg-white"}`}>
          {!isSignIn ? (
            // signup
            <form onSubmit={handleSignUp} className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-yellow-500 mb-4 text-center">Create Account</h2>
              <input
                type="text"
                name="name"
                value={signUpData.name}
                onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                placeholder="Name"
                className="w-full p-3 mb-3 border rounded-lg focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                placeholder="Email"
                className="w-full p-3 mb-3 border rounded-lg focus:outline-none"
              />
              <input
                type="password"
                name="password"
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                placeholder="Password"
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none"
              />
              <button type="submit" className="w-full bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-600">SIGN UP</button>
            </form>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>
              <p className="mb-6 text-center px-2">Enter your personal details and start your journey with us</p>
              <button onClick={() => setIsSignIn(false)} className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition">SIGN UP</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authentication;
