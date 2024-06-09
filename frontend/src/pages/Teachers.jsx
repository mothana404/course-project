import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-5 px-12 py-12">
        {teachers.map((teacher, index) => (
          <div key={teacher.teacher_id} className={`py-2 px-4 bg-white shadow-lg rounded-lg ${index > 3 ? 'mt-8' : ''}`}>
            <div>
              <h2 className="text-gray-800 text-3xl font-semibold">{teacher.user_name}</h2>
              <p className="mt-2 text-gray-600">{`Courses: ${teacher.courses.length}`}</p>
            </div>
            <div className="flex justify-end mt-4">
              <Link to={`/teacherCourses/${teacher.user_id}`} className="text-xl font-medium text-indigo-500">Show Courses</Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Teachers;
