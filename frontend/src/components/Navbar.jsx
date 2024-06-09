import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
    let teacherToken;
    let token;
    if(Cookies.get('token')){
        teacherToken = null;
        token = Cookies.get('token');
    }else{
        token = Cookies.get('teacher_Token');
        teacherToken = Cookies.get('teacher_Token');
    }

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('teacher_Token');
        window.location.href = '/';
      };
    
  return (
    <header class=">flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4">
        <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
            <div class="flex items-center justify-between">
            <Link class="flex-none text-xl font-semibold" to="/">courses website</Link>
            <div class="sm:hidden">
                <button type="button" class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                <svg class="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                <svg class="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
            </div>
            <div id="navbar-collapse-with-animation" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                <Link class="font-medium text-blue-500" to="/" aria-current="page">Home</Link>
                <Link class="font-medium text-gray-600 hover:text-gray-400" to="/teachers">Teachers</Link>
                {teacherToken && (
                  <Link className="font-medium text-gray-600 hover:text-gray-400" to="/CoursesTable">Dashboard</Link>
                )}
                <div>
                {token ? (
                    <div>
                        <Link to="/profilePage" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                            Profile
                        </Link>
                        <button 
                            className="text-base leading-6 hover:text-gray-900 pl-12 text-red-600" 
                            onClick={handleLogout}>
                            LogOut
                        </button>
                    </div>
                ) : (
                    <Link to="/SignIn" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                    Sign In
                    </Link>
                )}
            </div>
            </div>
            </div>
        </nav>
    </header>
  );
};

export default Navbar;
