import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import {actionCreators} from "../../store/reducer/userinfo";

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        this.props.logout()
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        let redirectVar = null;
        if(this.props.isLogin){

        }else{
            redirectVar=<Redirect to="/login"/>
        }

        return(
            <div>
                {redirectVar}

                <nav class="navbar navbar-default navbar-static-top" style = {{"z-index":'9999'}}>
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <Link class="navbar-brand" >DirectExchange</Link>
                        </div>
                        <ul class="nav navbar-nav navbar-right">
                            <li><Link to="/home/postOffer">Post Offer</Link></li>
                            <li><Link to="/browseOffer">Browse Offer</Link></li>
                            <li><Link to="/myOffer">My Offer</Link></li>
                            <li><Link to="/message">Message</Link></li>
                            <div className="btn btn-group nav navbar-nav navbar-right">
                                <button type="button" className="btn btn-default dropdown-toggle "
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="glyphicon glyphicon-home"></span> user <span
                                    className="caret"></span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link to="/login" onClick={this.handleLogout}><span
                                        className="glyphicon glyphicon-remove-sign"></span>Logout</Link></li>
                                </ul>
                            </div>
                        </ul>

                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.userinfo.isLogin,
    }
}
const mapDispatchToProps = (dispatch) => ({
    login(out_id,email, pwd) {
        dispatch(actionCreators.login(out_id,email, pwd));
    },
    logout(){
        dispatch(actionCreators.logOut())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);