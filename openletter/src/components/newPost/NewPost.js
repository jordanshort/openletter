import React, { Component } from 'react';
import Header from '../header/Header';
import '../../fontawesome-all';
import './NewPost.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { postLetter } from '../../redux/reducer';
import { Modal } from 'react-bootstrap';



class NewPost extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            text: '',
            addressedTo: '',
            showModal: false
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(val){
        this.setState({text: val});
    };

    inputChange(name, val){
        this.setState({[name]: val});
    };

    onSubmit(){
        let { title, description, addressedTo, text } = this.state;
        let letter = {
            title,
            description,
            addressedTo,
            text
        }
        this.props.postLetter(letter, this.props.history);
    };


    render(){
        const modules= {
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline','strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              ['clean']
            ],
          };
        
        const  formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
          ];

        return(
            <div className="new-post-root">
                <Header history={this.props.history}/>
                <div className="new-post-body-container">
                    <div className="editor-container">
                        <input className="details-input" placeholder="Type Title Here" name="title" value={this.state.title} onChange={(e) => this.inputChange('title', e.target.value)}/> <br/>
                        <input className="details-input" placeholder="Addressed To:" name="addressedTo" value={this.state.addressedTo} onChange={(e) => this.inputChange('addressedTo', e.target.value)}/><br/>
                        <textarea className="details-input" placeholder="Type Description Here" name="description" value={this.state.description} onChange={(e) => this.inputChange('description', e.target.value)}/> 
                        <ReactQuill 
                            placeholder="Compose your letter"
                            theme="snow"
                            modules = {modules}
                            formats = {formats}
                            value = {this.state.text}
                            onChange = {this.handleChange}
                             >
                             {/* <div
                                value={this.state.text}
                                onChange={() => this.handleChange()}
                                className="my-editing-area"></div> */}
                             </ReactQuill>
                             <div className="letter-buttons">
                                <button className="btn btn-default" onClick={(e) => this.onSubmit(e.target.value)}>Send</button>
                                <button className="btn btn-danger" onClick={() => this.setState({showModal: true})}>Cancel</button>
                             </div>
                    </div>
                </div>
                <Modal show={this.state.showModal}>
                    <Modal.Body>
                        All your work will be deleted.  Are you sure you still want to exit?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default" onClick={() => this.setState({showModal: false})}>Continue Writing</button>
                        <button className="btn btn-danger" onClick={() => this.props.history.goBack()}>Yes, Exit</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default connect(null, { postLetter })(NewPost);