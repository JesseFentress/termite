import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Overlay } from "../../components/Overlay";
import { getProject } from "../../util/projectHandler";
import { ProjectInfoPanel } from "./components/ProjectInfoPanel";


export const TicketPage = ({
    token
}) => {
    const [ ticket, setTicket ] = useState();
    const { id } = useParams();
    
    useEffect(() => {
    
    }, []);

    return (
        <Overlay title={project ? project[0].name : null}>
            <div className="d-flex">

            </div>
        </Overlay>
    );
};
