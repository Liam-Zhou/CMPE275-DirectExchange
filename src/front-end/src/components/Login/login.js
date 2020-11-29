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
let firebaseui = require('firebaseui');

let backend_url = config.host+":"+config.back_end_port

//Define a Login Component
class Login extends Component {
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //const mes = props.location.state
        this.state = {
            emailId : "",
            password : "",

            message:''
        }
        this.handleLogin = this.handleLogin.bind(this)

        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailIdChangeHandler = this.emailIdChangeHandler.bind(this);
        // this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

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


        let uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    console.log("authResultauthResultauthResult",authResult.additionalUserInfo.profile)
                    let out_id = authResult.additionalUserInfo.profile.id
                    axios({
                        method:"GET",
                        url:backend_url+"/user/getByOutId?out_id="+out_id
                    }).then(function (res) {
                        if(res.status === 200 && res.data.message === 'success'){
                            let currentUser = firebase.auth().currentUser;
                            if(currentUser.emailVerified){
                                localStorage.setItem("out_id_transfer",out_id)
                                window.location.href=config.host + ':' + config.front_end_port+"/transfer"
                            }else{
                                if(window.confirm("your email haven't verified,do you wanna verification link now ?")){
                                    currentUser.sendEmailVerification().then(function() {
                                        alert("success ! check the verification link in your email")
                                        window.location.href=config.host + ':' + config.front_end_port+"/login"
                                    }).catch(function(error) {

                                    });
                                }else{
                                }
                            }
                        }else {
                            alert("sorry ! you didn't sign up this account")

                            window.location.href=config.host + ':' + config.front_end_port+"/login"
                        }

                        })

                    return true;
                }

            },

            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            // signInSuccessUrl: '/login',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            // tosUrl: '<your-tos-url>',
        };

        ui.start('#firebaseui-auth-container', uiConfig);



    }

    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    emailIdChangeHandler = (e) => {
        this.setState({
            emailId : e.target.value
        })
    }

    handleLogin(){
        firebase.auth().signInWithEmailAndPassword(this.state.emailId, this.state.password)
            .then((user) => {
                let currentUser = firebase.auth().currentUser;
                if(currentUser.emailVerified){
                    this.props.login('',this.state.emailId,this.state.password)
                    // let host = config.host;
                    // let port = config.front_end_port;
                    // let url = host + ':' + port;
                    // window.location.href=url+"/"
                    this.props.history.push("/");
                }else{
                    let v = window.confirm("your email haven't verified,do you wanna verification link now ?")
                    if(v){
                        currentUser.sendEmailVerification().then(function() {
                            alert("success ! check the verification link in your email")

                        }).catch(function(error) {

                        });
                    }else{

                    }
                }
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage)
            });
    }
    render() {
        let redirectVar = null;
        if(this.props.isLogin){
            redirectVar = <Redirect to= "/home"/>
        }
        let host = config.host;
        let port = config.front_end_port;
        let url = host + ':' + port;
        return(
            <div>
{/*<button onClick={this.props.logout}>clear</button>*/}
                {redirectVar}
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
                                        onChange={this.emailIdChangeHandler}
                                        type="text" className="form-control"
                                           name="email" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input
                                        onChange={this.passwordChangeHandler}
                                        type="password"
                                           className="form-control" name="password" placeholder="Password"/>
                                </div>
                                <div id='firebaseui-auth-container' ></div>
                                <hr/>
                                <button onClick={this.handleLogin} className="button">Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);