import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import config from '../../config/basicConfig'
import money from '../../img/money.png'
import { actionCreators } from '../../store/reducer/userinfo'
import { connect } from "react-redux";
import firebase from 'firebase'
import 'firebaseui/dist/firebaseui.css'
require('firebase/auth')
// let firebase = require('firebase');
let firebaseui = require('firebaseui');


//Define a Login Component
class Login extends Component {
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //const mes = props.location.state
        this.state = {
            email : "",
            password : "",
            role : "",
            message:''
        }
    }
    componentWillMount(){
        // TODO: Replace the following with your app's Firebase project configuration
        // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
        const firebaseConfig = {
            apiKey: "AIzaSyAh_2Ac_Dn3NDoqUkrSApaDd5hZixJ6dKE",
            authDomain: "direct-exchange.firebaseapp.com",
            databaseURL: "https://direct-exchange.firebaseio.com",
            projectId: "direct-exchange",
            storageBucket: "direct-exchange.appspot.com",
            messagingSenderId: "551976198923",
            appId: "1:551976198923:web:623ffd4267dd954c85f80e"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        let ui = new firebaseui.auth.AuthUI(firebase.auth());
        // firebase.initializeApp(firebaseConfig);
        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                // List of OAuth providers supported.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID
            ],
        });
    }
    render() {
        let redirectVar = null;
        if(sessionStorage.getItem('user')){
            let role = JSON.parse(sessionStorage.getItem('user')).role;
            if(role == 'student'){
                redirectVar = <Redirect to= "/job/jobSearch"/>
            }
            if(role == 'company'){
                redirectVar = <Redirect to= "/job/viewJob"/>
            }

        }
        let host = config.host;
        let port = config.front_end_port;
        let url = host + ':' + port;
        return(
            <div>

                <div className="container" >
                    <div className="maincenter" style={{"height":"600px"}}>
                        <div align="center">
                            <h2>Direct Exchange</h2>
                        </div>
                        <div align ="center">
                            <img className='img' src={money} alt="." />
                        </div>

                        <div className="loginform">
                            <div>
                                {redirectVar}
                                <div align="center">
                                    <p>Please enter your information</p>
                                </div>
                                <div className="form-group">
                                    <input
                                        // onChange={}
                                        type="text" className="form-control"
                                           name="email" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input
                                        // onChange={}
                                        type="password"
                                           className="form-control" name="password" placeholder="Password"/>
                                </div>
                                {/*<label className="radio-inline">*/}
                                {/*    <input type="radio" name="role"*/}
                                {/*           // onChange={}*/}
                                {/*           value="student"/> student*/}
                                {/*</label>*/}
                                {/*<label className="radio-inline">*/}
                                {/*    <input type="radio" name="role"*/}
                                {/*           // onChange={}*/}
                                {/*           value="company"/> company*/}
                                {/*</label>*/}
                                <div id='firebaseui-auth-container' ></div>
                                <button className="button">Login</button>
                            </div>

                            <div><h4>{this.state.message}</h4></div>
                        </div>

                        <div className='signup'>
                            <p className="signup">Don't have an account? <a href={url + '/signup'} className="navbar-link">signup</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
const mapStateToProps = (state) => {
    return {
        isLogin: state.userinfo.isLogin,
        // userType: state.userinfo.userType,
        // school_id: state.userinfo.schoolID,
        // campus: state.userinfo.campus,
    }
}
const mapDispatchToProps = (dispatch) => ({
    login(email, pwd) {
        dispatch(actionCreators.login(email, pwd));
    },
    // remember(e) {
    //
    //     const action = {
    //         type: '',
    //         value: e
    //     }
    //     dispatch(action)
    // },
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);