import React from "react";
import { Button } from "./Button";
import { Header } from "./Header";

export const HeaderPanel = ({ onNavOpen, title, children }) => {
  return (
    <div className="row d-flex bg-termite">
      <div className="col-1">
        <div>
          <Button onClick={onNavOpen} buttonSize="sm" buttonStyle="btn--dash">
            {children}
          </Button>
        </div>
      </div>
      <div className="title">
        <Header title={title} />
      </div>
    </div>
  );
};
