import { useState } from "react";
import { Panel } from "../../../components/Panel";
import { NewTeamMemberForm } from "./NewTeamMemberForm";


export const NewTeamMemberPopup = ({
    onPopupClose,
    token
}) => {
    const [ newTeamMemberMessage, setTeamMemberMessage ] = useState();

    const handleNewTeamMemberSubmit = (message) => {
        setTeamMemberMessage(message)
    };

    const handlePopupClose = () => {
        onPopupClose(null);
    }

    return (
        <div className="popup-box">
            { newTeamMemberMessage ?
                <Panel
                    panelSize="box"
                    onClick={handlePopupClose}
                    panelClose={true}
                >
                    <p>{newTeamMemberMessage}</p>
                </Panel>
                :
                <Panel 
                    title="Add A New Team Member"
                    panelSize="box"
                    onClick={handlePopupClose}
                    panelClose={true}
                >   
                    <NewTeamMemberForm token={token} onNewTeamMemberSubmit={handleNewTeamMemberSubmit}/>
                </Panel>
            }      
        </div>
    );
}