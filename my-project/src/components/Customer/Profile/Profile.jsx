import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    password: '',
    email: '',
    gender: '',
    allergies: '',
    subRegion: '',
    continent: ''
  });
  
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchDataFromCookies = () => {
      const storedUserData = Cookies.get('userData');
      console.log('Stored user data:', storedUserData);

      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        console.log('Parsed user data:', parsedData);

        const data = {
          name: parsedData.username || '',
          password: '', // Assuming password is not stored in cookies for security reasons
          email: parsedData.email || '',
          gender: parsedData.gender || '',
          allergies: parsedData.allergies.join(', ') || '',
          subRegion: parsedData.region.subRegion || '',
          continent: parsedData.region.continent || ''
        };
        setProfile(data);
      }
    };

    fetchDataFromCookies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Profile submitted:', profile);
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="w-11/12 max-w-5xl bg-gray-100 p-8 rounded-lg shadow-lg flex">
        
        {/* Left Section */}
        <div className="w-1/3 p-4 flex flex-col items-center bg-white rounded-lg mr-8">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <button className="px-4 py-1 bg-primary text-white rounded-full text-sm mb-6">
            Upload Profile
          </button>

          <div className="w-full mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-full p-2 border rounded-md focus:outline-primary"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={profile.password}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-full p-2 border rounded-md focus:outline-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 bg-white p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-3/5 p-2 border rounded-md focus:outline-primary"
            />
          </div>

          <div className="flex justify-between mb-4">
            <label className="font-semibold">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-3/5 p-2 border rounded-md focus:outline-primary"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div className="flex justify-between mb-4">
            <label className="font-semibold">Allergies (If any)</label>
            <input
              type="text"
              name="allergies"
              placeholder="Enter your allergies"
              value={profile.allergies}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-3/5 p-2 border rounded-md focus:outline-primary"
            />
          </div>

          <div className="flex justify-between mb-4">
            <label className="font-semibold">Sub Region</label>
            <input
              type="text"
              name="subRegion"
              placeholder="Enter your Sub Region"
              value={profile.subRegion}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-3/5 p-2 border rounded-md focus:outline-teal-500"
            />
          </div>

          <div className="flex justify-between mb-8">
            <label className="font-semibold">Continent</label>
            <input
              type="text"
              name="continent"
              placeholder="Enter your Continent"
              value={profile.continent}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-3/5 p-2 border rounded-md focus:outline-teal-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            {isEdit ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary text-white rounded-md"
              >
                Submit
              </button>
            ) : null}
            <button
              onClick={() => setIsEdit(!isEdit)}
              className={`px-6 py-2 ${isEdit ? "bg-gray-300" : "bg-primary"} text-white rounded-md`}
            >
              {isEdit ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;