import React from 'react';

export function ErrorDisplay(error, alert) { 
    return (
        (error !== "") ? (<span id="error-message">
            <img src={alert} alt="" width="16" height="16"></img><span className="error-message">{error}</span></span>) : ""
    );
}
