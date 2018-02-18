import React from 'react';
import './AuthorCard.css';
import { Link } from 'react-router-dom';

export default function AuthorCard(props){
    const { author } = props;
    return(
        <div className="recommended-author-card">
            <div className="author-card-picture">
                <img id="auth-pic"src={author.picture} alt="author picture"/>
            </div>
            <div className="author-card-names">
                <Link to={`/profile/${author.id}`} >
                    <span className="author-card-first">{author.first_name}</span> 
                    <span className="author-card-first">{author.last_name}</span>
                </Link>
            </div>
            <button>Follow</button>
        </div>
    )
}