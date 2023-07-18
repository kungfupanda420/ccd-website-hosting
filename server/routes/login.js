require("dotenv").config();
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;

    // For simplicity, using a hardcoded user
    // In real-world apps, you'd fetch and validate user from a database
    const hardcodedUser = {
        email: process.env.ADMIN_MAIL,
        password: process.env.ADMIN_PASS // Never store passwords as plain text in production
    };

    if (email === hardcodedUser.email && password === hardcodedUser.password) {
        // login successful
        res.status(200).json({
            message: 'Login successful!'
        });
    } else {
        // login failed
        res.status(401).json({
            message: 'Invalid credentials'
        });
    }
});

module.exports = router;
