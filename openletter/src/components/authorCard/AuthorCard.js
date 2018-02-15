import React from 'react';
import './AuthorCard.css';

export default function AuthorCard(props){
    return(
        <div className="recommended-author-card">
            <div className="author-card-picture">
                <img src="" alt=""/>
            </div>
            <div className="author-card-names">
                <span className="author-card-first">Jordan</span> 
                <span className="author-card-first">Short</span>
            </div>
            <button>Follow</button>
        </div>
    )
}