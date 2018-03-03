import React, { Component } from 'react';
import './Header.css';
import '../../fontawesome-all';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFollowers, getFollowing, submitSearch, getNotifications } from '../../redux/reducer';
import { socketConnect } from 'socket.io-react';
import NotificationPopUp from '../notificationPopUp/NotificationPopUp';

class Header extends Component{
    constructor(){
        super();
        this.state = {
            term: ''
        }
    }

    componentDidMount(){
        this.props.getFollowers();
        this.props.getFollowing();
        this.props.getNotifications();
        this.props.socket.on('cosign', function(data){
            console.log(data);
            alert(data);
        });
        this.props.socket.on('response', function(data){
            alert(data);
        });
    }

    handleChange(val){
        this.setState({term: val})
    }

    onSubmit(event){
        event.preventDefault();
        let { submitSearch, history } = this.props;
        submitSearch({term: this.state.term}, history);
    }

    render(){
        console.log(this.props.notifications);
        return(
            <div className="header">
                <div className="header-logo">OpenLetter</div>
                <div>Notifications({this.props.notifications.length})</div>
                    <form className="input-group" onSubmit={(e) => this.onSubmit(e)}>
                        <input 
                        placeholder="Search"
                        className="form-control"
                        value={this.state.term}
                        onChange={e => this.handleChange(e.target.value)}
                        />
                        <span className="input-group-btn">
                        <button type="submit" className="btn btn-secondary"><i className="fas fa-search fa-1x"/></button>
                        </span>
                    </form>
                
                <div className="header-nav">
                    <Link to="/home"><i className="fas fa-home fa-2x" /></Link>
                    <Link to="/profile"><i className="far fa-user fa-2x" /></Link>
                    <Link to="/newpost"><i className="fas fa-pencil-alt fa-2x" /></Link>
                    <a href={process.env.REACT_APP_AUTH0_LOGOUT}><i className="fas fa-sign-out-alt fa-2x" /></a>
                    
                </div>
                <NotificationPopUp notifications={this.props.notifications} />
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        notifications: state.notifications
    };
};

export default socketConnect(connect(mapStateToProps, { getFollowers, getFollowing, submitSearch, getNotifications })(Header));

