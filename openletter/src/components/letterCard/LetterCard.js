import React, { Component } from 'react';
import '../myLetterCard/MyLetterCard.css';
import { connect } from 'react-redux';
import { fetchAuthorLetters } from '../../redux/reducer';
import { Link } from 'react-router-dom';

class LetterCard extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchAuthorLetters(this.props.authId);
    }

    render(){
        const letters = !this.props.authorLetters.length ? null : this.props.authorLetters.map( letter => (
            <div key={letter.letter_id} className="letter-card">
                <div className="card-top">
                    <div className="card-author">
                        <img className="pic" src={letter.picture} />
                        <div className="name"><Link to={`/profile/${letter.author_id}`}>{letter.first_name} {letter.last_name}</Link></div>
                    </div>
                    <div className="card-details-container"><Link to={`/letter/${letter.letter_id}`}>
                        <div className="card-details">
                            <div className="card-title">{letter.title}</div>
                            <div className="addressee">Addressed To {letter.addressed_to}</div>
                        </div>
                        <div className="card-description">
                            {letter.description}
                        </div>
                        </Link>
                    </div>
                </div>
                <div className="card-bottom">
                    <span className="cosigns">Cosign {letter.cosigns}</span>
                    <span className="card-responses">Responses 300</span>
                    {/* <span className="card-edit">Edit</span>                
                    <span className="card-delete">Delete</span> */}
                </div>
            </div>

        ));
        return(
            <div>
                {letters}
            </div>
        )
    }
}

function mapStateToProps(state){
    return { 
        authorLetters: state.authorLetters,
     };
};

export default connect(mapStateToProps, { fetchAuthorLetters })(LetterCard);

