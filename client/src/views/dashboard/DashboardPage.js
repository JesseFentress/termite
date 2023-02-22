import { withRouter } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { useAuth } from '../../auth/AuthContext';
import "./dashboardpage.css";
import { Overlay } from '../../components/Overlay';

const DashboardPage = () => {
    const { token } = useAuth();

    return (
        <Overlay title="Dashboard">
            <Dashboard token={token}/>
       </Overlay>
    );
};

export default withRouter(DashboardPage);