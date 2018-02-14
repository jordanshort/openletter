import React from 'react';
import './MyLetterCard.css';

export default function(props){
    // const { title, description, addressedTo, content, first_name, last_name, picture } = this.props;
    return(
        <div className="letter-card">
            <div className="card-top">
                <div className="card-author">
                    <div className="pic"></div>
                    <div className="name"></div>
                </div>
                <div className="card-details-container">
                    <div className="card-details">
                        <div className="card-title">Title Will Go Here</div>
                        <div className="addressee">Addressed To This Person</div>
                    </div>
                    <div className="card-description">
                        This will be the description of the letter. Where the 
                        auther will be able to summarize the main points that he 
                        wants to make about his letter.
                    </div>
                </div>
            </div>
            <div className="card-bottom">
                <span className="cosigns">Cosigns 459</span>
                <span className="card-responses">Responses 300</span>
                <span className="card-edit">Edit</span>                
                <span className="card-delete">Delete</span>
            </div>
        </div>
    )
}