import React from 'react';
import { connect } from 'react-redux';
import { followAuthor } from '../../redux/reducer';
import { Link } from 'react-router-dom';
import './ResultsAuthor.css';

function ResultsAuthor(props){
    const { following, result, followAuthor } = props;
    return(
        <div className="results-author-card">
            <div className="results-author-card-picture">
                <img id="results-auth-pic"src={result.picture} alt="author picture"/>
            </div>
            <div className="results-author-card-names">
                <Link to={`/profile/${result.author_id}`} >
                    <span className="results-author-card-first">{result.first_name}</span> 
                    <span className="results-author-card-first">{result.last_name}</span>
                </Link>
            </div>
            {following.findIndex(elem => {
                return elem.id == result.author_id
            }) === -1 ? 
            <button onClick={() => followAuthor(result.author_id)}>Follow</button>  
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

export default connect(mapStateToProps, { followAuthor })(ResultsAuthor);