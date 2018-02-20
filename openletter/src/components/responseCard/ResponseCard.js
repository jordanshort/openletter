import React from 'react';
import './ResponseCard.css';
import { Link } from 'react-router-dom';

export default function ResponseCard(props){
    const { response } = this.props;
    return(
        <div className="response-card">
            <div className="response-card-author">
                <Link to={`/profile/${response.author_id}`} >
                    <img src={response.picture} alt="Author's Picture"/>
                    <div>
                        <span>{response.first_name}</span>
                        <span>{response.last_name}</span>
                    </div>
                </Link>
            </div>
            <div className="response-card-content">{response.content}</div>
        </div>
    )
}