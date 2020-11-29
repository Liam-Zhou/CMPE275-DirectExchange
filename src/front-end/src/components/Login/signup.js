import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

import {Redirect} from 'react-router';
import config from '../../config/basicConfig'

import { actionCreators } from '../../store/reducer/userinfo'
import { connect } from "react-redux";

import firebase from 'firebase'
import 'firebaseui/dist/firebaseui.css'
require('firebase/auth')
let firebaseui = require('firebaseui');
let backend_url = config.host+":"+config.back_end_port

//Define a Signup Component
class Signup extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailId : "",
            password : "",
            name : "",
            message : null,
            // lead : ''
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailIdChangeHandler = this.emailIdChangeHandler.bind(this);

        this.submitInfo = this.submitInfo.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
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
        this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

        let uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    console.log("authResultauthResultauthResult",authResult.additionalUserInfo.profile)
                    let profile = authResult.additionalUserInfo.profile;
                    // localStorage.setItem("outId",profile.id);
                    let user = firebase.auth().currentUser;

                    user.sendEmailVerification().then(function() {
                        alert("success ! check the verification link in your email")
                        // Email sent.
                    }).catch(function(error) {
                        // An error happened.
                    });
                    // write in the database out_id
                    localStorage.setItem("out_id",profile.id)

                    return true;
                }

            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/emailVerification',
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


    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        if(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/.test(e.target.value)){
            this.setState({
                name : e.target.value
            })
        }else{
            this.setState({
                name : ""
            })
        }

    }
    //password change handler to update state variable with the text entered by the user
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

    //submit Login handler to send a request to the node backend
    submitInfo = (e) => {
        //prevent page from refresh
        e.preventDefault();
        if(this.state.name && this.state.password  && this.state.emailId){

            axios({
                method:"POST",
                url:backend_url+"/user/signUpInLocal?emailId="+this.state.emailId +"&pwd="+this.state.password+"&nickName="+this.state.name,

            }).then(function (res) {
                if(res.status === 200 && res.data.message === 'success'){
                    firebase.auth().createUserWithEmailAndPassword(this.state.emailId, this.state.password)
                        .then((user) => {
                            let currentUser = firebase.auth().currentUser;
                            currentUser.sendEmailVerification().then(function() {
                                alert("success ! check the verification link in your email")
                                let host = config.host;
                                let port = config.front_end_port;
                                let url = host + ':' + port;
                                window.location.href=url+"/login"
                            }).catch(function(error) {
                            });
                        }).catch((error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        alert(errorMessage);
                        console.log("error createUserWithEmailAndPassword",error)
                    });
                }else{
                    alert("nick name or email id duplicated in database");
                }
            })


        }else{
            alert("make sure no empty and nickName is alphanumeric")
        }
    }

    render(){
        //redirect based on successful login
        let host = config.host;
        let port = config.front_end_port;
        let url = host + ':' + port;
        return(
            <div>
                {/*{this.state.lead}*/}
                <div class="container">

                    <div class="maincenter">
                        <div class="loginform">
                            <div align ="center">
                                <p>Please register your information</p>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.nameChangeHandler}  type="text" class="form-control" name="name" placeholder="Nick Name"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailIdChangeHandler}  type="text" class="form-control" name="email" placeholder="Email Id"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler}  type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>

                            <div id='firebaseui-auth-container' ></div>
                            <hr/>
                            <button onClick = {this.submitInfo} class="button">Signup</button>
                            <div><h4>{this.state.message}</h4></div>
                        </div>
                        <div class='signin'>
                            <p >already have an account? <a href={url + '/login'} class="navbar-link">signin</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // isLogin: state.userinfo.isLogin,
    }
}
const mapDispatchToProps = (dispatch) => ({
    signupByLocal(email, pwd,nickName) {
        dispatch(actionCreators.signupByLocal(email, pwd,nickName));
    },
    signupByOutId(out_id){
        dispatch(actionCreators.signupByOutId(out_id));

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);