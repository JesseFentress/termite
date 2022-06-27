import React from 'react';

const STYLES = [
    "btn--primary--solid",
    "btn--primary--outline",
    "btn--form",
    "btn--table"
];

const SIZES = [
    "sm",
    "md",
    "lg",
    "xlg"
];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const setButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const setButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    return (
        <button 
            className={`btn ${setButtonStyle} ${setButtonSize}`}
            onClick={onClick} 
            type={type}
        >
            {children}
        </button>
    );
};