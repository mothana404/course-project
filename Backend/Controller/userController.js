const { Users, Courses } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { where } = require('sequelize');
require('dotenv').config();

const signupSchema = Joi.object({
    user_name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    user_email: Joi.string()
        .min(3)
        .max(30)
        .required(),

    user_password: Joi.string()
        .required(),

    user_email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
});

const signinSchema = Joi.object({
    user_email: Joi.string()
        .min(3)
        .max(30)
        .required(),

    user_password: Joi.string()
        .required(),
});

async function signUp(req, res){
  try {
    const { user_name, user_email, user_password, user_role } = req.body;
    const validation = await signupSchema.validateAsync({ user_name, user_email, user_password });
    if (validation){
        let hashPassword = await bcrypt.hash(user_password, 10);
        try{
            const newUser = await Users.create({
                user_name : user_name,
                user_email : user_email,
                user_password : hashPassword,
                user_role: user_role || 1
            });
            const accessToken = jwt.sign({id : newUser.dataValues.user_id, email : newUser.user_email, user_role: newUser.user_role}, process.env.SECRET_KEY, {expiresIn: '6h'});
            res.cookie('accessToken', accessToken, { httpOnly: true });
            res.status(201).json({accessToken: accessToken, role: newUser.dataValues.user_role});
        }catch(error){
            console.log(error);
            res.status(400).json("the Email is already exist! or user role not defined in database");
        }
    }else {
        console.log("Invalid inputs");
        res.status(400).json("Invalid inputs");
    }
  } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error in signUp controller' });
  }
};

async function signIn(req, res){
    try {
      const { user_email, user_password } = req.body;
      const validation = await signinSchema.validateAsync({user_email, user_password});
      if (validation){
        const user = await Users.findOne({
            where: {
                user_email,
            },
          });
          if (user && user.user_email === user_email) {
                bcrypt.compare(user_password , user.user_password, (error, result) => {
                if (error) {
                    res.status(400).json(error);
                } else if (result) {
                    const accessToken = jwt.sign({id : user.dataValues.user_id, email : user.user_email, user_role: user.user_role}, process.env.SECRET_KEY, {expiresIn: '6h'});
                    res.cookie('accessToken', accessToken, { httpOnly: true });
                    res.status(200).json({accessToken: accessToken, role: user.dataValues.user_role});
                } else {
                    res.status(400).json('incorrect password');
                }
                });
          }else {
            res.status(401).json({ error: 'Email not found' });
          }
      } else {
            res.status(400).json("Invalid inputs");
      }
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error in signIn controller' });
    }
};

async function userDetails(req, res){
    try{
        const userID = req.user.id;
        const userDetails = await Users.findOne({
            where: {
                user_id: userID,
            },
            include: [
                {
                    model: Courses,
                    as: "courses",
                    attributes: ['course_id', 'course_name', 'start_date', 'end_date', 'course_image',],
                },
            ],
        });
        res.status(200).json(userDetails);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'error in user details' });
    }
};

async function updateUserData(req, res) {
    try {
        const { user_name, user_email, user_password } = req.body;
        const userID = req.user.id;
        if (!user_name || !user_password) {
            return res.status(400).json({ error: 'User name and password are required' });
        }
        const authenticatedUser = await Users.findOne({ where: { user_id: userID } });
        if (!authenticatedUser) {
            return res.status(401).json({ error: 'User not found' });
        }
        if (!bcrypt.compareSync(user_password, authenticatedUser.user_password)) {
            return res.status(401).json({ error: 'invalid password' });
        }
        await Users.update({ user_name, user_email }, { where: { user_id: userID } });
        res.status(200).json({ message: 'User name updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in updating user data' });
    }
};

async function teachers(req, res){
    try{
        const teachers = await Users.findAll({
            where: {
                user_role: 2,
            },
            include: [
                {
                    model: Courses,
                    as: "courses",
                    attributes: ['course_id'],
                    where: {
                        is_deleted: false
                    }
                },
            ],
        });
        res.status(200).json(teachers);
    }catch(error){
        console.log(error);
        res.status(500).json('error in teachers controller');
    }
};

module.exports = {
    signUp,
    signIn,
    userDetails,
    updateUserData,
    teachers
};