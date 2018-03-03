import React from 'react';
import { Modal } from 'react-bootstrap';
import './NotificationPopUp.css'

function NotificationPopUp(props){
    const notifications = props.notifications.map(note => (
        <div className="notification-container">
            <img src={note.picture} alt="profile"/>
            <div className="notification-text">
                <p>{note.first_name} {note.last_name}</p><p>{note.content}</p>
            </div>
            
        </div>
    ))
    return(
        <div>
            <Modal show={true}>
                <Modal.Header>Notifications</Modal.Header>
                <Modal.Body>
                    {notifications}
                </Modal.Body>
                <Modal.Footer>
                    <button>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NotificationPopUp;