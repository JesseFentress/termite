import React, { useEffect, useState } from "react";
import { Panel } from "../../../components/Panel";
import { getTicketPriority } from "../../../util/ticketHandler";

export const PriorityPanel = ({ token }) => {
  const [tickets, setTickets] = useState(null);
  const [totalTicketCount, setTotalTicketCount] = useState(0);

  const calculatePercent = (count) => {
    return (count / totalTicketCount) * 100;
  };

  const totalTickets = (tickets) => {
    let sum = 0;
    for (let i = 0; i < tickets.length; i++) {
      sum = sum + Number(tickets[i].count);
    }
    return sum;
  };

  useEffect(() => {
    const myTickets = getTicketPriority({ token: token });
    myTickets
      .then((value) => {
        if (value.length !== 0) {
          setTickets(value);
          setTotalTicketCount(totalTickets(value));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Panel title="Priority Breakdown">
      <ul className="mt-4">
        <li className="mb-3">
          <div className="d-flex text-start">
            <label className="col-3" htmlFor="urgentCount">
              Urgent
            </label>
            <div className="progress col-8 bar">
              <div
                className="progress-bar bg-urgent"
                style={{
                  width: `${
                    tickets && tickets[0]
                      ? calculatePercent(tickets[0].count)
                      : 0
                  }%`,
                }}
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </li>
        <li className="mb-3">
          <div className="d-flex text-start">
            <label className="col-3" htmlFor="highCount">
              High
            </label>
            <div className="progress col-8 bar">
              <div
                className="progress-bar bg-high"
                style={{
                  width: `${
                    tickets && tickets[1]
                      ? calculatePercent(tickets[1].count)
                      : 0
                  }%`,
                }}
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </li>
        <li className="mb-3">
          <div className="d-flex text-start">
            <label className="col-3" htmlFor="mediumCount">
              Medium
            </label>
            <div className="progress col-8 bar">
              <div
                className="progress-bar bg-medium"
                style={{
                  width: `${
                    tickets && tickets[2]
                      ? calculatePercent(tickets[2].count)
                      : 0
                  }%`,
                }}
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </li>
        <li className="mb-3">
          <div className="d-flex text-start">
            <label className="col-3" htmlFor="lowCount">
              Low
            </label>
            <div className="progress col-8 bar">
              <div
                className="progress-bar bg-low"
                style={{
                  width: `${
                    tickets && tickets[3]
                      ? calculatePercent(tickets[3].count)
                      : 0
                  }%`,
                }}
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </li>
      </ul>
    </Panel>
  );
};
