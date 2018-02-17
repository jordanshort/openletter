import React, { Component } from 'react';
import Header from '../header/Header';
import './MyLetters.css';
import { Link } from 'react-router-dom';
import MyLetterCard from '../myLetterCard/MyLetterCard';
import { connect } from 'react-redux';
import { authenticated, fetchMyLetters } from '../../redux/reducer';

class Home extends Component{

    componentDidMount(){
        // let { user, authenticated, history } = this.props;
        // if (!user){
        //     authenticated(history);
        // }
        // this.props.fetchMyLetters();
    }

    render(){
        // if (!this.props.myletters){ return null}
        // const letters = this.props.letters.map( letter => {
        //     return <MyLetterCard  letter={letter}/>
        // })
        return(
            <div className="myletters-root">
                <Header />
                <div className="myletters-body-container">
                    <div className="side-menu">
                        <div className="myletters-btn-container" >
                            <Link to="/newpost"><button className="btn">Compose Letter</button></Link>
                        </div>
                        <div className="side-links">
                            <Link to="/myletters"><h4>My Letters</h4></Link>
                            <h4>Saved For Later</h4>
                            <h4>Subscriptions</h4>
                            <h4>Welcome {this.props.user ? this.props.user.first_name : 'nameholder'}</h4>
                        </div>
                    </div>
                    <div className="myletters-scroll-container">
                        <div className="my-letters">
                            <h1>My Letters</h1>
                            <MyLetterCard history={this.props.history}/>
                            {/* { this.props.myLetters
                                ?
                                this.props.myletters.map(letter => (
                                    <MyLetterCard key={letter.letter_id} letter={letter} />
                                ))
                                :
                                <h2>No letters to display...go write a letter!</h2>
                            } */}
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
        // myLetters: state.myLetters
    };
};

export default connect(mapStateToProps, { authenticated, fetchMyLetters })(Home);