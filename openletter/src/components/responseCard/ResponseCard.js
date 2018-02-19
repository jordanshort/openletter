import React from 'react';
import './ResponseCard.css';

export default function ResponseCard(props){
    return(
        <div className="response-card">
            <div className="response-card-author">
                <img src="http://robohash.org/jordan" alt=""/>
                <div>
                    <span>Jordan</span>
                    <span>Short</span>
                </div>
            </div>
            <div className="response-card-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, corrupti cum. Ut voluptatem eos quisquam possimus pariatur voluptatum sunt doloremque maiores perspiciatis obcaecati, repellat molestiae atque laborum natus sit expedita!</div>
        </div>
    )
}