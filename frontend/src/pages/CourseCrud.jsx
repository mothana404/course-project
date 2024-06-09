import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const CourseCrud = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    course_name: '',
    course_description: '',
    start_date: '',
    end_date: '',
    course_category: '',
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const token = Cookies.get('teacher_Token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/teacherCourse', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    fetchCourses();
  }, [token]);

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;
    try {
      await axios.put(`http://localhost:8080/deleteCourse/${courseId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(courses.filter(course => course.course_id !== courseId));
    } catch (error) {
      console.error('Error deleting course', error);
    }
  };

  const handleUpdate = (course) => {
    setSelectedCourse(course);
    setSelectedImage(null); // Reset the selected image
    setShowModal(true);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('course_name', selectedCourse.course_name);
    formData.append('course_description', selectedCourse.course_description);
    formData.append('start_date', selectedCourse.start_date);
    formData.append('end_date', selectedCourse.end_date);
    formData.append('course_category', selectedCourse.course_category);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await axios.put(`http://localhost:8080/updateCourse/${selectedCourse.course_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setShowModal(false);
      setSelectedCourse(null);
      const response = await axios.get('http://localhost:8080/teacherCourse', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error updating course', error);
    }
  };

  const handleCreateCourse = async () => {
    const formData = new FormData();
    Object.keys(newCourse).forEach(key => {
      formData.append(key, newCourse[key]);
    });

    try {
      await axios.post('http://localhost:8080/addCourse', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowCreateModal(false);
      const response = await axios.get('http://localhost:8080/teacherCourse', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error creating course', error);
    }
  };

  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleNewCourseFileChange = (e) => {
    setNewCourse({ ...newCourse, image: e.target.files[0] });
  };

  const handleSelectedCourseChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourse({ ...selectedCourse, [name]: value });
  };

  const handleSelectedImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div>
      <Navbar />
      <div className='align-middle justify-center flex'>
        <div className="text-gray-900 mt-12 mb-24 w-11/12">
          <div className="p-4 flex">
            <h1 className="text-3xl">
              Your Courses
            </h1>
          </div>
          <button
            className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-6"
            data-ripple-light="true"
            onClick={() => setShowCreateModal(true)}
          >
            Create New Course
          </button>
          <div className="px-3 py-4 flex justify-center">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-left p-3 px-5">Name</th>
                  <th className="text-left p-3 px-5">Description</th>
                  <th className="text-left p-3 px-5">Start Date</th>
                  <th className="text-left p-3 px-5">End Date</th>
                  <th className="text-left p-3 px-5">Category</th>
                  <th className="text-left p-3 px-5">Image</th>
                  <th className="text-left p-3 px-5"></th>
                </tr>
                {courses.map(course => (
                  <tr key={course.course_id} className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">{course.course_name}</td>
                    <td className="p-3 px-5 w-80 break-words whitespace-pre-wrap">
                        <p style={{ width: '300px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{course.course_description}</p>
                    </td>
                    <td className="p-3 px-5">{course.start_date.split('T')[0]}</td>
                    <td className="p-3 px-5">{course.end_date.split('T')[0]}</td>
                    <td className="p-3 px-5">{course.course_category}</td>
                    <td className="p-3 px-5">
                      <img src={course.course_image} alt="course_image" width={'200px'} height={'200px'} className='w-40 h-40' />
                    </td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleUpdate(course)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDelete(course.course_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && selectedCourse && (
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
                          Update Course
                        </h3>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            value={selectedCourse.course_name}
                            onChange={handleSelectedCourseChange}
                            name="course_name"
                          />
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded mt-2"
                            value={selectedCourse.course_description}
                            onChange={handleSelectedCourseChange}
                            name="course_description"
                          />
                          <input
                            type="date"
                            className="w-full px-3 py-2 border rounded mt-2"
                            value={selectedCourse.start_date}
                            onChange={handleSelectedCourseChange}
                            name="start_date"
                          />
                          <input
                            type="date"
                            className="w-full px-3 py-2 border rounded mt-2"
                            value={selectedCourse.end_date}
                            onChange={handleSelectedCourseChange}
                            name="end_date"
                          />
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded mt-2"
                            value={selectedCourse.course_category}
                            onChange={handleSelectedCourseChange}
                            name="course_category"
                          />
                          <input
                            type="file"
                            className="w-full px-3 py-2 border rounded mt-2"
                            name="image"
                            onChange={handleSelectedImageChange}
                          />
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

          {showCreateModal && (
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
                          Create New Course
                        </h3>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            name="course_name"
                            placeholder="Course Name"
                            value={newCourse.course_name}
                            onChange={handleNewCourseChange}
                          />
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded mt-2"
                            name="course_description"
                            placeholder="Course Description"
                            value={newCourse.course_description}
                            onChange={handleNewCourseChange}
                          />
                          <input
                            type="date"
                            className="w-full px-3 py-2 border rounded mt-2"
                            name="start_date"
                            value={newCourse.start_date}
                            onChange={handleNewCourseChange}
                          />
                          <input
                            type="date"
                            className="w-full px-3 py-2 border rounded mt-2"
                            name="end_date"
                            value={newCourse.end_date}
                            onChange={handleNewCourseChange}
                          />
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded mt-2"
                            name="course_category"
                            placeholder="Course Category"
                            value={newCourse.course_category}
                            onChange={handleNewCourseChange}
                          />
                          <input
                            type="file"
                            className="w-full px-3 py-2 border rounded mt-2"
                            name="image"
                            onChange={handleNewCourseFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleCreateCourse}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseCrud;

