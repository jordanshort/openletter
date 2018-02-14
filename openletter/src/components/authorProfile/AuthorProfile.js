import React, { Component } from 'react';
import Header from '../header/Header';
import './AuthorProfile.css';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';
import { fetchAuthor } from '../../redux/reducer';

class AuthorProfile extends Component{

    componentDidMount(){
        const { id } = this.props.match.params;
        const { fetchAuthor } = this.props;
        fetchAuthor(id);
    }


    render(){
        
        const { author } = this.props;
        return(
            <div className="author-profile-root">
                <Header />
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
                        <button className="btn">Follow</button>
                    </div>
                    
                    <div className="author-letters">
                        <span>Author's Letters</span>
                        <LetterCard authId={this.props.match.params.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        author: state.author
    };
};

export default connect(mapStateToProps, { fetchAuthor })(AuthorProfile);