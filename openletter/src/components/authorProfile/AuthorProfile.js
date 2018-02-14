import React, { Component } from 'react';
import Header from '../header/Header';
import './AuthorProfile.css';

class AuthorProfile extends Component{
    render(){
        return(
            <div className="author-profile-root">
                <Header />
                <div className="author-profile-body-container">
                    <div className="author-profile-card"></div>
                    <div className="author-letters">
                        <span>Author's Letters</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthorProfile;