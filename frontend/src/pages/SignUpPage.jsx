import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Cookies from 'js-cookie';

const SignUp = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        confirmPassword: '',
        user_role: ''
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
        if (formData.user_password !== formData.confirmPassword) {
            swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords do not match",
            });
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/signUp', formData);
            console.log(response.data);
            if (response.status === 201) {
                if (response.data.role === 1) {
                    Cookies.set('token', response.data.accessToken);
                } else {
                    Cookies.set('teacher_Token', response.data.accessToken);
                }
                window.location.href = '/';
            } else {
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
                text: 'Email Already Exist!',
            });
        }
    };

    return (
        <div className='mt-24'>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="user_name" className="mb-3 block text-base font-medium text-[#07074D]">
                                User name
                            </label>
                            <input
                                type="text"
                                name="user_name"
                                id="name"
                                placeholder="Full Name"
                                maxLength="25"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="user_email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="user_email"
                                id="email"
                                placeholder="Enter your email"
                                maxLength="40"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="user_password" className="mb-3 block text-base font-medium text-[#07074D]">
                                Password
                            </label>
                            <input
                                type="password"
                                name="user_password"
                                id="password"
                                placeholder="Enter your password"
                                maxLength="40"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="confirmPassword" className="mb-3 block text-base font-medium text-[#07074D]">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                maxLength="40"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="role" className="mb-3 block text-base font-medium text-[#07074D]">
                                Create account as
                            </label>
                            <div className="relative">
                                <select
                                    name="user_role"
                                    id="user_role"
                                    required
                                    onChange={handleChange}
                                    defaultValue='1'
                                    className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 px-3 pr-8 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                >
                                    <option value="" disabled>Select Role</option>
                                    <option value="1">Student</option>
                                    <option value="2">Teacher</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit"
                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
