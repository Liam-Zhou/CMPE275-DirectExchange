import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import Navbar from "../Nav/navBar";
import OfferDetailsMO from '../OfferDetailsMO/offer-details-mo';
import RecommendationsMO from '../RecommendationsMO/recommendations-mo';
import './matching-offers-list.css';
import OffersListMO from '../OffersListMO/offers-list-mo';
import FiltersMO from '../FiltersMO/filters-mo';

class MatchingOffers extends Component {

    constructor(){
        super();
        this.state = {
            // offerDetails : {
            //     id : 40 ,
            //     amount : 750.0,
            //     sourceCountry : "USA",
            //     sourceCurrency : "USD",
            //     destinationCountry : "IND",
            //     destinationCurrency : "INR",
            //     exchangeRate : 74.24,
            //     expirationDate : "",
            //     allowCounterOffers : true,
            //     allowSplitExchange : true,
            //     offerStatus : "Open"
            // }
        }
    }

    render(){
        return <Fragment>

            <div className="db-container">
                <OfferDetailsMO offerDetails={this.props.offerDetails}/>
                <FiltersMO />
                <OffersListMO offerId={this.props.offerDetails.id}/>
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => {
    const isLoggedIn = state.userinfo.isLogin;
    const userId = state.userinfo.id;
    const offerDetails = state.matchingOffers.offerDetails;
    return { isLoggedIn, userId, offerDetails };
  }

  const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MatchingOffers);