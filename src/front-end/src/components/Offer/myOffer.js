import React, {Component} from 'react';
import '../../App.css';
import config from '../../config/basicConfig'
import currency from '../../config/currency'
import rate from '../../config/rate'
import axios from 'axios';
import { Redirect } from 'react-router';
import {connect} from "react-redux";
import {actionCreators} from "../../store/reducer/userinfo";
import {Button } from 'reactstrap';
import { setCurOffer } from '../../store/reducer/matchingOffers/actionCreator';

let host = config.host;
let port = config.back_end_port;
let url = host + ':' + port;


class MyOffer extends Component{
    constructor(props){
        super(props);
        this.state = {
            offerList:[]
        }
    }
    componentWillMount(){
        let id = this.props.id
        axios.get(url + '/offer/getByUserId?user_id='+id)
            .then(res => {
                if(res.status === 200 && res.data.message === 'success'){
                    let payload_arr = res.data.payload_arr
                    if(payload_arr.length != 0){
                        this.setState({
                            offerList:payload_arr
                        })

                    }else{
                        alert("there is no offers")
                    }

                }
            })
    }


    getMatchingOffers = (offer) => {
        this.props.setCurOffer(offer);
        this.props.history.push("/matchingOffers");
    }



    render(){
        let redirectVar = null;
        if(this.props.isLogin){

        }else{
            redirectVar=<Redirect to="/login"/>
        }


        return ( <div class="col-md-12 ">
                {redirectVar}
                <h3 className="center">My Offers List </h3>
                    <div className='profile_card' style={{'margin-left': '0px'}}>

                        {this.state.offerList.map( (offer,index) => (
                            <div class = "education_box" >
                                <p style=  {{}}>Amount:<h4 className='inline'>{offer.Amount}</h4></p>
                                <p style=  {{}}>Offer Status:<h4 className='inline'>{offer.OfferStatus}</h4></p>
                                <p style = {{}}>Source Country:<h4 class='inline'>{offer.SCountry}</h4></p>
                                <p style=  {{}}>Source Currency:<h4 className='inline'>{offer.SCurrency}</h4></p>
                                <p style=  {{}}>Destination Country:<h4 className='inline'>{offer.DCountry}</h4></p>
                                <p style=  {{}}>Destination Currency:<h4 className='inline'>{offer.DCurrency}</h4></p>
                                <p style=  {{}}>Rate:<h4 className='inline'>{offer.Rate}</h4></p>
                                <p style=  {{}}>Allow Counter Offer:<h4 className='inline'>{offer.CounterOffer}</h4></p>
                                <p style=  {{}}>Allow Split Offer:<h4 className='inline'>{offer.SplitExchange}</h4></p>
                                <p style=  {{}}>Expire Date:<h4 className='inline'>{offer['expire']}</h4></p>
                                {
                                    offer.OfferStatus==="Open" &&
                                    <Button size="lg" color="primary" onClick={()=> this.getMatchingOffers(offer)}>Get Matching Offers</Button>
                                }

                            </div>
                        ))}
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.userinfo.id,
        isLogin: state.userinfo.isLogin,
    }
}

const mapDispatchToProps = (dispatch) => ({

    signupByOutId(out_id){
        dispatch(actionCreators.signupByOutId(out_id));
    },
    connectLocalAccount(out_id,emailId,pwd,nickName){
        dispatch(actionCreators.connectLocalAccount(out_id,emailId,pwd,nickName));
    },
    setCurOffer(offerDetails){
        dispatch(setCurOffer(offerDetails));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(MyOffer);