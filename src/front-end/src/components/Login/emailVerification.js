import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

import {Redirect} from 'react-router';
import config from '../../config/basicConfig'

import firebase from 'firebase'
import 'firebaseui/dist/firebaseui.css'
import {connect} from "react-redux";
import {actionCreators} from "../../store/reducer/userinfo";
require('firebase/auth')
let firebaseui = require('firebaseui');

//Define a Signup Component
class EmailVerification extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailId : "",
            password : "",
            nickName:'',
            out_id:"",
            message : null
        }
        this.submitInfo = this.submitInfo.bind(this);

        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailIdChangeHandler = this.emailIdChangeHandler.bind(this);
        this.nickNameChangeHandler = this.nickNameChangeHandler.bind(this)
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        let out_id = localStorage.getItem("out_id");
        if(out_id){
            localStorage.removeItem("out_id");
            this.setState({'out_id':out_id})
            this.props.signupByOutId(out_id)
        }

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


    }

    nickNameChangeHandler = (e) => {
        if(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/.test(e.target.value)){
            this.setState({
                nickName : e.target.value
            })

        }else{
            this.setState({
                name : ""
            })
        }

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

    submitInfo = (e) => {
        //prevent page from refresh
        e.preventDefault();
        let pwd = this.state.password
        let emailId = this.state.emailId
        let nickName = this.state.nickName
        let outId = this.state.out_id
        if( pwd && emailId && nickName){
            firebase.auth().createUserWithEmailAndPassword(emailId, pwd)
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


                    // connect in the database outid,Id,pwd,nickname
                    this.props.connectLocalAccount(outId,emailId,pwd,nickName)

                }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage);
                console.log("error createUserWithEmailAndPassword",error)
            });
        }else{
            alert("make sure no empty and nickName is alphanumeric")
        }
    }


    render(){
        //redirect based on successful login
        let host = config.host;
        let port = config.front_end_port;
        let url = host + ':' + port;

        let central_part
        if(this.state.out_id){

            central_part = (
                <div className="loginform">
                    <div className="form-group">
                        <input onChange={this.nickNameChangeHandler} type="text" className="form-control" name="name"
                               placeholder="Nick Name"/>
                    </div>
                <div className="form-group">
                    <input onChange={this.emailIdChangeHandler} type="text" className="form-control"
                           name="email" placeholder="Email Id"/>
                </div>
                <div className="form-group">
                <input onChange={this.passwordChangeHandler} type="password" className="form-control"
            name="password" placeholder="Password"/>
                </div>
            <button onClick={this.submitInfo} className="button">Connect</button>
            <button onClick={()=>{window.location.href=url+"/login"}} className="button">No</button>
            <hr/>
                </div>
        )

        }else {
            central_part = (
                <div className="loginform">
                    <p>you should first sign google/facebook account</p>
                    <button onClick={()=>{window.location.href=url+"/signup"}} className="button">Back</button>

                </div>
                    )
        }

        return(
            <div>
                <div class="container">

                    <div class="maincenter">
                        <h3>Connect to Local Account</h3>
                        <br/>
                        {central_part}
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

    signupByOutId(out_id){
        dispatch(actionCreators.signupByOutId(out_id));
    },
    connectLocalAccount(out_id,emailId,pwd,nickName){
        dispatch(actionCreators.connectLocalAccount(out_id,emailId,pwd,nickName));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);