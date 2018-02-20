import React, { Component } from 'react';
import Header from '../header/Header';
import './Letter.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticated, fetchThisLetter, handleDelete, handleCosign, followAuthor, getResponses } from '../../redux/reducer';
import renderHTML from 'react-render-html';
import '../../fontawesome-all';
import ResponseCard from '../responseCard/ResponseCard';
// import { socketConnect } from 'socket.io-react';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            showResponses: false
        }
    }

    componentDidMount(){
        let { socket } = this.props;
        let id = this.props.match.params.id;
        // let { user, authenticated, history } = this.props;
        // if (!user){
        //     authenticated(history);
        // }
        this.props.fetchThisLetter(id);
        this.props.getResponses(id);

        // socket.on('cosign', function(data){
        //     console.log(data);
        // });
    }

    // handleCosign(){
    //     let {user, selectedLetter, socket} = this.props;
    //     socket.emit('cosign', {userId: user.id, letterId: selectedLetter.letter_id})
    // }


    render(){
        // if (!this.props.user){ return null}
        const { selectedLetter, match, following, handleDelete, history, handleCosign, socket, user, responses } = this.props;
        const authorControls = this.props.user.id == this.props.selectedLetter.author_id ? 
                <div className="letter-author-container">
                    <Link to={`/editletter/${selectedLetter.letter_id}`}><button className="btn">Edit</button></Link>
                    <button onClick={() => handleDelete(selectedLetter.letter_id, history)} className="btn">Delete</button>
                </div>
                : null;
        const letterResponses = !responses.length ? null : responses.map(response => {
            <ResponseCard key={response.response_id} response={response} />
        })
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
                            {following.findIndex((author) => {
                                return author.id == selectedLetter.author_id;
                                }) === -1 ? 
                                <button onClick={() => followAuthor(selectedLetter.author_id)} className=" letter-follow">Follow</button>
                                :
                                <button className=" letter-follow">Following <i className="fas fa-check fa-xs"></i></button>
                            }
                        </div>
                        <div className="letter-author-container">
                            <button onClick={() => handleCosign({userId: user.id, letterId: selectedLetter.letter_id}, socket)}className="btn">Cosign</button>
                            <Link to={`/response/${selectedLetter.letter_id}`}><button className="btn">Respond</button></Link>
                        </div>
                        {authorControls}
                    </div>
                    <div className="letter-scroll-container">
                       <span>{this.props.selectedLetter.title}</span> <br/>
                       <span>Addressed To {selectedLetter.addressed_to}</span> <br/>
                       {renderHTML(selectedLetter.content)}
                    </div>
                    <button className="btn" onClick={() => this.setState({showResponses: true})}>Responses</button>                    
                    {this.state.showResponses ? 
                        <div className="response-container">
                            {letterResponses}
                        </div>
                    : null
                    }
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        selectedLetter: state.selectedLetter,
        following: state.following,
        responses: state.responses
    };
};

let actions = {
    authenticated, 
    fetchThisLetter, 
    handleDelete, 
    handleCosign, 
    followAuthor,
    getResponses
}

export default connect(mapStateToProps, actions)(Home);