import React, { Component } from 'react';
import Header from '../header/Header';
import './MyLetters.css';
import { Link } from 'react-router-dom';
import MyLetterCard from '../myLetterCard/MyLetterCard';
import { connect } from 'react-redux';
import { authenticated, fetchMyLetters } from '../../redux/reducer';
import CosignerModal from '../cosignerModal/CosignerModal';
import axios from 'axios';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            cosigners: [],
            showCosigners: false
        };
        this.onHide = this.onHide.bind(this);
        this.getCosigners = this.getCosigners.bind(this);
    }

    componentDidMount(){
        // let { user, authenticated, history } = this.props;
        // if (!user){
        //     authenticated(history);
        // }
        // this.props.fetchMyLetters();
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
        // if (!this.props.myletters){ return null}
        // const letters = this.props.letters.map( letter => {
        //     return <MyLetterCard  letter={letter}/>
        // })
        return(
            <div className="myletters-root">
                <Header />
                <div className="myletters-body-container">
                    <div className="myletters-side-menu">
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
                            <MyLetterCard history={this.props.history} getCosigners={this.getCosigners}/>
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
                <CosignerModal onHide={this.onHide} show={this.state.showCosigners} cosigners={this.state.cosigners}/>
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