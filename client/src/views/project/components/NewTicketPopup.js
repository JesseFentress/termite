import { useState } from "react";
import { Panel } from "../../../components/Panel";
import "../projectpage.css";
import { NewTicketForm } from "./NewTicketForm";

export const NewTicketPopup = ({
    onPopupClose,
    onNewTicketSubmit,
    token
}) => {
    const [ newTicketMessage, setNewTicketMessage ] = useState();

    const handleNewTicketSubmit = (message) => {
        setNewTicketMessage(message)
        onNewTicketSubmit();
    };

    const handlePopupClose = () => {
        onPopupClose(null);
    }

    return (
        <div className="popup-box">
            { newTicketMessage ?
                <Panel
                    panelSize="box"
                    onClick={handlePopupClose}
                    panelClose={true}
                >
                    <div>
                        <h4>{newTicketMessage}</h4>
                        <div className="wrapper"> 
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                    </div>
                </Panel>
                :
                <Panel 
                    title="Create New Ticket"
                    panelSize="box"
                    onClick={handlePopupClose}
                    panelClose={true}
                >   
                    <NewTicketForm token={token} onNewTicketSubmit={handleNewTicketSubmit}/>
                </Panel>
            }      
        </div>
    );
}