import React from 'react';
import { Button } from './Button';
import "./styles/panel.css";

export const Panel = ({
    title,
    panelSize,
    children,
    buttonText,
    onClick,
    panelClose
}) => {
    return (
        <div  className={`position-relative border rounded shadow-lg panel center ${panelSize}`}>
            { panelClose ?
                <div className="d-flex justify-content-end">
                    <button className="close-btn" type="button" onClick={onClick}>Close</button>
                </div>
                :
                null
            }
            { buttonText ? 
                <div className="d-flex justify-content-between p-3">
                    <h4 className="title-border-bottom">{title}</h4>
                    <Button
                        buttonStyle="btn--primary--solid"
                        buttonSize="sm"
                        onClick={onClick}
                    >{buttonText}</Button>
                </div>
                : 
                <h4 className="title-border-bottom mt-3">{title}</h4>
            }
            {children}
        </div>
    );
};
