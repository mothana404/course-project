const express = require('express');
const router = express.Router();
const courseController = require('../Controller/courseController');
const auth = require('../Middleware/userAuth');
const upload = require('../Middleware/uploadFile');

router.post('/addCourse', auth.teacherAuthorize, upload.uploadImg, courseController.addCourse);
router.get('/availableCourses', courseController.availableCourses);
router.get('/courseDetails/:id', courseController.courseDetails);
router.get('/teacherCourse', auth.teacherAuthorize, courseController.teacherCourse);
router.put('/updateCourse/:id', auth.teacherAuthorize, upload.uploadImg, courseController.updateCourse);
router.put('/deleteCourse/:id', auth.teacherAuthorize, courseController.deleteCourse);
router.get('/teacherCourses/:id', courseController.teacherCourses);

module.exports = router;