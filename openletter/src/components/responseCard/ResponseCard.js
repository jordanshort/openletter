import React from 'react';
import './ResponseCard.css';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';


export default function ResponseCard(props){
    const { response } = props;
    return(
        <div className="response-card">
            <div className="response-card-author">
                <Link to={`/profile/${response.author_id}`} >
                    <img src={response.picture} alt="Author's Picture"/>
                    
                </Link>
            </div>
            <div className="response-card-body">
                <div className="response-card-names">
                    <span>{response.first_name}</span> 
                    <span>{response.last_name}</span>
                </div>
                <div className="response-card-content">{renderHTML(response.content)}</div>
            </div>
            
        </div>
    )
}