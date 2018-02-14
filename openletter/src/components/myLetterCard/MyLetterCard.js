import React, { Component } from 'react';
import './MyLetterCard.css';
import { connect } from 'react-redux';
import { fetchMyLetters } from '../../redux/reducer';

class MyLetterCard extends Component{
    componentDidMount(){
        this.props.fetchMyLetters();
    }

    render(){
        const letters = this.props.myLetters.map( letter => (
            <div className="letter-card">
                <div className="card-top">
                    <div className="card-author">
                        <img className="pic" src={letter.picture} />
                        <div className="name">{letter.first_name} {letter.last_name}</div>
                    </div>
                    <div className="card-details-container">
                        <div className="card-details">
                            <div className="card-title">{letter.title}</div>
                            <div className="addressee">Addressed To {letter.addressed_to}</div>
                        </div>
                        <div className="card-description">
                            {letter.description}
                        </div>
                    </div>
                </div>
                <div className="card-bottom">
                    <span className="cosigns">Cosign {letter.cosigns}</span>
                    <span className="card-responses">Responses 300</span>
                    <span className="card-edit">Edit</span>                
                    <span className="card-delete">Delete</span>
                </div>
            </div>

        ));
        return(
            <div>
                {letters}
            </div>
        )
    }
}

function mapStateToProps(state){
    return { myLetters: state.myLetters };
};

export default connect(mapStateToProps, { fetchMyLetters })(MyLetterCard);

