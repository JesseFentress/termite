const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const {
            title,
            admin_id
        } = req.body;
        const newProject = await pool.query(
            "INSERT INTO project (title, admin_id) VALUES ($1, $2) RETURNING *",
            [title, admin_id]
        );
        res.json(newProject.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/retrieve-all", async (req, res) => {
    try  {
        const { id } = req.query;
        const projects = await pool.query(
            "SELECT title AS title, project.id AS id FROM project JOIN project_members ON project.id=project_id WHERE member_id=$1",
            [id]
        );
        res.json(projects.rows);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/retrieve", async (req, res) => {
    try  {
        const { projectID } = req.query;
        const project = await pool.query(
            "SELECT title AS title, first_name AS admin_first_name, last_name as admin_last_name, email as admin_email FROM project JOIN users ON project.admin_id=users.id WHERE project.id=$1",
            [projectID]
        );
        res.json(project.rows);
    } catch (err) {
        console.log(err.message);
    }
});


router.post("/add-member", async (req, res) => {
    try {
        const {
            projectID,
            memberID
        } = req.body;

        const newMember = await pool.query(
            "INSERT INTO project_members (project_id, member_id) VALUES ($1, $2) RETURNING *",
            [projectID, memberID]
        );
        res.json(newMember.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/retrieve-members", async (req, res) => {
    try {
        const { projectID } = req.query;
        const teamMembers = await pool.query(
            "SELECT first_name, last_name, email FROM project_members JOIN users ON project_members.member_id=users.id WHERE project_id=$1",
            [projectID]
        );
        res.json(teamMembers.rows);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/retrieve-unassigned", async (req, res) => {
    try {
        const { projectID } = req.query;
        const unassignedDevs = await pool.query(
            "SELECT id, first_name, last_name FROM users WHERE id NOT IN (SELECT member_id FROM project_members WHERE project_id=$1)",
            [projectID]
        );
        res.json(unassignedDevs.rows);
    } catch (err) {
        console.log(err.message);
    }
});

router.post("/assign-members", async (req, res) => {
    try {
        const { 
            projectID,
            newTeamMemberIDs
        } = req.body;
        for (id of newTeamMemberIDs) {
            const assignDevs =  await pool.query(
                "INSERT INTO project_members (project_id, member_id) VALUES ($1, $2)",
                [projectID, id]
            );
        }
        res.json({message: "Team Members Added Successfully!"});
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;