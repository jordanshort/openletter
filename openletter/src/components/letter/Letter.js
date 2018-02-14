import React, { Component } from 'react';
import Header from '../header/Header';
import './Letter.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticated, fetchThisLetter } from '../../redux/reducer';
import renderHTML from 'react-render-html';

class Home extends Component{

    componentDidMount(){
        // let { user, authenticated, history } = this.props;
        // if (!user){
        //     authenticated(history);
        // }
        this.props.fetchThisLetter(this.props.match.params.id);
    }

    render(){
        // if (!this.props.user){ return null}
        const { selectedLetter } = this.props;
        return(
            <div className="letter-root">
                <Header />
                <div className="letter-body-container">
                    <div className="side-menu">
                        <div className="letter-author-container" >
                            <img src={selectedLetter.picture} alt="Author"/>
                            <div className="letter-auth">Author</div>
                            <Link to={`/profile/${selectedLetter.author_id}`}>
                            <div>{selectedLetter.first_name} {selectedLetter.last_name}</div>
                            </Link>
                            <button className=" letter-follow">Follow</button>
                        </div>
                        <div className="letter-author-container">
                            <button className="btn">Cosign</button>
                            <button className="btn">Respond</button>
                        </div>
                    </div>
                    <div className="letter-scroll-container">
                       <span>{this.props.selectedLetter.title}Title</span> <br/>
                       <span>Addressed To {selectedLetter.addressed_to}</span> <br/>
                       {renderHTML(selectedLetter.content)}
                       {/* <div>{selectedLetter.content}</div> */}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        selectedLetter: state.selectedLetter
    };
};

export default connect(mapStateToProps, { authenticated, fetchThisLetter })(Home);