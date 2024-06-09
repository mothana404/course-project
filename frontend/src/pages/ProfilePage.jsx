import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import swal from 'sweetalert2';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ user_name: '', user_email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let token = Cookies.get('teacher_Token');
        if (!token) {
            token = Cookies.get('token');
        }

        const response = await axios.get('http://localhost:8080/profilePage', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
        setFormData({ user_name: response.data.user_name, user_email: response.data.user_email });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateClick = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      let token = Cookies.get('teacher_Token');
      if (!token) {
          token = Cookies.get('token');
      }

      await axios.put('http://localhost:8080/updateProfile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(formData);
      setShowModal(false);
    } catch (error) {
        swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'check your cuurent account password or email in used!',
          });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div>
        <Navbar />
        <div className='flex flex-row justify-center align-middle'>
        <div className="bg-white overflow-hidden shadow rounded-lg border mx-4 box mt-48 mb-48 w-10/12">
            <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <button 
                  className="text-sm font-medium text-gray-500"
                  onClick={handleUpdateClick}
                >
                    Update
                </button>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your information
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                    User name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.user_name}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                    Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.user_email}
                    </dd>
                </div>
                </dl>
            </div>
        </div>
    </div>

    {showModal && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Update Profile
                  </h3>
                  <div className="mt-2">
                    <div className='mt-4 mb-4'>
                        <label for= "user_name">user name</label>
                        <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        name="user_name"
                        maxLength={40}
                        value={formData.user_name}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='mt-4 mb-4'>
                        <label for= "user_email">email</label>
                        <input
                        type="text"
                        className="w-full px-3 py-2 border rounded mt-2"
                        name="user_email"
                        maxLength={45}
                        value={formData.user_email}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='p-2 mt-4 mb-4'>
                        <label for= "user_password">enter yout password to confirm</label>
                        <input
                        type="password"
                        className="w-full px-3 py-2 border rounded mt-2"
                        name="user_password"
                        maxLength={40}
                        value={formData.user_password}
                        onChange={handleInputChange}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    <Footer />
    </div>
  );
};

export default ProfilePage;
