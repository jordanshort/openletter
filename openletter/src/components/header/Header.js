import React, { Component } from 'react';
import './Header.css';
import '../../fontawesome-all';
import { Link } from 'react-router-dom';

class Header extends Component{
    constructor(){
        super();
        this.state = {
            term: ''
        }
    }

    handleChange(val){
        this.setState({term: val})
    }

    render(){
        console.log(this.state.term);
        return(
            <div className="header">
                <div className="header-logo">Logo here</div>
                    <form className="input-group">
                        <input 
                        placeholder="Search"
                        className="form-control"
                        value={this.state.term}
                        onChange={e => this.handleChange(e.target.value)}
                        />
                        <span className="input-group-btn">
                        <button type="submit" className="btn btn-secondary">Search</button>
                        </span>
                    </form>
                
                <div className="header-nav">
                    <Link to="/home"><i className="fas fa-home fa-2x" /></Link>
                    <Link to="/profile"><i className="far fa-user fa-2x" /></Link>
                    <Link to="/newpost"><i className="fas fa-pencil-alt fa-2x" /></Link>
                    <a href="http://localhost:6000/logout"><i className="fas fa-sign-out-alt fa-2x" /></a>
                    
                </div>
            </div>
        )
    }
}

export default Header;

