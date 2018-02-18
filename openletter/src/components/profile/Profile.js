import React, { Component } from 'react';
import Header from '../header/Header';
import './Profile.css';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';
import { fetchUser, updateProfile } from '../../redux/reducer';
import EditProfile from './EditProfile';
import AuthorCard from '../authorCard/AuthorCard';
import { Link } from 'react-router-dom';

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
        // this.getValidationState = this.getValidationState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchUser();
    }

    componentWillReceiveProps(nextProps){
        const { user } = nextProps;
        this.setState({
            month: user.birth_month,
            day: user.birth_day,
            year: user.birth_year,
            about: user.about_me,
            job: user.job,
            employer: user.employer
        });
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

    // getValidationState(){
    //     const length = this.state.year.length;
    //     if (length === 4) return 'sucess';
    //     else return 'error';
    // }

    handleSubmit(){
        let userUpdate = {
          month: this.state.month,
          day: this.state.day,
          year: this.state.year,
          about: this.state.about,
          job: this.state.job,
          employer: this.state.employer 
        }
        this.props.updateProfile(userUpdate);
        this.handleClose();
    }


    render(){
        // if (!this.props.user){return null};
        const { user, following, followers } = this.props;
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
                        <div className="network">
                            <Link to={`/network/${user.id}`} >
                            <span>Following ({following.length})</span>
                            <span>Followers ({followers.length})</span>
                            </Link>
                        </div>
                        <button className="btn" onClick={this.handleShow}>Edit Profile</button>
                        <div className="recommended-container">
                            <div className="recommended-title">
                            <span>Recommended Authors To Follow</span>
                            </div>
                            <div className="recommended-wrapper">
                                
                            </div> 
                        </div>
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
                    about={this.state.about}
                    job={this.state.job}
                    employer={this.state.employer}
                    handleSubmit={this.handleSubmit}
                    />
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user, 
        following: state.following,
        followers: state.followers
    };
};

export default connect(mapStateToProps, { fetchUser, updateProfile })(Profile);