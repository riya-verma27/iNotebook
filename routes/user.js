const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// ROUTE: Update User Information (name, email, password)
// PUT request to /api/user/update
router.put('/update', fetchuser, [
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }).optional()
], async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate the inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create an object to store the updated user information
        const newUserDetails = {};
        if (name) newUserDetails.name = name;
        if (email) newUserDetails.email = email;
        if (password) {
            // Hash the new password before updating
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            newUserDetails.password = hashedPassword;
        }

        // Update user in the database
        const userId = req.user.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        user = await User.findByIdAndUpdate(userId, { $set: newUserDetails }, { new: true });
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
