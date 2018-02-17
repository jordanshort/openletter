import React, { Component } from 'react';
import './MyLetterCard.css';
import { connect } from 'react-redux';
import { fetchMyLetters, handleDelete } from '../../redux/reducer';
import { Link } from 'react-router-dom';


class MyLetterCard extends Component{
    
    componentDidMount(){
        this.props.fetchMyLetters();
    }


    render(){
        const letters = this.props.myLetters.map( letter => (
            <div key={letter.letter_id} className="letter-card">
                <div className="card-top">
                    <div className="card-author">
                        <img className="pic" src={letter.picture} />
                        <div className="name">{letter.first_name} {letter.last_name}</div>
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
                    <Link to={`/editletter/${letter.letter_id}`}><span className="card-edit">Edit</span></Link>                
                    <span onClick={() => this.props.handleDelete(letter.letter_id, this.props.history)}className="card-delete">Delete</span>
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
        myLetters: state.myLetters,
     };
};

export default connect(mapStateToProps, { fetchMyLetters, handleDelete })(MyLetterCard);

