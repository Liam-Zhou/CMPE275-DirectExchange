import React, {Component} from 'react';
import { Route,  Redirect } from 'react-router-dom';
import Login from './Login/login';
import Signup from './Login/signup';
import emailVerification from './Login/emailVerification'
import Transfer from './Login/transfer'
import Landing from './Landing/landing';
import BankSetup from './BankSetup/bank-setup';
import Navbar from "./Nav/navBar";

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/*<Route path="/" component={Navbar}/>*/}
                <Route exact path="/" render={() => (
                <Redirect to="/landing"/>
                )} />
                <Route exact path="/landing" component={Landing} />

                <Route path="/home" component={Login}/>
                <Route path="/home" component={Navbar}/>
                <Route path="/login" component={Login}/>

                <Route path="/transfer" component={Transfer}/>

                <Route path="/signup" component={Signup}/>
                <Route path="/emailVerification" component={emailVerification}/>

                <Route path="/bank-setup" component={BankSetup}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;