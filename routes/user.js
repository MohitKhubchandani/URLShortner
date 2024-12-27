import express from 'express';
import handleUserSignUp, { handleUserSignIn } from '../controllers/user.js';
const router = express.Router();

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.get('/signin', (req, res) => {
    return res.render("signin");
});

router.post('/signup', handleUserSignUp);

router.post('/signin', handleUserSignIn);


export default router;