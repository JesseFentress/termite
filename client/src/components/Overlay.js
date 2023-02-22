import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { logoutUser } from "../util/userHandler";
import { HeaderPanel } from "./HeaderPanel";
import { NavigationPanel } from "./NavigationPanel";

export const Overlay = ({
    children,
    title
}) => {
    const {token, setToken, user } = useAuth();
    const [ showNavPanel, setShowNavPanel ] = useState(false);

    const logout = () => {
        logoutUser();
        setToken(null);
    }

    const handleNavPanel = () => {
        if (showNavPanel === false) { 
            setShowNavPanel(true);
        }
        else {
            setShowNavPanel(false);
        }
    };

    const navOptions = [
        {name: "Dashboard", route: "/dashboard", icon: <ion-icon name="home-outline"></ion-icon>, onClick: null},
        {name: "Profile", route: "/profile/" + user.id, icon: <ion-icon name="person-outline"></ion-icon>, onClick: null},
        {name: "Projects", route: "/projects", icon:  <ion-icon name="code-slash-outline"></ion-icon>, onClick: null},
        {name: "Tickets", route: "/tickets", icon: <ion-icon name="ticket-outline"></ion-icon>, onClick: null},
        {name: "Team", route: "/team", icon:  <ion-icon name="people-outline"></ion-icon>, onClick: null},
        {name: "Log Out", route: "/login", icon: <ion-icon name="log-out-outline"></ion-icon>, onClick: logout}
    ];

    const icons = [
        <ion-icon name="menu"></ion-icon>,
        <ion-icon name="close"></ion-icon>
    ];
    
    return (
        <div className="overlay bg-ow">
            { showNavPanel ?    
            <div className="d-flex overlay">
                <div className="col-2">
                    <NavigationPanel user={user} links={navOptions}/>
                </div>
                <div className="col-10">
                    <HeaderPanel 
                        title={title}
                        onNavOpen={handleNavPanel}
                        >{icons[1]}</HeaderPanel>
                    {children}
                </div>
            </div>
            :
            <div className="col-12">
                <HeaderPanel 
                    title={title}
                    onNavOpen={handleNavPanel}
                    >{icons[0]}</HeaderPanel>
                {children}
            </div>
            } 
        </div>
    );
};