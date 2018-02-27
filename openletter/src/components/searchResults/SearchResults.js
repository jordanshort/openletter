import React, { Component } from 'react';
import Header from '../header/Header';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';
import { getCosigners } from '../../redux/reducer';
import './SearchResults.css';
import ResultsAuthor from '../resultsAuthor/ResultsAuthor';

class SearchResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            viewAll: false
        };
    }

    render(){
        const authors = this.props.results.filter((elem, i, arr) => {
            return i === arr.findIndex((auth) => elem.author_id === auth.author_id);
        })
        const displayResults = this.props.results.map(letter => (
            <LetterCard key={letter.letter_id} letter={letter}  />
        ))
        const authorResults = authors.map(result => (
            <ResultsAuthor key={result.letter_id} result={result} />
        ))
        return(
            <div className="search-root">
                <Header history={this.props.history}/>
                <div className="search-body">
                    <div className="search-center-container">
                        <h1>Search Results</h1>
                        <div className={!this.state.viewAll ? "authors-container" : "view-all-authors-container"}>
                            <div className="authors-container-title">
                                <span><h3>Authors</h3></span>
                            </div>
                            <div className={!this.state.viewAll ? "results-authors-container" : "view-all-results-authors-container"}>
                                {authorResults}
                            </div>
                            <div className="authors-container-footer">
                                {!this.state.viewAll ?
                                <span><h4 onClick={() => this.setState({viewAll: true})}>See All</h4></span>
                                 :
                                 <span><h4 onClick={() => this.setState({viewAll: false})}>Minimize</h4></span>                                  
                                }
                            </div>
                        </div>
                        <h1 id="letters-title">Letters</h1>
                        {displayResults}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{ results: state.results };
};

export default connect(mapStateToProps, { getCosigners })(SearchResults);