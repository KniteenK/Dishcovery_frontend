import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textColor = "#000"; // Define the text color

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const url = "http://localhost:3333/api/v1/user/signIn"; // Ensure this URL is correct
      const body = { email, password };
      const response = await axios.post(url, body);

      if (response.status === 200) {
        toast.success('Logged in successfully', {
          position: 'bottom-right',
          autoClose: 2000,
        });

        const { userData, accessToken, refreshToken } = response.data.data;

        // Store data in cookies
        Cookies.set('userData', JSON.stringify(userData), { expires: 7 }); // 7 days expiry
        Cookies.set('accessToken', accessToken, { expires: 7 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });

        console.log('User data:', userData);  
        navigate('/customer/home'); // Redirect to customer page after successful login
      } else {
        toast.error(response.data.message || 'Failed to log in', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="font-sans">
      <div className="flex justify-start items-center w-full p-4 overflow-hidden">
        <NavLink className="flex justify-around items-center" to="/">
          <img src="/logo.png" alt="logo" width="70" height="40" />
          <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl">
            Dishcovery
          </h1>
        </NavLink>
      </div>
      <div className="min-h-[85vh] flex flex-col items-center ml-[30%] justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-lg max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Log In</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Welcome back! Please login to your account.</p>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                 className="w-full bg-tertiary text-white p-3 rounded-lg hover:bg-color[#f38105] transition duration-300"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}