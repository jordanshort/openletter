import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CosignerModal.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { followAuthor } from '../../redux/reducer'

function CosignerModal(props) {
    const { cosigners, onHide, following, followAuthor } = props;
    return (
        <div>
            <Modal className="cosigner-modal" show={props.show}>
                <Modal.Header closeButton onClick={() => onHide()}>
                    <Modal.Title>Cosigners</Modal.Title>
                </Modal.Header>
                <Modal.Body className="cosigner-modal-body">
                    {cosigners.map((cosigner) => (
                        <div className="cosigner" key={cosigner.user_id}>
                            <Link to={`/profile/${cosigner.user_id}`}>
                                <img src={cosigner.picture} alt="cosigner" />
                                <span>{cosigner.first_name} </span>
                                <span>{cosigner.last_name}</span>
                            </Link>
                            {following.findIndex(elem => {
                                return elem.id === cosigner.user_id
                            }) === -1 ?
                                <button onClick={() => followAuthor(cosigner.user_id)}>Follow</button>
                                :
                                <button>Following</button>
                            }
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

function mapStateToProps(state) {
    return { following: state.following };
};

export default connect(mapStateToProps, { followAuthor })(CosignerModal);