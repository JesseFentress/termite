import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAuth } from '../../auth/AuthContext';
import "./homepage.css";

const HomePage = ({
    handleLoginNavigate,
    handleSignupNavigate,
    handleDashboardNavigate
}) => {
  const { token } = useAuth();
  return (
        <div className="container-home">
            {token ? 
                <div className="btn-container-home">
                    <div className="row pt-4 pb-4">
                    <Link to="/dashboard">
                        <Button
                            type="button"
                            onClick={handleDashboardNavigate}
                            buttonStyle="btn--primary--solid"
                            buttonSize="xlg"
                        >Dashboard</Button>
                    </Link>
                    </div>
                </div>
                :
                <div className="btn-container-home">
                    <div className="row pt-4">
                        <Link to="/login">
                            <Button
                                type="button"
                                onClick={handleLoginNavigate}
                                buttonStyle="btn--primary--solid"
                                buttonSize="xlg"
                            >Login</Button>
                        </Link>
                    </div>
                    <div className="row pt-4 pb-4">
                        <Link to="/signup">
                            <Button
                                type="button"
                                onClick={handleSignupNavigate}
                                buttonStyle="btn--primary--solid"
                                buttonSize="xlg"
                            >Sign Up</Button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default withRouter(HomePage);
