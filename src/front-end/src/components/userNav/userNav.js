import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import money from '../../img/money.png';
import './userNav.css';

class UserNav extends Component {

  constructor(){
    super();
    this.state = {
      name: "Amoolya"
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg usernav">
          <a className="navbar-brand un-brand" href="#">DirectExchange</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link t-font-size-12 un-link" to="create">Create Quiz</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link t-font-size-12 un-link" to="explore">Explore</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.state.name}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Profile</a>
                  <a class="dropdown-item" href="#">Settings</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Logout</a>
                </div>
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

export default connect(mapStateToProps,{})(UserNav);