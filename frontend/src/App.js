import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import CourseCrud from './pages/CourseCrud';
import Teachers from './pages/Teachers';
import TeacherCourses from './components/TeacherCourses';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/SignIn" element={<LoginPage />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path="/course/:id" element={<CoursePage />} />
                <Route path="/profilePage" element={<ProfilePage />} />
                <Route path="/CoursesTable" element={<CourseCrud />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/teacherCourses/:id" element={<TeacherCourses />} />
            </Routes>s
        </Router>
    );
};

export default App;
