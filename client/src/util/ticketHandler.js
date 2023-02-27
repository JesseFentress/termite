import axios from "axios";

const calculateTicketPageOffset = (pageNumber, ticketLimit) => {
  return (pageNumber - 1) * ticketLimit;
};

export const getTicketPriority = async (values) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/tickets/retrieve/priority-count",
      {
        params: {
          token: values.token,
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (err) {}
};

export const getTicketStatus = async (values) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/tickets/retrieve/status",
      {
        params: {
          token: values.token,
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (err) {}
};

export const getRecentTickets = async (values) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/tickets/retrieve/recent",
      {
        params: {
          token: values.token,
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPaginatedTickets = async (values) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/tickets/retrieve/paginated",
      {
        params: {
          token: values.token,
          ticketLimit: 5,
          pageNumber: 1,
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPaginatedProjectTickets = async (values) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/tickets/retrieve/paginated-project",
      {
        params: {
          token: values.token,
          projectID: values.projectID,
          ticketLimit: values.ticketLimit,
          pageNumber: calculateTicketPageOffset(
            values.pageNumber,
            values.ticketLimit
          ),
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProjectTickets = async (values) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/tickets/retrieve/project/tickets",
      {
        params: {
          token: values.token,
          projectID: values.projectID,
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const createTicket = async (values) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/tickets/create-ticket",
      {
        token: values.token,
        projectID: values.projectID,
        submitter: values.submitter,
        title: values.title,
        description: values.description,
        priority: values.priority,
        deadline: values.deadline,
        created: values.created,
        status: values.status,
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
