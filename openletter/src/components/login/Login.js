import React from 'react';
import './Login.css';
import '../../fontawesome-all';

export default function Login(){
    return(
        <div className="login-root">
            <div className="login-header">OpenLetter</div>
            <div className="login-body-container">
                <div className="login-top-half">
                    <div className="login-container">
                        <div className="login-logo-container"><i className="far fa-envelope-open fa-8x"></i></div>
                        <div className="login-btn-container">
                            <a href={process.env.REACT_APP_LOGIN}><button className="login-btn">Login/Register</button></a>
                        </div>
                    </div>
                </div>
                <div className="login-bottom-half"></div>
            </div>

        </div>
    )
}