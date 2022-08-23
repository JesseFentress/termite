import { withRouter } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { useAuth } from '../../auth/AuthContext';
import "./dashboardpage.css";
import { Overlay } from '../../components/Overlay';
import { useEffect } from "react";
import { getUser } from "../../util/userHandler";

const DashboardPage = () => {
    const { token, setUser } = useAuth();

    useEffect(() => {
        const user = getUser({token: token});
        user.then(value => {
            setUser(value);
          }).catch(err => {
            console.log(err)
          });
    }, [])

    return (
        <Overlay title="Dashboard">
            <Dashboard token={token}/>
       </Overlay>
    );
};

export default withRouter(DashboardPage);