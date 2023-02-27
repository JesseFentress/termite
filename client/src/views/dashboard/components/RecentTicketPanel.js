import React, { useEffect, useState } from "react";
import { Panel } from "../../../components/Panel";
import { formatDate, priorities, status } from "../../../util/format";
import { getRecentTickets } from "../../../util/ticketHandler";

export const RecentTicketPanel = ({ token }) => {
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    const myTickets = getRecentTickets({ token: token });
    myTickets
      .then((value) => {
        if (value.length !== 0) {
          setTickets(value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Panel title="Recent Tickets" panelSize="panel-wide">
      {tickets ? (
        <table className="table table-sm table-hover w-100">
          <thead>
            <tr className="center">
              <th className="col-1">Priority</th>
              <th className="col-2">Title</th>
              <th className="col-3">Description</th>
              <th className="col-2">Status</th>
              <th className="col-2">Created</th>
              <th className="col-2">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr className="w-100 m-0 mt-2 center" role="button" key={index}>
                <td className="col-1 align-middle">
                  <div
                    className={`dot p-2 bg-${priorities[ticket.priority]}`}
                  ></div>
                </td>
                <td className="col-2">
                  <div className="overflow-hidden overflow-ellipsis">
                    {ticket.title}
                  </div>
                </td>
                <td className="col-3">
                  <div className="overflow-hidden overflow-ellipsis">
                    {ticket.description}
                  </div>
                </td>
                <td className="col-2">
                  <div
                    className={`overflow-hidden overflow-ellipsis text-capitalize c-${
                      status[ticket.status]
                    }`}
                  >
                    {ticket.status}
                  </div>
                </td>
                <td className="col-2">
                  <div className="overflow-hidden overflow-ellipsis">
                    {formatDate(ticket.date_created)}
                  </div>
                </td>
                <td className="col-2">
                  <div className="overflow-hidden overflow-ellipsis">
                    {formatDate(ticket.date_deadline)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>No Ticket Information Found</p>
        </div>
      )}
    </Panel>
  );
};
