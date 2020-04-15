const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const testController = require('../controller/controller');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



// Login
router.post('/sign-in', asyncHandler((req, res) => testController.signIn(req, res)));

// signUp
router.post('/sign-up', asyncHandler((req, res) => testController.signUp(req, res)));

module.exports = router;