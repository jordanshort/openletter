import React, { Component } from 'react';
import '../myLetterCard/MyLetterCard.css';
import { connect } from 'react-redux';
import { fetchAuthorLetters, getCosigners } from '../../redux/reducer';
import { Link } from 'react-router-dom';
import CosignerModal from '../cosignerModal/CosignerModal';

class LetterCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCosigners: false
        };

        this.onHide = this.onHide.bind(this);
    }

    onHide(){
        this.setState({showCosigners: false});
    }

    render(){
        const { letter, getCosigners, cosigners } = this.props;
        return(
            <div className="letter-card">
                <div className="card-top">
                    <div className="card-author">
                        <img className="pic" src={letter.picture} />
                        <div className="name"><Link to={`/profile/${letter.author_id}`}>{letter.first_name} {letter.last_name}</Link></div>
                    </div>
                    <div className="card-details-container"><Link to={`/letter/${letter.letter_id}`}>
                        <div className="card-details">
                            <div className="card-title">{letter.title}</div>
                            <div className="addressee">Addressed To {letter.addressed_to}</div>
                        </div>
                        <div className="card-description">
                            {letter.description}
                        </div>
                        </Link>
                    </div>
                </div>
                <div className="card-bottom">
                    <span className="cosigns" onClick={() => {
                        this.setState({showCosigners: true});
                        getCosigners(letter.letter_id)}}>Cosigns({letter.cosign_total})</span>
                    <span className="card-responses">Responses({letter.responses_total})</span>
                </div>
                <CosignerModal cosigners={cosigners} show={this.state.showCosigners} onHide={this.onHide}/>                
            </div>

        );
    }
}
function mapStateToProps(state){
    return{cosigners: state.cosigners};
};

export default connect(mapStateToProps, { getCosigners })(LetterCard);


