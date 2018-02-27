import React, { Component } from 'react';
import axios from 'axios';
import './Saved.css';
import Header from '../header/Header';
import LetterCard from '../letterCard/LetterCard';


class Saved extends Component{
    constructor(props){
        super(props);
        this.state = {
            letters: []
        };
        
        this.removeFromSaved = this.removeFromSaved.bind(this);
    }

    componentDidMount(){
        axios.get('/saved').then(resp => {
            this.setState({letters: resp.data});
        });
    }

    removeFromSaved(id){
        axios.delete(`/saved/${id}`).then(resp => {
            this.setState({letters: resp.data});
        });
    }

    render(){
        const savedLetters = this.state.letters.map(letter => (
            <LetterCard key={letter.letter_id} letter={letter} savedLetters={this.state.letters} removeFromSaved={this.removeFromSaved} />
        ))
        return(
            <div className="saved-root">
                <Header history={this.props.history} />
                <div className="saved-body">
                    <div className="saved-center">
                        <h1>My Saved Letters</h1>
                        <div className="saved-letters">
                            {savedLetters}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Saved;

