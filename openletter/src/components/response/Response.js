import React, { Component } from 'react';
import Header from '../header/Header';
import '../../fontawesome-all';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { postResponse } from '../../redux/reducer';
import { Link } from 'react-router-dom';


class Response extends Component{
    constructor(){
        super();
        this.state = {
            text: '',
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(val){
        this.setState({text: val});
    };

    

    onSubmit(){
        let { postResponse, history, match } = this.props;
        this.props.postResponse(this.state.text, match.params.letterid, this.props.history);
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
                        <ReactQuill
                            placeholder="Compose your letter"
                            theme="snow"
                            value={this.state.text}
                            onChange={this.handleChange}
                            modules = {modules}
                            formats = {formats}
                             />
                             <button className="btn" onClick={() => this.onSubmit()}>Send</button>
                             <button onClick={() => this.props.history.goBack()} className="btn">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { postResponse })(Response);