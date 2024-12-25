import express from 'express';
import handleUserSignUp from '../controllers/user.js';
const router = express.Router();

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.post('/signup', handleUserSignUp);

// router.post('/signup', (req, res) => {
//     const { name, email, password } = req.body;
//     console.log(req.body); // Log the data to verify
//     res.render("home");
// });


export default router;