import axios from "axios";

export const getProjects = async (values) => {
    try {
        const response = await axios.get(
            "http://localhost:5000/projects/retrieve-all", {
            params:  {
                token: values.token
            }
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
};

export const getProject = async (values) => {
    try {
        const response = await axios.get(
            "http://localhost:5000/projects/retrieve", {
            params:  {
                token: values.token,
                projectID: values.projectID
            }
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
};

export const getTeam = async (values) => {
    try {
        const response = await axios.get(
            "http://localhost:5000/projects/retrieve-members", {
            params: {
                token: values.token,
                projectID: values.projectID
            }
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
};

export const getUnassignedDevs = async (values) => {
    try {
        const response = await axios.get(
            "http://localhost:5000/projects/retrieve-unassigned", {
            params: {
                token: values.token,
                projectID: values.projectID
            }
        });
        if (response && response.data) {
            return response.data;
        } 
    } catch (err) {
        console.log(err);
    }
};
