import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { Overlay } from "../../components/Overlay";
import { getProject, getTeam } from "../../util/projectHandler";
import { getProjectTickets } from "../../util/ticketHandler";
import { ProjectInfoPanel } from "./components/ProjectInfoPanel";
import { TeamPanel } from "./components/TeamPanel";
import { TicketPanel } from "./components/TicketsPanel";

export const ProjectPage = ({
    token
}) => {
    const [ project, setProject ] = useState();
    const [ team, setTeam ] = useState();
    const [ tickets, setTickets ] = useState();
    const { id } = useParams();
    const [ popup, setPopup ] = useState(null);
    const { user } = useAuth();
    
    useEffect(() => {
        const project = getProject({token: token, projectID: id});
        const teamMembers = getTeam({token: token, projectID: id});
        getTickets();
        project.then(value => {
            setProject(value);
        }).catch(err => {
            console.log(err);
        });
        teamMembers.then(value => {
            setTeam(value);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const getTickets = () => {
        const tickets = getProjectTickets({token: token, projectID: id});
        tickets.then(value => {
            setTickets(value);
        }).catch(err => {
            console.log(err);
        });
    }

   /* const handlePopup = (e) => {
        if (e.target.innerHTML === "Create New Ticket") {
                setPopup(<NewTicketPopup token={token} onPopupClose={handlePopup} onTicketRefresh={getTickets}/>);
        }
        else if (e.target.innerHTML === "Add Team Member") {
                setPopup(<NewTeamMemberPopup token={token}  onPopupClose={handlePopup}/>)
        }
        else {
            setPopup(null);
        }
    };*/

    const handlePopup = (popupComponent) => {
        setPopup(popupComponent);
    }

    return (
        <Overlay title={project ? project[0].title : null}>
            <div className="">
                { popup !== null ? 
                    <>{popup}</> 
                    : 
                    null
                } 
                <div className="row">
                    <ProjectInfoPanel project={project ? project[0] : null} tickets={tickets ? tickets : null}/>
                    <TicketPanel onPanelButtonClick={handlePopup} token={token} id={id}/>
                </div>
                <div className="row">
                    { user.role !== "developer" ?
                        <TeamPanel team={team ? team : null}/>
                        :
                        <TeamPanel team={team ? team : null} onPanelButtonClick={handlePopup} token={token}/>
                    }
                </div>
            </div>
        </Overlay>
    );
};
