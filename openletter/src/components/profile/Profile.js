import React, { Component } from 'react';
import Header from '../header/Header';
import './Profile.css';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/reducer';

class Profile extends Component{

    componentDidMount(){
        this.props.fetchUser();
    }


    render(){
        if (!this.props.user){return null};
        const { user } = this.props;
        return(
            <div className="user-profile-root">
                <Header />
                <div className="user-profile-body-container">
                    <div className="user-profile-card">
                        <div className="user-profile-picture">
                            <img src={user.picture} alt=""/>
                        </div>
                        <div className="user-profile-name">{user.first_name} {user.last_name}</div>
                        <div className="user-profile-birthday">{user.birth_month}{user.birth_day}, {user.birth_year}</div>
                        <div className="user-profile-about">{user.about_me}</div>
                        <div className="user-profile-job">{user.job}</div>
                        <div className="user-profile-employer">{user.employer}</div>
                        <button className="btn">Follow</button>
                    </div>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { fetchUser })(Profile);