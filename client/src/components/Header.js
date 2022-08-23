import React from 'react';
import "./styles/header.css";

export const Header = ({
    title
}) => {
    return (
        <h2>
            {title}
        </h2>
    );
};