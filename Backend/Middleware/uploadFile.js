const multer = require("multer");
const path = require("path");
const express = require('express');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const admin = require('firebase-admin');
const serviceAccount = require('../my-gallery-2e2f2-firebase-adminsdk-7gig9-47951ef958.json');
//https://surejob.in/wp-content/uploads/2022/12/12-Free-Online-Courses-With-Certificates-In-India-By-Government-2023.jpg''
const app = express();
app.use(express.static('public'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://my-gallery-2e2f2.appspot.com',
});

function uploadImg(req, res, next) {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.error('Error uploading image:', err);
                return res.status(500).send('Error uploading image.');
            }
            if (req.file === undefined) {
                console.error('No image file provided');
                res.locals.site = null;
                return next();
            }
            try {
                const bucket = admin.storage().bucket();
                const imageBuffer = req.file.buffer;
                const imageName = req.file.originalname;
                const file = bucket.file(imageName);
                const fileType = req.file.mimetype;
                await file.save(imageBuffer, { contentType: fileType });
                getImageDownloadUrl(imageName)
                    .then(url => {
                        res.locals.site = url;
                        next();
                    })
                    .catch(error => {
                        console.error('Error getting image download URL:', error);
                        res.status(500).send('Error getting image download URL.');
                    });
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                res.status(500).send('Error uploading image.');
            }
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image.');
    }
};

async function getImageDownloadUrl(imageName) {
    try {
      const bucket = admin.storage().bucket();
      const file = bucket.file(imageName);
  
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2025',
      });
      return url;
    } catch (error) {
      console.error('Error getting image download URL:', error);
      throw error;
    }
};

module.exports = { 
    uploadImg,
    admin
};