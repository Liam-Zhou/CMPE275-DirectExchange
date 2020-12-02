import React, {Component, Fragment} from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { connect } from 'react-redux';
import './accept-single-offer.css';
import {Button } from 'reactstrap';

class AcceptSingleOffer extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    acceptOffer = ()  => {

    }

    render(){
        let otherOffer = this.props.otherOffer;
        let myOffer = this.props.myOffer;
        return <Fragment>
            <div className="ao-container">
                <div className="ao-col">
                    <h2>Accept Offer</h2>
                </div>
                <div className="ao-col">
                    <div className="ao-heading">
                        <h3>My Offer</h3>
                    </div>
                    <div className="ao-line">
                        <div>
                        Amount: {myOffer.amount} {myOffer.sourceCurrency} | {(myOffer.amount*myOffer.exchangeRate).toFixed(2)} {myOffer.destinationCurrency}
                        </div>
                    </div>
                    <div className="ao-line">
                        <div>
                        Exchange Rate: {myOffer.exchangeRate}
                        </div>
                    </div>
                    <div className="ao-line">
                        <div>
                        {myOffer.sourceCountry}
                            <i class="fas fa-arrow-right pad-icon"></i>
                        {myOffer.destinationCountry}
                        </div>
                    </div>
                    <div className="ao-line">
                        <div>
                        {myOffer.sourceCurrency}
                            <i class="fas fa-arrow-right pad-icon"></i>
                        {myOffer.destinationCurrency}
                        </div>
                    </div>
                </div>
                <div className="ao-col">
                    <div className="ao-heading">
                    <h3>Accepting Offer</h3>
                    </div>
                    <div className="ao-line">
                        <div>
                            Amount: {otherOffer.amount} {otherOffer.sourceCurrency} | {(otherOffer.amount*otherOffer.exchangeRate).toFixed(2)} {otherOffer.destinationCurrency}
                        </div>
                    </div>
                    <div className="ao-line">
                        <div>
                        User: {otherOffer.userNickname}
                        </div>
                    </div>
                    <div className="ao-line">
                        <div>
                        Exchange Rate: {otherOffer.exchangeRate}
                        </div>
                    </div>
                    <div className="ao-line">
                        <div>
                        {otherOffer.sourceCountry}
                            <i class="fas fa-arrow-right pad-icon"></i>
                        {otherOffer.destinationCountry}
                        </div>
                    </div>
                    <div className="ao-line">
                        <div>
                        {otherOffer.sourceCurrency}
                            <i class="fas fa-arrow-right pad-icon"></i>
                        {otherOffer.destinationCurrency}
                        </div>
                    </div>
                </div>
                <div className="ao-heading">
                <Button size="lg" color="primary" onClick={this.acceptOffer}>Accept!</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AcceptSingleOffer);