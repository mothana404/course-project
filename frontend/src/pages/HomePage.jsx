import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import CourseList from '../components/CourseList';

const HomePage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <div className="relative flex py-5 items-center mt-24">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-500">Our Available Courses</span>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <CourseList></CourseList>
        <div className="relative flex py-5 items-center mt-12">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default HomePage;
