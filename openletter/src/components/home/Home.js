import React, { Component } from 'react';
import Header from '../header/Header';
import './Home.css';
import { Link } from 'react-router-dom';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';
import { authenticated, fetchFollowingLetters } from '../../redux/reducer';
import { socketConnect } from 'socket.io-react';
import axios from 'axios';


class Home extends Component{
    constructor(props){
        super();
        this.state = {
           topTen: []
        };
    }

    componentDidMount(){
        let { user, authenticated, history, fetchFollowingLetters } = this.props;
        if (!user.id){
            authenticated(history);
        }

        fetchFollowingLetters();
        this.getTopTen();
    }

    componentWillReceiveProps(nextProps){
        let { socket, user } = this.props;
        if (user.id) {socket.emit('check in', {userID: user.id})};
    }

    getTopTen(){
        axios.get('/topten').then(resp => {
            this.setState({topTen: resp.data});
        });
    }

    render(){
        const { followingLetters, history } = this.props;
        if (!this.props.user){ return null}
        const follLetters = !followingLetters.length ? null : followingLetters.map(letter => (
            <LetterCard key={letter.letter_id} letter={letter} />
        ))
        const topTenList = this.state.topTen.map(letter => (
            <div key={letter.letter_id} className="top-ten-list-item">
                <Link to={`letter/${letter.letter_id}`}>
                    <p id="tttitle">{letter.title}</p>
                    <p id="ttadd">Addressed To {letter.addressed_to}</p>
                    <p id="ttcosigns">{letter.cosigns_total} Cosigns</p>
                </Link>
            </div>
        ))
        return(
            <div className="home-root-container">
                
                    <Header history={history}/>
                
                <div className="home-body-container">
                    <div className="home-side-menu">
                        <div className="home-btn-container" >
                            <Link to="/newpost"><button className="btn">Compose Letter</button></Link>
                        </div>
                        <div className="side-links">
                            <h4 id="welcome">Welcome {this.props.user ? this.props.user.first_name : 'nameholder'}</h4>    
                            <Link to="/myletters"><h4>My Letters</h4></Link>
                            <Link to="/saved"><h4>Saved For Later</h4></Link>
                            {/* <h4>Subscriptions</h4> */}
                        </div>
                    </div>
                    <div className="home-middle-container">
                        <div className="home-scroll-container">
                            <div className="people-you-follow">
                                <h1>Home</h1>
                                {follLetters}
                            </div>
                        </div>
                        <div className="top-ten-container">
                            <h1>Top Ten</h1>
                            <div className="top-ten-list">
                                {topTenList}
                            </div>
                        </div>
                    </div>
                </div>
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