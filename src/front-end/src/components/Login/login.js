import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import config from '../../config/basicConfig'
import money from '../../img/money.png'


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
                <div className="container">

                    <div className="maincenter">
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
                                <button
                                    // onClick={}
                                    className="button">Login</button>
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
export default Login;