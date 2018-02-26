import React, { Component } from 'react';
import axios from 'axios';

function sendToback(photo){
    console.log(photo);
    return axios.post('/api/photoUpload', photo);
}

export default class UploadPhoto extends Component{
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
            console.log(response.data);
        });
    }

    render(){
        this.state.file && console.log(this.state.photo)
        return(
            <div className="FileUpload">
                <input type="file" onChange={this.handlePhoto}/>
                <br/>
                {
                this.state.file &&
                <img src={this.state.file} alt="" className="file-preview"/>
                }
                <button onClick={this.sendPhoto}>Submit</button>
            </div>
        )
    }
}
