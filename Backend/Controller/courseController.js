const { Users, Courses } = require('../models');
const { Op, where } = require('sequelize');

async function addCourse(req, res){
    try {
        const { course_name, course_description, start_date, end_date, course_category } = req.body;
        const image = res.locals.site;
        const userID = req.user.id;
        await Courses.create({
            course_name: course_name,
            course_description: course_description,
            start_date: start_date,
            end_date: end_date,
            course_category: course_category,
            course_image: image,
            course_teacher: userID,
        });
        res.status(201).json({message: "course created successfuly!"});
    }catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Error in add course controller' });
    }
};

async function availableCourses(req, res) {
    try {
        const currentDate = new Date();
        const courses = await Courses.findAll({
            where: {
                end_date: {
                    [Op.gt]: currentDate,
                },
                is_deleted: false,
            },
            include: [
                {
                    model: Users,
                    as: "teacher",
                    attributes: ['user_id', 'user_name'],
                },
            ],
        });
        res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error in available courses controller' });
    }
};

async function courseDetails(req, res){
    try{
        const courseID = req.params.id;
        const courseDetails = await Courses.findOne({
            where: {
                course_id: courseID,
            },
            include: [
                {
                    model: Users,
                    as: "teacher",
                    attributes: ['user_id', 'user_name'],
                },
            ],
        });
        res.status(200).json(courseDetails);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'error in course Details controller' });
    }
};

async function updateCourse(req, res) {
    try {
        const courseID = req.params.id;
        let course_image = res.locals.site;
        const { course_name, course_description, start_date, end_date, course_category} = req.body;
        const updateCourse = await Courses.findByPk(courseID);
        if(course_image === null){
            course_image = updateCourse.dataValues.course_image;
        }
        await Courses.update({course_name, course_description, course_image, start_date, end_date, course_category}, { where: { course_id: courseID } });
        res.status(201).json({ message: "course updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in updating course controller' });
    }
};

async function deleteCourse(req, res) {
    try {
        const courseID = req.params.id;
        const deletedCourse = await Courses.findByPk(courseID);
        await deletedCourse.update({
            is_deleted: true
        });
        res.status(201).json({ message: "course deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in delete course controller' });
    }
};

async function teacherCourse(req, res){
    try{
        const userID = req.user.id;
        const teacherCourse = await Courses.findAll({
            where:{
                course_teacher: userID,
                is_deleted: false,
            },
            include: [
                {
                    model: Users,
                    as: "teacher",
                    attributes: ['user_id', 'user_name'],
                },
            ],
        });
        res.status(200).json(teacherCourse);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error in get teachers controller' });
    }
};

async function teacherCourses(req, res){
    try{
        const teacherID = req.params.id;
        const teacherCourses = await Courses.findAll({
            where:{
                course_teacher: teacherID,
                is_deleted: false
            },
            include: [
                {
                    model: Users,
                    as: "teacher",
                    attributes: ['user_id', 'user_name'],
                },
            ],
        });
        res.status(200).json(teacherCourses);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error in get teacher Courses controller' });
    }
}

module.exports = {
    addCourse,
    availableCourses,
    courseDetails,
    updateCourse,
    deleteCourse,
    teacherCourse,
    teacherCourses
};