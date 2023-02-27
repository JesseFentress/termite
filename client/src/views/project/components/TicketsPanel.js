import { useState, useEffect } from "react";
import { PaginationButtons } from "../../../components/PaginationButtons";
import { Panel } from "../../../components/Panel";
import { formatDate, priorities, status } from "../../../util/format";
import { getPaginatedProjectTickets } from "../../../util/ticketHandler";
import { NewTicketPopup } from "./NewTicketPopup";

export const TicketPanel = ({
  onPanelButtonClick,
  onTableClick,
  token,
  id,
}) => {
  const [tickets, setTickets] = useState([]);
  const [totalTicketCount, setTotalTicketCount] = useState(0);
  const [ticketPage, setTicketPage] = useState(1);
  const [newTicketCreated, setNewTicketCreated] = useState(false);
  const TICKET_LIMIT_FOR_PROJECT_PAGE = 4;

  useEffect(() => {
    const tickets = getPaginatedProjectTickets({
      token: token,
      projectID: id,
      ticketLimit: TICKET_LIMIT_FOR_PROJECT_PAGE,
      pageNumber: ticketPage,
    });
    tickets
      .then((value) => {
        setTickets(value.tickets);
        setTotalTicketCount(value.totalTicketCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ticketPage, newTicketCreated]);

  const handlePagination = (e) => {
    setTicketPage(e.target.id.slice(-1));
  };

  const pageCount = () => {
    return Math.ceil(totalTicketCount / TICKET_LIMIT_FOR_PROJECT_PAGE);
  };

  const refreshTickets = () => {
    if (newTicketCreated === false) {
      setNewTicketCreated(true);
    } else {
      setNewTicketCreated(false);
    }
  };

  const handlePanelButtonClick = () => {
    onPanelButtonClick(
      <NewTicketPopup
        token={token}
        onPopupClose={onPanelButtonClick}
        onNewTicketSubmit={refreshTickets}
      />
    );
  };

  const getClickedTicket = (index) => {
    if (index % 4 === 0) {
      return tickets[0];
    } else if ((index - 1) % 4 === 0) {
      return tickets[1];
    } else if ((index - 2) % 4 === 0) {
      return tickets[2];
    }
    return tickets[3];
  };

  return (
    <div className="col-8">
      <Panel
        title="Tickets"
        panelSize="panel-wide"
        buttonText="Create New Ticket"
        onClick={handlePanelButtonClick}
      >
        <div className="mx-2 overflow-auto">
          <table className="table table-bordered table-sm table-hover">
            <thead>
              <tr className="center">
                <th>Priority</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Submitter</th>
                <th>Created</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tickets
                ? tickets.map((ticket, index) => (
                    <tr
                      className="w-100 mt-2"
                      role="button"
                      key={index}
                      onClick={() =>
                        onTableClick(
                          getClickedTicket(
                            (ticketPage - 1) * TICKET_LIMIT_FOR_PROJECT_PAGE +
                              index
                          )
                        )
                      }
                    >
                      <td className="col-1 center align-middle">
                        <div
                          className={`dot p-2 bg-${
                            priorities[ticket.priority]
                          }`}
                          key={index}
                        ></div>
                      </td>
                      <td className="col-2">
                        <div
                          className="overflow-hidden overflow-ellipsis"
                          key={index}
                        >
                          {ticket.title}
                        </div>
                      </td>
                      <td className="col-3">
                        <div
                          className="overflow-hidden overflow-ellipsis"
                          key={index}
                        >
                          {ticket.description}
                        </div>
                      </td>
                      <td className="col-1 center">
                        <div
                          className={`overflow-hidden overflow-ellipsis text-capitalize c-${
                            status[ticket.status]
                          }`}
                          key={index}
                        >
                          {ticket.status}
                        </div>
                      </td>
                      <td className="col-2 center">
                        <div
                          className="overflow-hidden overflow-ellipsis"
                          key={index}
                        >
                          {ticket.submitter_first_name +
                            " " +
                            ticket.submitter_last_name}
                        </div>
                      </td>
                      <td className="col-1">
                        <div
                          className="overflow-hidden overflow-ellipsis"
                          key={index}
                        >
                          {formatDate(ticket.date_created)}
                        </div>
                      </td>
                      <td className="col-1">
                        <div
                          className="overflow-hidden overflow-ellipsis"
                          key={index}
                        >
                          {formatDate(ticket.date_deadline)}
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <PaginationButtons
          numberOfPages={pageCount()}
          onPagination={handlePagination}
        />
      </Panel>
    </div>
  );
};
