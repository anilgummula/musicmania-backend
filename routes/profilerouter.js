const { getProfile, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/view', authMiddleware, getProfile);
router.put('/update', authMiddleware, updateProfile);

module.exports=router;