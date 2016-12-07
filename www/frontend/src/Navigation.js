import React, { Component } from 'react';
import {Link} from 'react-router';

class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="container-fluid">
                
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">VCE</a>
                </div>
                
                <div className="collapse navbar-collapse" id="bs-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><Link to={"/"} activeClassName={"active"}>Home</Link></li>
                    <li><Link to={"/switch"}>Switch</Link></li>
                    <li><Link to={"/workgroup"}>Workgroup</Link></li>
                  </ul>
                  
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Logout</a></li>
                  </ul>                  
                </div>
              </div>
            </nav>
        );
    }
}

export {Navigation};
