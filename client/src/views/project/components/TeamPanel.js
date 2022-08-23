import { useAuth } from "../../../auth/AuthContext";
import { Panel } from "../../../components/Panel";
import { NewTeamMemberPopup } from "./NewTeamMemberPopup";
import { TeamTable } from "./TeamTable";

export const TeamPanel = ({
    team,
    token,
    onPanelButtonClick
}) => {
    const { user } = useAuth();

    const handlePanelButtonClick = () => {
        onPanelButtonClick(<NewTeamMemberPopup token={token} onPopupClose={onPanelButtonClick}/>);
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