import React, { Component } from 'react';
import Header from '../header/Header';
import '../../fontawesome-all';
import './EditLetter.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { editLetter, fetchThisLetter } from '../../redux/reducer';
import { Link } from 'react-router-dom';


class EditLetter extends Component{
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

    componentDidMount(){
        this.props.fetchThisLetter(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps){
        let { letter } = nextProps;
        this.setState({
            title: letter.title,
            description: letter.description,
            text: letter.content,
            addressedTo: letter.addressed_to
        })
    }

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
        this.props.editLetter(this.props.match.params.id, letter, this.props.history);
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
                            value={this.state.text}
                            onChange={this.handleChange}
                            modules = {modules}
                            formats = {formats}
                             />
                             <button className="btn" onClick={() => this.onSubmit()}>Save</button>
                             <Link to="/myletters"><button className="btn">Cancel</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        letter: state.selectedLetter
    };
};

export default connect(mapStateToProps, { editLetter, fetchThisLetter })(EditLetter);