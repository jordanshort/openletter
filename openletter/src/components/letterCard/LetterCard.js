import React, { Component } from 'react';
import '../myLetterCard/MyLetterCard.css';
import { connect } from 'react-redux';
import { fetchAuthorLetters } from '../../redux/reducer';
import { Link } from 'react-router-dom';

export default function LetterCard(props){

        const { letter, getCosigners } = props;
        return(
            <div className="letter-card">
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
                    <span className="cosigns" onClick={() => getCosigners(letter.letter_id)}>Cosigns({letter.cosign_total})</span>
                    <span className="card-responses">Responses({letter.responses_total})</span>
                </div>
            </div>

        );
}


