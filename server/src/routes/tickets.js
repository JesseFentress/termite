const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const {
            title, 
            description, 
            status, 
            date_created, 
            date_deadline, 
            priority, 
            submitter, 
            project_id
        } = req.body;
        const newTicket = await pool.query(
            "INSERT INTO ticket (title, description, status, date_created, date_deadline, priority, submitter, project_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [title, description, status, date_created, date_deadline, priority, submitter, project_id]
        );
        res.json(newTicket.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/retrieve/paginated", async (req, res) => {
    try {
        const {
            ticketLimit,
            pageNumber
        } = req.query;
        const paginatedTickets = await pool.query(
            "SELECT * FROM ticket ORDER BY id LIMIT $1 OFFSET $2",
            [ticketLimit, pageNumber]
        );
        res.json(paginatedTickets.rows);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;