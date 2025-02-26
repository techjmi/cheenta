const express = require('express');
const { signup, signin, getUser, deleteUser, updateUser } = require('../controller/user.controller');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/update/:id', verifyToken, updateUser);
router.get('/user', verifyToken, getUser);
router.delete('/delete/:id', verifyToken, deleteUser);
module.exports = router;
