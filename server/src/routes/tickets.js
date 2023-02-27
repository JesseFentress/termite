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
      project_id,
    } = req.body;
    const newTicket = await pool.query(
      "INSERT INTO ticket (title, description, status, date_created, date_deadline, priority, submitter, project_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        title,
        description,
        status,
        date_created,
        date_deadline,
        priority,
        submitter,
        project_id,
      ]
    );
    res.json(newTicket.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/create-ticket", async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      created,
      deadline,
      priority,
      submitter,
      projectID,
    } = req.body;
    const newTicket = await pool.query(
      "INSERT INTO ticket (title, description, status, date_created, date_deadline, " +
        "priority, submitter, project_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        title,
        description,
        status,
        created,
        deadline,
        priority,
        submitter,
        projectID,
      ]
    );
    res.json({ message: "Ticket Successfully Created." });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/retrieve/paginated", async (req, res) => {
  try {
    const { ticketLimit, pageNumber, id } = req.query;
    const paginatedTickets = await pool.query(
      "SELECT * FROM ticket WHERE submitter=$1 ORDER BY id LIMIT $2 OFFSET $3",
      [id, ticketLimit, pageNumber]
    );
    res.json(paginatedTickets.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/retrieve/paginated-project", async (req, res) => {
  try {
    const { ticketLimit, pageNumber, projectID } = req.query;
    const paginatedTickets = await pool.query(
      "SELECT ticket.id, title, project_id, description, date_created, date_deadline ,priority, status, " +
        "first_name AS submitter_first_name, last_name AS submitter_last_name FROM ticket " +
        "JOIN users ON ticket.submitter=users.id WHERE project_id=$1 ORDER BY ticket.id LIMIT $2 OFFSET $3",
      [projectID, ticketLimit, pageNumber]
    );
    const totalTicketCount = await pool.query(
      "SELECT id, COUNT(id) FROM ticket WHERE project_id=$1 GROUP BY id;",
      [projectID]
    );
    res.json({
      tickets: paginatedTickets.rows,
      totalTicketCount: totalTicketCount.rows.length,
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/retrieve/recent", async (req, res) => {
  try {
    const { id } = req.query;
    const ticketLimit = 5;
    const recentTickets = await pool.query(
      "SELECT * FROM ticket WHERE submitter=$1 ORDER BY date_created LIMIT $2",
      [id, ticketLimit]
    );
    res.json(recentTickets.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/retrieve/status", async (req, res) => {
  try {
    const { id } = req.query;
    const statusCount = await pool.query(
      "SELECT status, COUNT(*) AS Count FROM ticket WHERE submitter=$1 GROUP BY status",
      [id]
    );
    res.json(statusCount.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/retrieve/priority-count", async (req, res) => {
  try {
    const { id } = req.query;
    const ticketCount = await pool.query(
      "SELECT priority, COUNT(*) AS Count FROM ticket WHERE submitter=$1 GROUP BY priority",
      [id]
    );
    res.json(ticketCount.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/retrieve/project/tickets", async (req, res) => {
  try {
    const { projectID } = req.query;
    const projectTickets = await pool.query(
      "SELECT title, project_id, description, date_created, date_deadline ,priority, status, " +
        "first_name AS submitter_first_name, last_name AS submitter_last_name FROM ticket " +
        "JOIN users ON ticket.submitter=users.id WHERE project_id=$1",
      [projectID]
    );
    res.json(projectTickets.rows);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
