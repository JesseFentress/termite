import { useFormik } from "formik";
import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useEffect, useState } from "react";
import { getUnassignedDevs } from "../../../util/projectHandler";


export const NewTeamMemberForm = ({
    token,
    onNewTeamMemberSubmit
}) => {
    const [ potentialTeamMembers, setPotentialTeamMembers ] = useState();
    const { id } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        const unassignedDevs = getUnassignedDevs({token: token, projectID: id});
        unassignedDevs.then(value => {
            console.log(value);
            setPotentialTeamMembers(value);
          }).catch(err => {
            console.log(err)
          });
    }, []);


    const handleSubmit = async (values) => {
        values.projectID = id;
        //const response = await createTicket(values);
        const response = 0;
        if (response === null) {
            onNewTeamMemberSubmit("An Error Occurred Trying to Add Team Members.");
        }
        formik.resetForm();
        onNewTeamMemberSubmit(response.message);
    }

    const formik = useFormik({ 
        initialValues: {
            newTeamMemberIDs: []
        }, 
        validateOnBlur: true,
        onSubmit: handleSubmit,
    });

    return (
        <div className="mt-4">
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex justify-content-between">
                { potentialTeamMembers ? potentialTeamMembers.map((member, index) => (
                    <div>
                        <input type="checkbox" id={index} name={`member${member.id}`} value={member.id}/>
                        <label htmlFor={index}>{member.first_name + " " + member.last_name}</label>
                    </div>
                )) : null}
                </div>
                <Button
                    type="submit"
                    buttonStyle="btn--primary--solid btn--form w-50 mt-3"
                    buttonSize="md"
                >Assign Team Members</Button>
            </form>
        </div>
    );
};