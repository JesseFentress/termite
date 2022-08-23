const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateToken, authenticateRequest } = require("../util/auth");

router.get("/retrieve", authenticateRequest ,async (req, res) => {
    try {
        const { id } = req.query;
        const user = await pool.query(
            "SELECT * FROM users WHERE id=$1",
            [id]
        );
        if (user.rows.length > 0) {
            res.json({
                firstName: user.rows[0].first_name, 
                lastName: user.rows[0].last_name, 
                role: user.rows[0].role,
                id: user.rows[0].id
        });
        }
    } catch (err) {
        console.log(err.message);
    }
});

router.post("/signup/create", async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            password,
            role 
        } = req.body;
        const userExists = await pool.query(
            "SELECT email FROM users WHERE email=$1",
            [email]
        );
        if (userExists.rows.length > 0) {
            res.json({ message: "Email is already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, passhash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [firstName, lastName, email, hashedPassword, role]
        );
        res.json({ 
            message: "Thank you for registering", 
            user: newUser.rows[0],
            token: generateToken(newUser.rows[0].id) 
        });

    } catch (err) {
        console.log(err.message);
    }
});

router.post("/login/validate", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const validUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );
        if (validUser.rows.length === 0) {
            res.json({
                 message: "Invalid email or password", 
                 loggedIn: false 
            });
        }
        if(await bcrypt.compare(password, validUser.rows[0].passhash)) {
            res.json({ 
                message: "Successful login", 
                loggedIn: true,
                user: validUser.rows[0],
                token: generateToken(validUser.rows[0].id)
            });
        }
        else {
            res.json({ 
                message: "Invalid email or password", 
                loggedIn: false 
            });
        }

    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;