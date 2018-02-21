import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CosignerModal.css';
import {Link} from 'react-router-dom';

export default function CosignerModal(props){
    const { cosigners, onHide } = props;
    return(
        <div>
            <Modal className="cosigner-modal" show={props.show}>
                <Modal.Header closeButton onClick={() => onHide()}>
                    <Modal.Title>Cosigners</Modal.Title>
                </Modal.Header>
                <Modal.Body className="cosigner-modal-body">
                    {cosigners.map((cosigner) => (
                        <div key={cosigner.user_id}>
                            <Link to={`/profile/${cosigner.user_id}`}>
                            <img src={cosigner.picture} alt="picture"/>
                            <span>{cosigner.first_name}</span>
                            <span>{cosigner.last_name}</span>
                            </Link>
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