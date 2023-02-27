import { Panel } from "../../../components/Panel";
import { priorities, status } from "../../../util/format";

export const TicketInfoPanel = ({ ticket, handlePanelButtonClick }) => {
  return (
    <div className="col-8">
      <Panel
        title="Ticket Information"
        panelSize="panel-wide"
        buttonText="Edit Ticket"
        onClick={handlePanelButtonClick}
      >
        <div className="d-flex h-200">
          <div className="col-7 d-flex flex-column">
            <div className="d-flex">
              <div className="col-3 text-left px-3 d-flex flex-column">
                <label htmlFor="title" className="text-muted">
                  Title
                </label>
                <p className="" id="title">
                  {ticket.title}
                </p>
              </div>
              <div className="col-3 text-left px-3 d-flex flex-column">
                <label htmlFor="status" className="text-muted">
                  Status
                </label>
                <p
                  className={`capitalize c-${status[ticket.status]}`}
                  id="status"
                >
                  {ticket.status}
                </p>
              </div>
              <div className="col-3 text-left px-3 d-flex flex-column">
                <label htmlFor="priority" className="text-muted">
                  Priority
                </label>
                <p
                  className={`capitalize c-${priorities[ticket.priority]}`}
                  id="priority"
                >
                  {priorities[ticket.priority]}
                </p>
              </div>
              <div className="col-3 text-left px-3 d-flex flex-column">
                <label htmlFor="submitter" className="text-muted">
                  Submitter
                </label>
                <p className="capitalize" id="submitter">
                  {ticket.submitter_first_name +
                    " " +
                    ticket.submitter_last_name}
                </p>
              </div>
            </div>
            <div className="col-12 px-3 d-flex flex-column ticket_desc">
              <label htmlFor="description" className="text-muted">
                {" "}
                Description
              </label>
              <textarea
                className="mx-2 h-100 overflow-auto p-1"
                readOnly
                id="description"
                value={ticket.description}
              ></textarea>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};
