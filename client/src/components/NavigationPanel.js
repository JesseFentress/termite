import React from 'react';
import { Link } from "react-router-dom";
import { Button } from './Button';

export const NavigationPanel = ({
    links,
    user
}) => {
    return (
        <div className="row d-flex bg-termite-darker nav w-100 h-100 shadow-lg">
            <div className="user p-2 m-0">
                <p id="username" className="overflow-auto m-0">{user.firstName} {user.lastName}</p>
                <p id="role" className="text-capitalize">{user.role}</p>
                <p className='m-3 border-bottom'></p>
            </div>
            <div className="nav w-100 p-0">
                <ul className="w-100 p-0"> 
                    {links.map((link, index) => (
                        <li className="navLink" key={index}>
                            <div>
                                <Link to={link.route}>
                                    <Button
                                        buttonStyle="btn--nav"
                                        buttonSize="md"
                                        onClick={link.onClick}
                                    >
                                        <div className="d-flex">
                                            {link.icon}
                                            <p className="mb-0">{link.name}</p>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </li> 
                    ))}       
                </ul>
            </div>
        </div>
    );
};