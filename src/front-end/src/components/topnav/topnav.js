import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import money from '../../img/money.png';
import './topnav.css';

class TopNav extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg topnav">
          <a className="navbar-brand" href="#">
            <img src={money} width="30" height="30" alt="" loading="lazy"/>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link t-font-size-14 tn-link" to="about">About </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link t-font-size-14 tn-link" to="login">Login </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link t-font-size-14 tn-link" to="signUp">SignUp </Link>
              </li>
            </ul>
          </div>
       </nav>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  //auth: state.auth,
  //cartInfo:state.cartInfo
});

export default connect(mapStateToProps,{})(TopNav);