import axios from 'axios';
// import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate();
  
  // const notify = () => {
  //   toast.success('Logged in successfully', {
  //     position: 'bottom-right',
  //     autoClose: 1000,
  //     style: {
  //       backgroundColor: 'green',
  //       color: 'white',
  //     },
  //   });
    
  //   setTimeout(() => navigate('/Home'), 1000); // Redirect to dashboard after login
  // };

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSubmit = async () =>{
    if (email === '' || password === '') {
      toast.error('Please fill all the fields', {
        position: 'bottom-right',
        autoClose: 2000,
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
      return;
    }
    try {
      const url = "http://localhost:2000/api/v1/hustler/signInHustler";
      const body = { email, password }; // Construct the request body
      // console.log(body);
      const response = await axios.post(url, body);
    
      if (response.status === 200) {
        // console.log('Response data:', JSON.stringify(response)); // Print the response data
        // console.log(response.data.data.userData)
        alert('Logged in successfully');
        Cookies.set('userData', JSON.stringify(response.data.data.userData), { expires: 1 }); // Expires in 7 days
        Cookies.set('accessToken', JSON.stringify(response.data.data.accessToken))
        Cookies.set('refreshToken', JSON.stringify(response.data.data.refreshToken))

        const role = response.data.data.role;
        console.log(role);
        if (role === 'hustler') {
          navigate('/hustler');
        } else if (role === 'client') {
          navigate('/client');
        } else {
          toast.error('Unknown role. Please contact support.');
        }
      }
      
    } catch (error) {
      console.error('An error occurred:', error); // Log the error for debugging
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      console.log(errorMessage);
      toast.error(errorMessage);
    }
    };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-sans">
      <div className="flex justify-start items-center w-full p-4 overflow-hidden">
      
      </div>
      <div className="min-h-[85vh] flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Log In</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Welcome back! Please login to your account.</p>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input name="email" type="email" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter email or username" value={email}
              onChange={handleEmailChange} />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"

                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter password"
                  />
                  <svg
                    onClick={togglePasswordVisibility}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path d={showPassword ? "M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994z" : "M64 16c-34.193 0-62.672 23.995-63.541 25.005-1.459 1.822-1.459 4.168 0 5.99.869 1.01 29.348 25.005 63.541 25.005 34.193 0 62.672-23.995 63.541-25.005 1.459-1.822 1.459-4.168 0-5.99C126.672 39.995 98.193 16 64 16zm-5.506 66.632L36.258 60.396l8.728-8.728 14.508 14.508 32.258-32.258 8.728 8.728-40.506 40.506z"}
                    data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div className="mt-8">
                <button type="button" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" onClick={onSubmit}>
                  Log In
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-gray-800">Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Sign up here</Link></p>
            </form>
          </div>
          {/* <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Login Experience" />
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;