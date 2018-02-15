import React, { Component } from 'react';
import Header from '../header/Header';
import './Profile.css';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/reducer';
import EditProfile from './EditProfile';

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            show: false,
            month: '',
            day: '',
            year: '',
            about: '',
            job: '',
            employer: ''
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
    }

    componentDidMount(){
        // this.props.fetchUser();
    }

    handleClose(){
        this.setState({show: false});
    }

    handleShow(){
        this.setState({show: true});
    }

    handleSelect(name, val){
        this.setState({[name]: val});
    }

    handleChange(name, val){
        this.setState({[name]: val});
    }

    getValidationState(){
        const length = this.state.year.length;
        if (length === 4) return 'sucess';
        else return 'error';
    }


    render(){
        // if (!this.props.user){return null};
        const { user } = this.props;
        return(
            <div className="user-profile-root">
                <Header />
                <div className="user-profile-body-container">
                    <div className="user-profile-card">
                        <div className="user-profile-picture">
                            { user.picture ? 
                                <img src={user.picture} alt=""/>                            
                                : 'Add a picture'}
                        </div>
                        <div className="user-profile-name">{user.first_name} {user.last_name}</div>
                        <div className="user-profile-birthday">
                            { user.birth_month ?
                                `${user.birth_month} ${user.birth_day}, ${user.birth_year}`
                                : 'Add your birthday'}
                        </div>
                        <div className="user-profile-about">
                            {user.about_me ?
                                `${user.about_me}`
                                : 'Add a summary about you'
                            }</div>
                        <div className="user-profile-job">
                            {user.job ? 
                                `${user.job}`
                                : 'Add your job title'}
                            </div>
                        <div className="user-profile-employer">
                            {user.employer ? 
                                `${user.employer}`
                                : 'Add your employer'}
                            </div>
                        <button className="btn" onClick={this.handleShow}>Edit Profile</button>
                    </div>
                    
                </div>
                <EditProfile 
                    handleSelect={this.handleSelect} 
                    show={this.state.show} 
                    handleClose={this.handleClose} 
                    month={this.state.month} 
                    day={this.state.day} 
                    year={this.state.year}
                    handleChange={this.handleChange}
                    getValidationState={this.getValidationState}
                    />
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