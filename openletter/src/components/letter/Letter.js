import React, { Component } from 'react';
import Header from '../header/Header';
import './Letter.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticated, fetchThisLetter, handleDelete, followAuthor, getResponses } from '../../redux/reducer';
import '../../fontawesome-all';
import ResponseCard from '../responseCard/ResponseCard';
import { socketConnect } from 'socket.io-react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'

class Home extends Component{
    constructor(){
        super();
        this.state = {
            showResponses: false,
            cosigners: []
        }
    }

    componentDidMount(){
        
        let id = this.props.match.params.id;
        let { user, authenticated, history } = this.props;
        if (!user.id){
            authenticated(history);
        }
        this.props.fetchThisLetter(id);
        this.props.getResponses(id);
        this.getCosigners();
    }


    handleCosign(){
        let {user, selectedLetter, socket} = this.props;
        socket.emit('cosign', {userID: user.id, letterID: selectedLetter.letter_id, authorID: selectedLetter.author_id});
        this.getCosigners();
    }

    getCosigners(){
        axios.get(`/cosigners/${this.props.match.params.id}`).then(resp => {
            this.setState({cosigners: resp.data});
        }).catch(err => console.log(err));
    }

    showResponses(){
        this.state.showResponses ? 
        this.setState({showResponses: false})
        :
        this.setState({showResponses: true});
    }


    render(){
        // if (!this.props.user){ return null}
        const { selectedLetter, following, handleDelete, history, user, responses } = this.props;
        const authorControls = this.props.user.id === this.props.selectedLetter.author_id ? 
                <div className="letter-author-container">
                    <Link to={`/editletter/${selectedLetter.letter_id}`}><button className="btn">Edit</button></Link>
                    <button onClick={() => handleDelete(selectedLetter.letter_id, history)} className="btn">Delete</button>
                </div>
                : null;
        const letterResponses = !responses.length ? null : responses.map(response => {
            return <ResponseCard key={response.response_id} response={response} />
        })
        return(
            <div className="letter-root">
                <Header history={history} />
                <div className="letter-body-container">
                    <div className="side-menu">
                        <div className="letter-author-container" >
                            <img src={selectedLetter.picture} alt="Author"/>
                            <div className="letter-auth">Author</div>
                            <Link to={`/profile/${selectedLetter.author_id}`}>
                            <div>{selectedLetter.first_name} {selectedLetter.last_name}</div>
                            </Link>
                            {following.findIndex((author) => {
                                return author.id === selectedLetter.author_id;
                                }) === -1 ? 
                                <button onClick={() => followAuthor(selectedLetter.author_id)} className=" letter-follow">Follow</button>
                                :
                                <button className=" letter-follow">Following <i className="fas fa-check fa-xs"></i></button>
                            }
                        </div>
                        <div className="letter-author-container">
                            {this.state.cosigners.findIndex((cosigner) => {
                                return cosigner.user_id === user.id;
                            }) === -1 ? 
                            <button onClick={() => this.handleCosign()}className="btn">Cosign</button>
                            :
                            <button className="btn">Cosigned <i className="fas fa-check fa-xs"></i></button>
                            }
                            <Link to={`/response/${selectedLetter.author_id}/${selectedLetter.letter_id}`}><button className="btn">Respond</button></Link>
                        </div>
                        {authorControls}
                    </div>
                    <div className="letter-scroll-container">
                        <span onClick={() => this.props.history.goBack()} className="letter-close"><i  className="far fa-window-close fa-1x"></i></span>   
                       <span id="read-letter-title">{this.props.selectedLetter.title}</span> <br/>
                       <div id="read-addressed-to">Addressed To {selectedLetter.addressed_to}</div> <br/>
                       
                       <ReactQuill
                            theme="bubble"
                            value={selectedLetter.content} 
                            toolbar={false} 
                            readOnly={true}                          
                             />
                             
                    </div>
                    <div className="read-letter-footer">
                                <p className="responses-btn" onClick={() => this.showResponses()}>Responses</p>                    
                             </div>
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
    followAuthor,
    getResponses,
}

export default socketConnect(connect(mapStateToProps, actions)(Home));