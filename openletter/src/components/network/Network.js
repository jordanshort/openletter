import React, { Component } from 'react';
import Header from '../header/Header';
import './Network.css';
import AuthorCard from '../authorCard/AuthorCard';
import { connect } from 'react-redux';

class Network extends Component{

    
    render(){
        const { followers, following } = this.props;
        const authFollowers = !followers.length ? null : followers.map( author => (
            <AuthorCard author={author} />
        ));
        const authFollowing = !following.length ? null : following.map( author => (
            <AuthorCard author={author} />
        ))

        return(
            <div className="network-root">
                <div>
                    <Header />
                </div>
                <div className="network-main-container">
                    <div className="network-body-container">
                        <div className="network-title">
                            <div>People You Follow</div>
                            <div>People Following You</div>
                        </div>
                        <div className="network-list-container">
                            <div className="network-body-following">
                                {authFollowing}
                            </div>
                            <div className="network-body-followers">
                                {authFollowers}
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
        followers: state.followers,
        following: state.following
    };
};

export default connect(mapStateToProps)(Network);