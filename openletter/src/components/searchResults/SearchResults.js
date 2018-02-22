import React from 'react';
import Header from '../header/Header';
import LetterCard from '../letterCard/LetterCard';
import { connect } from 'react-redux';

function SearchResults(props){
    const displayResults = props.results.map(letter => (
        <LetterCard key={letter.letter_id} letter={letter} />
    ))
    return(
        <div className="search-root">
            <Header />
            <div className="search-body">
                <div className="search-center-container">
                    <h1>Search Results</h1>
                    {displayResults}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{ results: state.results };
};

export default connect(mapStateToProps)(SearchResults);