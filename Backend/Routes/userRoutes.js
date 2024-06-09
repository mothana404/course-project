const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const auth = require('../Middleware/userAuth');

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.get('/profilePage', auth.userAuthorize, userController.userDetails);
router.get('/teachers', userController.teachers);
router.put('/updateProfile', auth.userAuthorize, userController.updateUserData);

module.exports = router;