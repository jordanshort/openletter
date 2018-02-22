import React, { Component } from 'react';
import Header from '../header/Header';
import '../../fontawesome-all';
import './NewPost.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { postLetter } from '../../redux/reducer';
import { Link } from 'react-router-dom';


class NewPost extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            text: '',
            addressedTo: ''
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
                <Header />
                <div className="new-post-body-container">
                    <div className="editor-container">
                        <input placeholder="Title" name="title" value={this.state.title} onChange={(e) => this.inputChange('title', e.target.value)}/> <br/>
                        <input placeholder="Description" name="description" value={this.state.description} onChange={(e) => this.inputChange('description', e.target.value)}/> <br/>
                        <input placeholder="Addressed To:" name="addressedTo" value={this.state.addressedTo} onChange={(e) => this.inputChange('addressedTo', e.target.value)}/>
                        <ReactQuill 
                            placeholder="Compose your letter"
                            theme="snow"
                            modules = {this.modules}
                            formats = {this.formats}
                             >
                             <div
                                value={this.state.text}
                                onChange={this.handleChange}
                                className="my-editing-area"/>
                             </ReactQuill>
                             <button className="btn" onClick={() => this.onSubmit()}>Send</button>
                             <Link to="/home"><button className="btn">Cancel</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { postLetter })(NewPost);