// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlagIcon } from 'react-flag-kit';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  const OnSubmit = async () => {
    if (
      [username, email, password, contactNumber, firstName, lastName, city, country].some((field) => field.trim() === "")
    ) {
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

    const requestBody = {
      username,
      email,
      password,
      contactNumber,
      first_name: firstName,
      last_name: lastName,
      address: {
        city,
        country,
      },
    };

    console.log('Request Body:', requestBody);

    try {
      const response = await axios.post('http://localhost:2000/api/v1/hustler/signupHustler', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('Account created successfully!', {
          position: 'bottom-right',
          autoClose: 2000,
        });
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Failed to create account', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  // Function to format the country options with flags
const formatCountryOption = ({ value, label }) => (
  <div className="flex items-center">
    <FlagIcon code={value} size={24} className="mr-2" />
    <span>{label}</span>
  </div>
);

  useEffect(() => {
    // Fetch countries
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryList = data.map(country => ({
          value: country.cca2, // ISO country code
          label: country.name.common,
        })).sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryList);
      });
  }, []);
  

  useEffect(() => {
    if (country) {
      // Fetch cities based on selected country
      fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country })
      })
        .then(response => response.json())
        .then(data => {
          const cityList = data.data.sort();
          setCities(cityList);
        });
    }
  }, [country]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleContactNumberChange = (e) => setContactNumber(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="font-sans">
      
      <div className="min-h-[85vh] flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Create an Account</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Join us today! Start your journey with us.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                  <input name="firstName" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter first name" value={firstName} onChange={handleFirstNameChange} />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                  <input name="lastName" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter last name" value={lastName} onChange={handleLastNameChange} />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Contact Number</label>
                  <input name="contactNumber" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter contact number" value={contactNumber} onChange={handleContactNumberChange} />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
                  <input name="email" type="email" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter email address" value={email} onChange={handleEmailChange} />
                </div>
                <Select
                  value={country ? countries.find(c => c.label === country) : null}
                  onChange={(option) => setCountry(option.label)}
                  options={countries}
                  formatOptionLabel={formatCountryOption}
                  placeholder="Select country"
                  className="text-sm"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                    }),
                  }}
                />
                <Select
                  value={city ? { value: city, label: city } : null}
                  onChange={(option) => setCity(option.label)}
                  options={cities.map(city => ({ value: city, label: city }))}
                  placeholder="Select city"
                  className="text-sm"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                    }),
                  }}
                />
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">User name</label>
                  <input name="username" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter user name" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={handlePasswordChange} className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter password" />
                    <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d={showPassword ? "M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994z" : "M64 16c-34.193 0-62.672 23.995-63.541 25.005-1.459 1.822-1.459 4.168 0 5.99.869 1.01 29.348 25.005 63.541 25.005 34.193 0 62.672-23.995 63.541-25.005 1.459-1.822 1.459-4.168 0-5.99C126.672 39.995 98.193 16 64 16zm-5.506 66.632L36.258 60.396l8.728-8.728 14.508 14.508 32.258-32.258 8.728 8.728-40.506 40.506z"} data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button type="button" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" onClick={OnSubmit}>
                  Sign Up
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-gray-800">Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Log in here</Link></p>
            </form>
          </div>
          {/* <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Signup Experience" />
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;