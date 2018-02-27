import React, { Component } from 'react';
import axios from 'axios';
import './Saved.css';
import Header from '../header/Header';


class Saved extends Component{
    constructor(props){
        super(props);
        this.state = {
            letters: []
        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="saved-root">
                <Header history={this.props.history} />
            </div>
        )
    }
}

export default Saved;

