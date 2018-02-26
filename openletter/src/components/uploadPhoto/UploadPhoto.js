import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updatePicture } from '../../redux/reducer';

function sendToback(photo){
    console.log(photo);
    return axios.post('/api/photoUpload', photo);
}

class UploadPhoto extends Component{
    constructor(props){
        super(props);
        this.state = {
            file: '',
            filename: '',
            filetype: '',
            userID: ''
        }
        this.handlePhoto = this.handlePhoto.bind(this);
        this.sendPhoto = this.sendPhoto.bind(this);
    }

    componentDidMount(){
        this.setState({userID: this.props.userID});
    }

    handlePhoto(event){
        const reader = new FileReader()
        , file = event.target.files[0]

        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file)
    }

    sendPhoto(event){
        event.preventDefault();

        sendToback(this.state).then(response => {
            this.props.updatePicture(response.data.Location);
            this.props.handleClose('showPicModal');
            console.log(response);
        });
    }

    render(){
        this.state.file && console.log(this.state.photo)
        return(
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Select A Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="FileUpload">
                        <input type="file" onChange={this.handlePhoto}/>
                        <br/>
                        {
                        this.state.file &&
                        <img src={this.state.file} alt="" className="file-preview"/>
                        }
                        <button onClick={this.sendPhoto}>Submit</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={() => this.props.handleClose('showPicModal')}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            
        )
    }
}

export default connect(null, { updatePicture })(UploadPhoto);
