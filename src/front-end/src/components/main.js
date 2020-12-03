import React, {Component} from 'react';
import { Route,  Redirect } from 'react-router-dom';
import Login from './Login/login';
import Signup from './Login/signup';
import emailVerification from './Login/emailVerification'
import Transfer from './Login/transfer'
import Landing from './Landing/landing';
import BankSetup from './BankSetup/bank-setup';
import Navbar from "./Nav/navBar";

import MatchingOffers from './MatchingOffersList/matching-offers-list';

import postOffer from "./Offer/postOffer"
import browserOffer from './Offer/Browser'
import myOffer from './Offer/myOffer'
import PrevailingRates from'./Offer/PrevailingRates'
import transaction from './Offer/transaction'
import myTransaction from './Offer/myTransaction' 
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/" component={Navbar}/> */}
                <Route exact path="/" render={() => (
                <Redirect to="/landing"/>
                )} />
                <Route exact path="/landing" component={Landing} />
  
                <Route path="/home" component={Navbar}/>
                <Route path="/login" component={Login}/>

                <Route path="/transfer" component={Transfer}/>

                <Route path="/signup" component={Signup}/>
                <Route path="/emailVerification" component={emailVerification}/>


                <Route path="/bankSetup" component={BankSetup}/>
                <Route path="/matchingOffers" component={MatchingOffers}/>

                <Route path="/home/postOffer" component={postOffer}/>

                <Route path="/home/rates" component={PrevailingRates}/>
                <Route path="/home/postOffer" component={postOffer}/>
                <Route path="/home/browserOffer" component={browserOffer}/>
                <Route path="/home/myOffer" component={myOffer}/>
                <Route path="/home/transaction" component={transaction}/>

                <Route path="/home/myTransaction" component={myTransaction}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;