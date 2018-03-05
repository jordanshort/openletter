import React, { Component } from 'react';
import Header from '../header/Header';
import './AuthorProfile.css';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';
import { fetchAuthor, followAuthor, fetchAuthorLetters } from '../../redux/reducer';
import '../../fontawesome-all';

class AuthorProfile extends Component{

    componentDidMount(){
        const { id } = this.props.match.params;
        const { fetchAuthor, fetchAuthorLetters } = this.props;
        fetchAuthor(id);
        fetchAuthorLetters(id);
    }


    render(){
        
        const { author, following, match, followAuthor, authorLetters, history } = this.props;
        const authLetters = !authorLetters.length ? null : authorLetters.map(letter => (
            <LetterCard key={letter.letter_id} letter={letter}/>
        ))
        return(
            <div className="author-profile-root">
                <Header history={history} />
                <div className="author-profile-body-container">
                    <div className="author-profile-card">
                        <div className="author-profile-picture">
                            <img src={author.picture} alt=""/>
                        </div>
                        <div className="author-profile-name">{author.first_name} {author.last_name}</div>
                        <div className="author-profile-birthday">{author.birth_month}{author.birth_day}, {author.birth_year}</div>
                        <div className="author-profile-about">{author.about_me}</div>
                        <div className="author-profile-job">{author.job}</div>
                        <div className="author-profile-employer">{author.employer}</div>
                        { following.findIndex((author) => {
                            return author.id == match.params.id;
                        }) === -1 ? 
                            <button onClick={() => followAuthor(author.id)} className="btn btn-default">Follow</button>
                            :
                            <button className="btn btn-default">Following<i className="fas fa-check fa-xs"></i></button>
                            }
                    </div>
                    
                    <div className="author-letters">
                        <span id="authors-letters-title">Author's Letters</span>
                        {authLetters}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        author: state.author,
        following: state.following,
        authorLetters: state.authorLetters
    };
};

export default connect(mapStateToProps, { fetchAuthor, followAuthor, fetchAuthorLetters })(AuthorProfile);