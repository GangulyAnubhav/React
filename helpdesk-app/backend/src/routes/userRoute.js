import express from 'express'; 
import usercontroller from '../controllers/userController.js';

const router = express.Router();

router.post('/users', usercontroller.createUser);
router.get('/users/:email', usercontroller.getUserByEmail);

export default router;

