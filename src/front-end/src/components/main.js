import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/login';
import Signup from './Login/signup';
import emailVerification from './Login/emailVerification'
import Transfer from './Login/transfer'
import Navbar from "./Nav/navBar";
import postOffer from "./Offer/postOffer"

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/*<Route path="/" component={Navbar}/>*/}
                <Route path="/home" component={Navbar}/>
                <Route path="/login" component={Login}/>

                <Route path="/transfer" component={Transfer}/>

                <Route path="/signup" component={Signup}/>
                <Route path="/emailVerification" component={emailVerification}/>

                <Route path="/home/postOffer" component={postOffer}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;