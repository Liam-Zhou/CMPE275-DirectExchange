import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import Navbar from "../Nav/navBar";


class MatchingOffers extends Component {

    constructor(){
        super();
        this.state = {
            offerDetails : {
                id : 1 ,
                amount : 21,
                sourceCountry : "",
                sourceCurrency : "",
                destinationCountry : "",
                destinationCurrency : "",
                exchangeRate : 12.0,
                expirationDate : "",
                allowCounterOffers : true,
                allowSplitExchange : true,
                offerStatus : ""
            }

        }
    }

    render(){
        return <Fragment>
            <Navbar/>
            MatchingOffers
        </Fragment>
    }

    componentDidMount(){

    }
}

const mapStateToProps = (state) => {
    const isLoggedIn = state.userinfo.isLogin;
    const userId = state.userinfo.id;
    return { isLoggedIn, userId };
  }

  const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MatchingOffers);