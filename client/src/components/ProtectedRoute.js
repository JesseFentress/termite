import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export const ProtectedLoggedOutRoute = ({
    route,
    alternateRoute
}) => {
    const { token } = useAuth();
    if (token === undefined) {
        return <Redirect to={alternateRoute}/>
    }
    return route;
}

export const ProtectedLoggedInRoute = ({
    route,
    alternateRoute
}) => {
    const { token } = useAuth();
    if (token) {
        return <Redirect to={alternateRoute}/>
    }
    return route;
}