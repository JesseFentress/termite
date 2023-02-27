import React, { useEffect, useState } from "react";
import { Panel } from "../../../components/Panel";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getTicketStatus } from "../../../util/ticketHandler";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

export const StatusPanel = ({ token }) => {
  const [tickets, setTickets] = useState();

  useEffect(() => {
    const myTickets = getTicketStatus({ token: token });
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

  const getCount = () => {
    if (tickets !== undefined) {
      if (tickets.length === 3) {
        return [tickets[0].count, tickets[1].count, tickets[2].count];
      } else if (tickets.length === 2) {
        return [tickets[0].count, tickets[1].count, 0];
      } else if (tickets.length === 1) {
        return [tickets[0].count, 0, 0];
      }
    }
    return [0, 0, 0];
  };

  return (
    <Panel title="Status Breakdown">
      <div>
        <Doughnut
          height={225}
          width={225}
          data={{
            labels: ["New", "In Progress", "Resolved"],
            datasets: [
              {
                label: "Number of Tickets",
                data: getCount(),
                hoverOffset: 3,
                backgroundColor: ["green", "orange", "blue"],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </Panel>
  );
};
