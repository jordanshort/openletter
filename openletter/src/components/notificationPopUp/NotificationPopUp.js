import React from 'react';
import { Modal } from 'react-bootstrap';
import './NotificationPopUp.css'
import { Link } from 'react-router-dom';

function NotificationPopUp(props){
    const notifications = props.notifications.map((note, i) => (
        <Link key={i} to={note.n_type === 'response' || note.n_type === 'cosign' ? `/letter/${note.letter_id}` : note.n_type === 'follow' ? `/profile/${note.creator_id}` : null }>
            <div className={!note.seen ? "notification-container" : "notification-container-seen"} onClick={() => props.markRead(note.id)}>
                <img src={note.picture} alt="profile"/>
                <div className="notification-text">
                    <div id="note-name">{note.first_name} {note.last_name}</div>
                    <div>{note.content}</div>
                </div>
            </div>
        </Link>
        
    ))
    return(
        <div>
            <Modal className="note-modal" show={props.show}>
                <Modal.Header>Notifications</Modal.Header>
                <Modal.Body className="note-modal-body">
                    {notifications}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={() => props.handleClose()}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NotificationPopUp;