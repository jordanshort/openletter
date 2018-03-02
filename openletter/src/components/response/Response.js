import React, { Component } from 'react';
import Header from '../header/Header';
import '../../fontawesome-all';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { postResponse } from '../../redux/reducer';
import { Modal } from 'react-bootstrap';


class Response extends Component{
    constructor(){
        super();
        this.state = {
            text: '',
            showModal: false
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(val){
        this.setState({text: val});
    };

    

    onSubmit(){
        let { postResponse, history, match } = this.props;
        postResponse(this.state.text, match.params.letterid, history);
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
                        <ReactQuill
                            placeholder="Compose your letter"
                            theme="snow"
                            value={this.state.text}
                            onChange={this.handleChange}
                            modules = {modules}
                            formats = {formats}
                             />
                             <div className="letter-buttons">
                                <button className="btn btn-default" onClick={() => this.onSubmit()}>Send</button>
                                <button onClick={() => this.setState({showModal: true})} className="btn btn-danger">Cancel</button>
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

export default connect(null, { postResponse })(Response);