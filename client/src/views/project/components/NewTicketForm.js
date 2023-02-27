import { useFormik } from "formik";
import { Button } from "../../../components/Button";
import { createTicket } from "../../../util/ticketHandler";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { formatDate } from "../../../util/format";

export const NewTicketForm = ({ token, onNewTicketSubmit }) => {
  const { id } = useParams();
  const { user } = useAuth();

  const handleSubmit = async (values) => {
    values.created = formatDate(values.created);
    values.deadline = formatDate(values.deadline);
    values.projectID = id;
    values.submitter = user.id;
    values.token = token;
    const response = await createTicket(values);
    if (response === null) {
      onNewTicketSubmit("An Error Occurred Trying to Create a New Ticket.");
    }
    formik.resetForm();
    onNewTicketSubmit(response.message);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "new",
      priority: 1,
      created: new Date(),
      deadline: new Date(),
    },
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-between">
          <div className="form-floating mb-3 col-4">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Ticket Title"
              maxLength="25"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <label htmlFor="title">Ticket Title</label>
          </div>
          <div className="form-floating">
            <DatePicker
              selected={formik.values.deadline}
              date={formik.values.deadline}
              onChange={(date) => formik.setFieldValue("deadline", date)}
              value={formik.values.deadline}
              id="datePickerInput"
              className="form-control"
            />
            <label htmlFor="datePickerInput" id="datePickerLabel">
              Deadline
            </label>
          </div>
          <div className="form-floating col-3">
            <select
              className="form-select mb-3"
              aria-label="Default select example"
              id="priority"
              value={formik.values[3]}
              onChange={formik.handleChange}
            >
              <option defaultValue value="1">
                Low
              </option>
              <option value="2">Medium</option>
              <option value="3">High</option>
              <option value="4">Urgent</option>
            </select>
            <label htmlFor="priority">Priority</label>
          </div>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control h-300"
            placeholder="Leave a comment here"
            id="description"
            maxLength="255"
            style={{ height: 125 }}
            value={formik.values[1]}
            onChange={formik.handleChange}
          ></textarea>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <div className="mb-3">
            <label htmlFor="attachedFile" className="form-label" />
            <input className="form-control" type="file" id="attachedFile" />
          </div>
        </div>
        <Button
          type="submit"
          buttonStyle="btn--primary--solid btn--form w-50 mt-3"
          buttonSize="md"
        >
          Assign to Team
        </Button>
      </form>
    </div>
  );
};
