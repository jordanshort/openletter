import React, { Component } from 'react';
import Header from '../header/Header';
import './Home.css';
import { Link } from 'react-router-dom';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';

class Home extends Component{
    render(){
        return(
            <div className="home-root">
                <Header />
                <div className="home-body-container">
                    <div className="side-menu">
                        <div className="home-btn-container" >
                            <Link to="/newpost"><button className="btn">Compose Letter</button></Link>
                        </div>
                        <div className="side-links">
                            <Link to="/myletters"><h4>My Letters</h4></Link>
                            <h4>Saved For Later</h4>
                            <h4>Subscriptions</h4>
                        </div>
                    </div>
                    <div className="home-scroll-container">
                        <div className="people-you-follow">
                            <h1>Your Feed...</h1>
                            <LetterCard />
                            <LetterCard />
                            <LetterCard />
                            <LetterCard />
                            <LetterCard />
                            <LetterCard />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Home);