const jwt = require('jsonwebtoken');
require('dotenv').config();

async function userAuthorize(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            if (user.id) {
                req.user = user;
                next();
            } else {
                res.status(401).json("Unauthorized");
            }
        } else {
            res.status(401).json("You need to login first");
        }
    } catch (error) {
        res.status(400).json("Error in user auth");
    }
};

async function teacherAuthorize(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            if (user.id && user.user_role === 2) {
                req.user = user;
                next();
            } else {
                res.status(401).json("Unauthorized");
            }
        } else {
            res.status(401).json("You need to login first");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json("Error in user auth");
    }
};


module.exports = {
    userAuthorize,
    teacherAuthorize
};
