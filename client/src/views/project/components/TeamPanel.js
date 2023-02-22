import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { Panel } from "../../../components/Panel";
import { getTeam } from "../../../util/projectHandler";
import { NewTeamMemberPopup } from "./NewTeamMemberPopup";
import { TeamTable } from "./TeamTable";

export const TeamPanel = ({
    id,
    onPanelButtonClick
}) => {
    const { user, token } = useAuth();
    const [ team, setTeam ] = useState([]);
    const [ newTeamMemberAdded, setNewTeamMemberAdded ] = useState(false);

    const handlePanelButtonClick = () => {
        onPanelButtonClick(<NewTeamMemberPopup token={token} onPopupClose={onPanelButtonClick} onNewTeamMemberSubmit={refreshTeam}/>);
    }

    useEffect(() => {
        const teamMembers = getTeam({token: token, projectID: id});
        teamMembers.then(value => {
            setTeam(value);
        }).catch(err => {
            console.log(err);
        });
    }, [newTeamMemberAdded]);

    const refreshTeam = ()  => {
        if (newTeamMemberAdded === false) {
            setNewTeamMemberAdded(true);
        }
        else {
            setNewTeamMemberAdded(false);
        }
    }
    
    return (
        <div className="col-4">
            { user.role !== "developer" ?
                <Panel
                    title="Team"
                >             
                    <TeamTable team={team}/>
                </Panel>
                :
                <Panel
                    title="Team"
                    buttonText="Add Team Member"
                    onClick={handlePanelButtonClick}
                >             
                    <TeamTable team={team}/>
                </Panel>
            }
        </div>
    );
}