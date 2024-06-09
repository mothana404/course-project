import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CoursePage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/courseDetails/${id}`);
                setCourse(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading course data.</div>;
    }
    if (!course) {
        return <div>No course found.</div>;
    }

    return (
        <div>
            <Navbar></Navbar>
            <section className="text-gray-700 body-font overflow-hidden bg-white mt-12 mb-12">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt={course.course_name} className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={course.course_image}/>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{course.course_category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{course.course_name}</h1>
                            <div className="flex mb-4"></div>
                            <p className="leading-relaxed">{course.course_description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <span className="flex items-center">
                                    <span className="text-gray-600 ml-3">Start Date: {course.start_date.split('T')[0]}</span>
                                    <span className="text-gray-600 ml-3">End Date: {course.end_date.split('T')[0]}</span>
                                </span>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">{course.teacher.user_name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default CoursePage;
