import { Panel } from "../../../components/Panel";

export const ProjectInfoPanel = ({
    project,
    tickets
}) => {

    const getTicketCountByStatus = (allTickets, statusValue) => {
        const totalTickets = allTickets.filter(ticket => ticket.status === statusValue).length;
        return totalTickets ? totalTickets : 0;
    };

    const getTicketCountByPriority = (allTickets, priorityValue) => {
        const totalTickets = allTickets.filter(ticket => ticket.priority === priorityValue).length;
        return totalTickets ? totalTickets : 0;
    };


    return (
        <div className="col-4">
            <Panel title="Project Info" panelSize="panel">
                <div className="pt-4">
                    <div className="row col-12">
                        <div className="col-6 text-left px-3 d-flex flex-column">
                            <label
                            htmlFor="title"
                            className="text-muted"
                            >
                            Title</label>
                            <p className="mx-2" id="title">{project ? project.title : null}</p>
                        </div>
                        <div className="col-6 text-left px-3 d-flex flex-column">
                            <label
                                htmlFor="admin"
                                className="text-muted"
                            > Admin</label>
                            <p className="mx-2" id="admin">{project ? project.admin_first_name + " " + project.admin_last_name : null}</p>
                        </div>
                    </div>
                    <div className="row col-12">
                        <div className="col-12 text-left px-3 d-flex flex-column">
                            <label
                            htmlFor="tickets"
                            className="text-muted"
                            >
                            Tickets</label>
                            <div id="tickets">
                                <div className="d-flex flex justify-content-around">
                                    <div><span className="badge bg-success">New</span>{tickets ? getTicketCountByStatus(tickets, "new") : null}</div>
                                    <div><span className="badge bg-warning">In Progress</span>{tickets ? getTicketCountByStatus(tickets, "in progress") : null}</div>
                                    <div><span className="badge bg-primary">Resolved</span>{tickets ? getTicketCountByStatus(tickets, "resolved") : null}</div>
                                </div>
                                <div className="d-flex flex justify-content-around pt-4">
                                    <div><span className="badge bg-low">Low</span>{tickets ? getTicketCountByPriority(tickets, 1) : null}</div>
                                    <div><span className="badge bg-medium">Medium</span>{tickets ? getTicketCountByPriority(tickets, 2) : null}</div>
                                    <div><span className="badge bg-high">High</span>{tickets ? getTicketCountByPriority(tickets, 3) : null}</div>
                                    <div><span className="badge bg-urgent">Urgent</span>{tickets ? getTicketCountByPriority(tickets, 4) : null}</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
        </div> 
    );
};