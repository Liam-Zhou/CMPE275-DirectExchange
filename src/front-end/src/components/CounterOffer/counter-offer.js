import React, {Component, Fragment} from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { connect } from 'react-redux';
import './counter-offer.css';
import {Button } from 'reactstrap';

class CounterOffer extends Component {

    constructor() {
        super();
        this.state = {
            error : "",
            newAmt : null,

        }
    }

    counterOffer = ()  => {

    }

    lowRange = (amt) => {
            let margin = 0.1*amt;
            return amt - margin;
    }

    highRange = (amt) => {
        let margin = 0.1*amt;
        return amt + margin;
    }

    onChange = (event) => {
        let val = event.target.value;
        if(this.validateNewAmt(val,this.props.otherOffer.amount))
            this.setState({newAmt: [val],error:""});
        else
            this.setState({error:"Please enter an amount within the given range!",newAmt:0.0});
    }

    validateNewAmt = (newAmt,amt) => {
        let lo = this.lowRange(amt);
        let hi = this.highRange(amt);
        if(newAmt >= lo
            && newAmt <= hi)
                return true;
        else
            return false;
    }

    render(){
        let otherOffer = this.props.otherOffer;
        return <Fragment>
            <div className="c-container">
                <div className="c-col">
                    <h2>Counter Offer</h2>
                </div>
                <div className="c-col">
                    <div className="c-heading">
                        <h3>{otherOffer.userNickname} 's Original Offer</h3>
                    </div>
                    <div className="c-line">
                        <div>
                        Amount: {otherOffer.amount} {otherOffer.sourceCurrency} | {(otherOffer.amount*otherOffer.exchangeRate).toFixed(2)} {otherOffer.destinationCurrency}
                        </div>
                    </div>
                    <div className="c-line">
                        <div>
                        Exchange Rate: {otherOffer.exchangeRate}
                        </div>
                    </div>
                    <div className="c-line">
                        <div>
                        {otherOffer.sourceCountry}
                            <i class="fas fa-arrow-right pad-icon"></i>
                        {otherOffer.destinationCountry}
                        </div>
                    </div>
                    <div className="c-line">
                        <div>
                        {otherOffer.sourceCurrency}
                            <i class="fas fa-arrow-right pad-icon"></i>
                        {otherOffer.destinationCurrency}
                        </div>
                    </div>
                </div>
                <div className="c-col">
                    <div className="c-heading">
                        <h3>Propose New Offer</h3>
                    </div>
                    <div className="c-line">
                        <div>
                            NOTICE #1: The proposed offer amount must be within 10% of the original offer amount.
                            ( Between {this.lowRange(otherOffer.amount)} and {this.highRange(otherOffer.amount)} )
                        </div>
                    </div>
                    <div className="c-line">
                        <div>
                            NOTICE #2: If it is a split offer, counter offer will only be proposed to the offer with
                            the larger amount among the two offers.
                        </div>
                    </div>
                    <div className="c-line">
                        <div>
                            NOTICE #2: Please enter remit amount in {otherOffer.sourceCurrency}
                        </div>
                    </div>
                    <div className="c-line">
                        <div>
                            New Remit Amount: (in {otherOffer.sourceCurrency})
                            <input type="number" min={()=>this.lowRange(otherOffer.amount).toString()} max={()=>this.highRange(otherOffer.amount).toString()} class="form-control cr-input" onChange={this.onChange} id="newAmt" aria-describedby="newAmt" />
                        </div>
                    </div>
                    <div className="c-line">
                        <div>
                            {this.state.error}
                        </div>
                    </div>
                </div>
                {
                    this.validateNewAmt(this.state.newAmt,otherOffer.amount) && this.state.error==="" &&
                    <div className="c-heading">
                    <Button size="lg" color="primary" onClick={this.counterOffer}>Propse Counter offer</Button>
                    </div>
                }
            </div>
        </Fragment>
    }


}

const mapStateToProps = (state) => {
    const isLoggedIn = state.userinfo.isLogin;
    const userId = state.userinfo.id;
    return { isLoggedIn, userId };
  }

  const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CounterOffer);