import React, { Component } from 'react';
import Header from '../header/Header';
import './Home.css';
import { Link } from 'react-router-dom';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';
import { authenticated, fetchFollowingLetters } from '../../redux/reducer';
import { socketConnect } from 'socket.io-react';
import axios from 'axios';
import CosignerModal from '../cosignerModal/CosignerModal';
// import socketIOClient from 'socket.io-client';
// const socket = socketIOClient('http://localhost:4050');

class Home extends Component{
    constructor(props){
        super();
        this.state = {
            cosigners: [],
            showCosigners: false
        }
        this.getCosigners = this.getCosigners.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount(){
        let { user, authenticated, history, fetchFollowingLetters, socket  } = this.props;
        if (!user.id){
            authenticated(history);
        }

        fetchFollowingLetters();

        
    }

    componentWillReceiveProps(nextProps){
        let { socket, user } = this.props;
        if (user.id) {socket.emit('check in', {userID: user.id})};
    }

    getCosigners(id){
        axios.get(`/cosigners/${id}`).then(resp => {
            this.setState({cosigners: resp.data, showCosigners: true});
        }).catch(err => console.log(err));
        
    }

    onHide(){
        this.setState({showCosigners: false});
    }

    render(){
        const { followingLetters } = this.props;
        if (!this.props.user){ return null}
        const follLetters = !followingLetters.length ? null : followingLetters.map(letter => (
            <LetterCard key={letter.letter_id} letter={letter} getCosigners={this.getCosigners} />
        ))
        return(
            <div className="home-root-container">
                
                    <Header />
                
                <div className="home-body-container">
                    <div className="home-side-menu">
                        <div className="home-btn-container" >
                            <Link to="/newpost"><button className="btn">Compose Letter</button></Link>
                        </div>
                        <div className="side-links">
                            <Link to="/myletters"><h4>My Letters</h4></Link>
                            <h4>Saved For Later</h4>
                            <h4>Subscriptions</h4>
                            <h4>Welcome {this.props.user ? this.props.user.first_name : 'nameholder'}</h4>
                        </div>
                    </div>
                    <div className="home-scroll-container">
                        <div className="people-you-follow">
                            <h1>Home</h1>
                            {follLetters}
                        </div>
                    </div>
                </div>
                <CosignerModal cosigners={this.state.cosigners} show={this.state.showCosigners} onHide={this.onHide}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        followingLetters: state.followingLetters
    };
};

export default socketConnect(connect(mapStateToProps, { authenticated, fetchFollowingLetters })(Home));