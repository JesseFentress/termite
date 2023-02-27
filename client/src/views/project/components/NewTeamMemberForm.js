import { useFormik } from "formik";
import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { assignDevs, getUnassignedDevs } from "../../../util/projectHandler";

export const NewTeamMemberForm = ({ token, onNewTeamMemberSubmit }) => {
  const [potentialTeamMembers, setPotentialTeamMembers] = useState();
  const { id } = useParams();

  useEffect(() => {
    const unassignedDevs = getUnassignedDevs({ token: token, projectID: id });
    unassignedDevs
      .then((value) => {
        setPotentialTeamMembers(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (values) => {
    values.projectID = id;
    values.token = token;
    const response = await assignDevs(values);
    if (response === null) {
      onNewTeamMemberSubmit("An Error Occurred Trying to Add Team Members.");
    }
    formik.resetForm();
    onNewTeamMemberSubmit(response.message);
  };

  const formik = useFormik({
    initialValues: {
      newTeamMemberIDs: [],
    },
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  const getBackgroundColor = (index) => {
    if (index % 2 === 0) {
      return "bg-termite-light";
    }
    return "bg-lightgray";
  };

  return (
    <div className="mt-4">
      {potentialTeamMembers ? (
        <form onSubmit={formik.handleSubmit}>
          <ul className="newTeamList">
            {potentialTeamMembers.map((member, index) => (
              <li key={index} className={`d-flex ${getBackgroundColor(index)}`}>
                <div className="px-4">
                  <input
                    type="checkbox"
                    id={index}
                    name="newTeamMemberIDs"
                    value={member.id}
                    onChange={formik.handleChange}
                  />
                  <label className="mx-2" htmlFor={index}>
                    {member.first_name + " " + member.last_name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <Button
            type="submit"
            buttonStyle="btn--primary--solid btn--form w-50 mt-3"
            buttonSize="md"
          >
            Assign Team Members
          </Button>
        </form>
      ) : (
        <div>
          <p>No New Team Member Information Found</p>
        </div>
      )}
    </div>
  );
};
