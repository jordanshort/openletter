import React from 'react';
import './Login.css';

export default function Login(){
    return(
        <div className="login-root">
            <div className="login-header">Header</div>
            <div className="login-body-container">
                <div className="login-top-half">
                    <div className="login-container">
                        <div className="login-logo-container">LOGO</div>
                        <div className="login-btn-container">
                            <button className="login-btn">Login/Register</button>
                        </div>
                    </div>
                </div>
                <div className="login-bottom-half"></div>
            </div>

        </div>
    )
}