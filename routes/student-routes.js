const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student-controllers');

// Routes
router.get('/', studentController.view);
router.post('/', studentController.find);
router.get('/student-home', studentController.studentHome);
router.get('/addstudent', studentController.form);
router.post('/addnewstudent', studentController.create);
router.get('/editstudent/:id', studentController.edit);
router.post('/editstudent/:id', studentController.update);
router.get('/viewstudent', studentController.viewall);
router.get('/delete/:id', studentController.delete);

module.exports = router;