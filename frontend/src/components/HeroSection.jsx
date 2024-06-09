import React from 'react';

const HeroSection = () => {
  return (
    <section class="bg-white dark:bg-gray-900">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">basic academic portal website</h1>
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Welcome to our Course Management Platform, designed specifically for teachers to effortlessly manage their courses. This intuitive platform allows educators to create, update, and delete course information with ease. The main dashboard provides a comprehensive view of all courses, displaying essential details such as course name, description, start and end dates, category, and image.</p>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="https://cdn-icons-png.freepik.com/512/4308/4308850.png" alt="mockup"/>
            </div>                
        </div>
    </section>
  );
};

export default HeroSection;
