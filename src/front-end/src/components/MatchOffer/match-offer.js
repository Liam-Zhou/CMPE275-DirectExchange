import React, {Component, Fragment} from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { connect } from 'react-redux';
import './match-offer.css';
import {Button } from 'reactstrap';

class MatchOffer extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    matchOffer = ()  => {

    }

    calculateForignCurrency = (amt,exRate) => {
        let forex = Math.round(((amt*exRate)+Number.EPSILON)*100)/100;
        return forex;
    }

    render(){
        let newAmt = this.props.newAmt;
        let myOffer = this.props.myOffer;
        let exRate = this.props.exRate;
        return <Fragment>
            <div className="m-container">
                <div className="m-col">
                    <h2>Match Offer</h2>
                </div>
                <div className="m-col">
                    <div className="m-heading">
                        <h3>My Current Offer</h3>
                    </div>
                    <div className="m-line">
                        <div>
                        Amount: {myOffer.amount} {myOffer.sourceCurrency} | {this.calculateForignCurrency(myOffer.amount,myOffer.exchangeRate)} {myOffer.destinationCurrency}
                        </div>
                    </div>
                    <div className="m-line">
                        <div>
                        Exchange Rate: {myOffer.exchangeRate}
                        </div>
                    </div>
                    <div className="m-line">
                        <div>
                        {myOffer.sourceCountry}
                            <i class="fas fa-arrow-right pad-icon"></i>
                        {myOffer.destinationCountry}
                        </div>
                    </div>
                    <div className="m-line">
                        <div>
                        {myOffer.sourceCurrency}
                            <i class="fas fa-arrow-right pad-icon"></i>
                        {myOffer.destinationCurrency}
                        </div>
                    </div>
                </div>
                <div className="m-col">
                    <div className="ao-heading">
                    <h3>My New Offer</h3>
                    </div>
                    <div className="m-line">
                        <div className="m-highlight">
                            New Amount: {newAmt} {myOffer.sourceCurrency} | {this.calculateForignCurrency(newAmt,myOffer.exchangeRate)} {myOffer.destinationCurrency}
                        </div>
                    </div>
                    <div className="m-line">
                        <div>
                        Exchange Rate: {myOffer.exchangeRate}
                        </div>
                    </div>
                    <div className="m-line">
                        <div>
                            {myOffer.sourceCountry}
                                <i class="fas fa-arrow-right pad-icon"></i>
                            {myOffer.destinationCountry}
                        </div>
                    </div>
                    <div className="m-line">
                        <div>
                            {myOffer.sourceCurrency}
                                <i class="fas fa-arrow-right pad-icon"></i>
                            {myOffer.destinationCurrency}
                        </div>
                    </div>
                </div>
                <div className="m-heading">
                <Button size="lg" color="primary" onClick={this.matchOffer}>Match!</Button>
                </div>
            </div>
        </Fragment>
    }

}

const mapStateToProps = (state) => {
    const isLoggedIn = state.userinfo.isLogin;
    const userId = state.userinfo.id;
    const  myOffer = state.matchingOffers.offerDetails ;
    return { isLoggedIn, userId, myOffer };
  }

  const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MatchOffer);
