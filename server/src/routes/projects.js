const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const {
            name,
            user_id
        } = req.body;
        const newProject = await pool.query(
            "INSERT INTO project (name, user_id) VALUES ($1, $2) RETURNING *",
            [name, user_id]
        );
        res.json(newProject.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/retrieve", async (req, res) => {
    try  {
        const projects = await pool.query(
            "SELECT * FROM project",
        );
        res.json(projects.rows);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;