import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/availableCourses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {courses.map((course) => (
          <div key={course.id} className="rounded overflow-hidden shadow-lg w-72">
            <div className="relative">
              <Link to={`/course/${course.course_id}`} className='flex flex-row justify-center align-middle'>
                <img className="w-72 h-48" src={course.course_image} alt={course.course_name} />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
              </Link>
              <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                <span className="font-bold">{course.start_date.split('T')[0]}</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <Link to={`/course/${course.course_id}`} className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
                {course.course_name}
              </Link>
              <p className="text-gray-500 text-sm">
                {course.course_description}
              </p>
            </div>
            <div className="px-6 py-4 flex flex-row items-center">
              <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                <span className="ml-1">{course.teacher.user_name}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
