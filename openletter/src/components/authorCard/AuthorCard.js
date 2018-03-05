import React from 'react';
import './AuthorCard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { followAuthor } from '../../redux/reducer';

function AuthorCard(props){
    const { author, following, followAuthor } = props;
    return(
        <div className="recommended-author-card">
            <div className="author-card-picture">
                <img id="auth-pic"src={author.picture} alt="author"/>
            </div>
            <div className="author-card-names">
                <Link to={`/profile/${author.id}`} >
                    <span className="author-card-first">{author.first_name}</span> 
                    <span className="author-card-last">{author.last_name}</span>
                </Link>
            </div>
            {following.findIndex(elem => {
                return elem.id === author.id
            }) === -1 ? 
            <button onClick={() => followAuthor(author.id)}>Follow</button>  
            :
            <button>Following</button>  
            }
        </div>
    )
}

function mapStateToProps(state){
    return{
        following: state.following
    };
};

export default connect(mapStateToProps, { followAuthor })(AuthorCard);