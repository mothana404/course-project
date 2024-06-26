import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/signIn', formData);
      console.log(response.data);
      if(response.status === 200){
        if(response.data.role === 1){
            Cookies.set('token', response.data.accessToken);
        }else{
            Cookies.set('teacher_Token', response.data.accessToken);
        }
        window.location.href = '/';
      }else{
        swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "there is something wrong!",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-20" src="https://cdn-icons-png.freepik.com/512/4308/4308850.png" alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="user_email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="user_email" type="email" autoComplete="email" required value={formData.user_email} onChange={handleChange} className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" maxLength="40"/>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="user_password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="user_password" type="password" autoComplete="current-password" required value={formData.user_password} onChange={handleChange} className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" maxLength="40"/>
                    </div>
                </div>
                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <Link to="/signUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create Account</Link>
            </p>
        </div>
    </div>
  );
};

export default LoginPage;
