const express = require('express');
const router = express.Router();
const programController = require('../controllers/program-controllers');

// Routes
router.get('/112', programController.view);
router.post('/', programController.find);

router.get('/addprogram', programController.form);
router.post('/addnewprogram', programController.create);
router.get('/editprogram/:program_id', programController.edit);
router.post('/editprogram/:program_id', programController.update);
router.get('/viewprogram', programController.viewall);
router.get('/delete/:program_id', programController.delete);
router.get('/1234', programController.other);

module.exports = router;