import React, { Component, Fragment } from "react";
import {
    Card, CardBody,
  } from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import './bank-setup.css';
import Select from 'react-select';
import { connect } from 'react-redux'
import config from '../../config/basicConfig'

let BASE_URL = config.host+":"+config.back_end_port


class BankSetup extends Component {

    constructor(){
    super();
    this.state = {
        countries: [
            { value: 'India', label: 'India' },
            { value: 'China', label: 'China' },
            { value: 'UnitedStates', label: 'USA' }
        ],
        currencies: [
            { value: 'INR', label: 'INR' },
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'GBP', label: 'GBP' },
            { value: 'RMB', label: 'RMB' }
        ],
        operations: [
            {label: "Sending" , value: "sending"},
            {label: "Receiving", value: "receiving"}
        ],
        bankName: "",
        country: "",
        acctNo: "",
        ownerName: "",
        ownerAddress: "",
        currency: "",
        sending: null,
        receiving: null
    };
  }

  setupAcct = (event) => {
    event.preventDefault();
    fetch(BASE_URL+'/bank/setup', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        bankName: this.state.bankName,
        country: this.state.country,
        acctNo: this.state.acctNo,
        ownerName: this.state.ownerName,
        ownerAddress: this.state.ownerAddress,
        currency: this.state.currency,
        sending: this.state.sending,
        receiving: this.state.receiving,
        userId: this.props.userId
        }),
    })
      .then((response) => {
        return response.json();
      }).then((jsonRes) => {
        console.log("jsonRes is: ", jsonRes);
        // if (jsonRes.success == false) {
        //   console.log("Couldnt login");
        //   this.setState({
        //     error: jsonRes.message
        //   })
        //   this.props.loginFailureDispatch();
        // } else {
        //   console.log("logged in ! ", jsonRes);
        //   ls.set('jwtToken', jsonRes.token);
        //   ls.set('isLoggedIn', true);
        //   ls.set('userType', jsonRes.payload.userType);
        //   if (jsonRes.payload.userType === "owner") {
        //     this.props.ownerLoginSuccessDispatch(jsonRes);
        //     this.props.history.push("/home");
        //   }
        //   else {
        //     this.props.buyerLoginSuccessDispatch(jsonRes);
        //     this.props.history.push("/lets-eat");
        //   }
        // }
      })
    }

  handleOnchange  =  val  => {
    // let selects = this.state.selected;
    // selects.push(val);
    this.setState({[val]:true})
  }

  onChange = (e) => {
    let key = e.label;
    let value = e.value;
    this.setState({ [key]: value });
  }


  onClick = (event) => {
    this.props.history.push("/quiz");
}

    render() {
        return (
            <Fragment>
                <Card className="shadow">
                <CardBody className="bs-bgcolor">
                <div class="jumbotron jumbotron-fluid cr-jumbo-container shadow">
                    <div class="cr-container">
                        <div>
                            <h1 className="display">Add Bank Account</h1>
                        </div>
                        <div>
                            <p>Setup your bank account now!</p>
                            <hr/>
                        </div>
                        <div className="bs-columns">
                            <div className="bs-col-style">
                            <div className="cr-row-flex">
                                <div className="cr-label">
                                    Bank Name:
                                </div>
                                <div className="cr-pad-left">
                                    <input type="text" class="form-control cr-input" id="bankName" placeholder="Bank Name..." aria-describedby="bankName" />
                                </div>
                            </div>
                            <div className="cr-row-flex">
                                <div className="cr-label">
                                    Country:
                                </div>
                                <div className="cr-pad-left">
                                    <Select options={this.state.countries} id="country" className = "cr-input" onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="cr-row-flex">
                                <div className="cr-label">
                                    Account Number:
                                </div>
                                <div className="cr-pad-left">
                                    <input type="text" class="form-control cr-input" id="acctNo" placeholder="Account Number..." aria-describedby="acctNo" />
                                </div>
                            </div>
                            <div className="cr-row-flex">
                                <div className="cr-label">
                                    Owner Name:
                                </div>
                                <div className="cr-pad-left">
                                    <input type="text" class="form-control cr-input" id="ownerName" placeholder="Onwer Name..." aria-describedby="ownerName" />
                                </div>
                            </div>
                            </div>
                            <div className="bs-col-style">
                            <div className="cr-row-flex">
                                <div className="cr-label">
                                    Owner Address:
                                </div>
                                <div className="cr-pad-left">
                                    <input type="text" class="form-control cr-input" id="ownerAddress" placeholder="Onwer Address..." aria-describedby="ownerAddress" />
                                </div>
                            </div>
                            <div className="cr-row-flex">
                                <div className="cr-label">
                                    Currency:
                                </div>
                                <div className="cr-pad-left">
                                    <Select options={this.state.currencies} id="currency" className = "cr-input" onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="cr-row-flex">
                                <div className="cr-pad-left cr-topics-style">
                                    Operations:
                                </div>
                                <div className="cr-pad-left">
                                    <div className="app">
                                        <MultiSelect
                                        className = "cr-input"
                                        onChange={this.handleOnchange}
                                        options={this.state.options}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="cr-row-flex">
                                <div>
                                <button type="button" onClick={this.setupAcct} class="btn btn-outline-primary btn-lg">Start Quiz!</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </CardBody>
                    </Card>
            </Fragment>
        );
    }
}

  const mapStateToProps = (state) => {
    const isLoggedIn = state.userinfo.isLogin;
    const userId = state.userinfo.id;
    return { isLoggedIn, userId };
  }

  const mapDispatchToProps = (dispatch) => {
    return {
    //   ownerLoginSuccessDispatch: (payload) => { dispatch(onOwnerLoginSuccess(payload)) },
    //   buyerLoginSuccessDispatch: (payload) => { dispatch(onBuyerLoginSuccess(payload)) },
    //   loginFailureDispatch: () => { dispatch(onLoginFailure()) }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(BankSetup);