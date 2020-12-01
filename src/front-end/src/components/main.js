import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import Login from './Login/login';
import Signup from './Login/signup';
import emailVerification from './Login/emailVerification'
import Transfer from './Login/transfer'
import Navbar from "./Nav/navBar";
import postOffer from "./Offer/postOffer"
import browserOffer from './Offer/Browser'
import myOffer from './Offer/myOffer'
import PrevailingRates from'./Offer/PrevailingRates'

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

                <Route path="/home/rates" component={PrevailingRates}/>
                <Route path="/home/postOffer" component={postOffer}/>
                <Route path="/home/browserOffer" component={browserOffer}/>
                <Route path="/home/myOffer" component={myOffer}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;