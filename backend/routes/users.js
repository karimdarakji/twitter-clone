import express from 'express';
import {Login ,createUser, secregisterUser, postt, verifyToken,} from '../controllers/users.js';

const router = express.Router();


router.post('/create', createUser)
router.post('/login', Login)
router.post('/update', secregisterUser)

router.post('/post', verifyToken, postt)

export default router;