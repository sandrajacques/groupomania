
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', userCtrl.profil);
router.put('/profil/:id',multer, userCtrl.changeProfil); 

module.exports = router;