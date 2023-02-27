import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { Overlay } from "../../components/Overlay";
import { getProject } from "../../util/projectHandler";
import { getProjectTickets } from "../../util/ticketHandler";
import { ProjectInfoPanel } from "./components/ProjectInfoPanel";
import { TeamPanel } from "./components/TeamPanel";
import { TicketInfoPanel } from "./components/TicketInfoPanel";
import { TicketPanel } from "./components/TicketsPanel";

export const ProjectPage = ({ token }) => {
  const [project, setProject] = useState();
  const [tickets, setTickets] = useState();
  const [activeTicket, setActiveTicket] = useState(null);
  const [popup, setPopup] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const project = getProject({ token: token, projectID: id });
    getTickets();
    project
      .then((value) => {
        setProject(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getTickets = () => {
    const tickets = getProjectTickets({ token: token, projectID: id });
    tickets
      .then((value) => {
        setTickets(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePopup = (popupComponent) => {
    setPopup(popupComponent);
  };

  const handleTableClick = (clickedTicket) => {
    setActiveTicket(clickedTicket);
  };

  return (
    <Overlay title={project ? project[0].title : null}>
      <div className="">
        {popup !== null ? <>{popup}</> : null}
        <div className="row">
          <ProjectInfoPanel
            project={project ? project[0] : null}
            tickets={tickets ? tickets : null}
          />
          <TicketPanel
            onPanelButtonClick={handlePopup}
            onTableClick={handleTableClick}
            token={token}
            id={id}
          />
        </div>
        <div className="row">
          {user.role !== "developer" ? (
            <TeamPanel id={id} />
          ) : (
            <TeamPanel id={id} onPanelButtonClick={handlePopup} />
          )}
          {activeTicket ? <TicketInfoPanel ticket={activeTicket} /> : null}
        </div>
      </div>
    </Overlay>
  );
};
