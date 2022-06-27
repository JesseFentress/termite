import React from "react";
import { withRouter } from "react-router-dom";

const HomePage = () => {
  const { user } = useAuth();
  return (
        <div>
            {user ? "here" : "yo"}
        </div>
    );
};

export default withRouter(HomePage);
