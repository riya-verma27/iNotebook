
import React from 'react';

export default function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1055, // ensures it stays above other elements
            minWidth: '300px'
        }}>
            {props.alert && 
            <div className={`toast show bg-${props.alert.type}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`toast-header bg-${props.alert.type} text-white`}>
                    <i className={`fas fa-${props.alert.type === "success" ? "check-circle" : "exclamation-triangle"} me-2`}></i>
                    <strong className="me-auto">{capitalize(props.alert.type)}</strong>
                    
                </div>
                <div className="toast-body text-white">
                    {props.alert.msg}
                </div>
            </div>}
        </div>
    );
}
