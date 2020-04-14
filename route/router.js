const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const testController = require('../controller/controller');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


// Login
router.post('/sign-in', (req, res) => testController.signIn(req, res));

// signUp
router.post('/sign-up', (req, res) => testController.signUp(req, res));

module.exports = router;