import React, {Component} from 'react';
import '../../App.css';
import config from '../../config/basicConfig'
import currency from '../../config/currency'
import rate from '../../config/rate'
import axios from 'axios';
import { Redirect } from 'react-router';
import {connect} from "react-redux";
import {actionCreators} from "../../store/reducer/userinfo";

let host = config.host;
let port = config.back_end_port;
let url = host + ':' + port;


class browserOffer extends Component{
    constructor(props){
        super(props);
        this.state = {
            offerList:[],
            currencyList:[],
            Samount:'',
            Damount:'',
            Scurrency:'',
            Dcurrency:'',
            offer:''
        }
        this.submit = this.submit.bind(this)


        this.SamountChangeHandler = this.SamountChangeHandler.bind(this)
        this.DamountChangeHandler = this.DamountChangeHandler.bind(this)

        this.ScurrencyChangeHandler = this.ScurrencyChangeHandler.bind(this)
        this.DcurrencyChangeHandler = this.DcurrencyChangeHandler.bind(this)

        this.detail = this.detail.bind(this)
    }
    componentWillMount(){

        let currencyList = []
        Object.keys(currency).map((m) =>{
            currencyList.push(currency[m])
        })
        this.setState({
            currencyList: Array.from(new Set(currencyList))
        })
    }
    SamountChangeHandler(e){
        e.preventDefault();
        let Scurrency = this.state.Scurrency
        let Dcurrency = this.state.Dcurrency
        if(Scurrency == '' && Dcurrency == ''){
            alert("please select source and destination currency first!")
        }else{
            let Samount = e.target.value
            let Damount
            if(Scurrency == Dcurrency){
                Damount = Samount
            }else{
                let key = Scurrency+"_"+Dcurrency
                Damount = rate[key] * Samount
            }
            this.setState({
                Samount:Samount,
                Damount:Damount
            })
            console.log("this.state",this.state)
        }
    }
    DamountChangeHandler(e){
        e.preventDefault();
        let Scurrency = this.state.Scurrency
        let Dcurrency = this.state.Dcurrency
        if(Scurrency == '' && Dcurrency == ''){
            alert("please select source and destination currency first!")
        }else{
            let Damount = e.target.value
            let Samount
            if(Scurrency == Dcurrency){
                Samount = Damount
            }else{
                let key = Scurrency+"_"+Dcurrency
                Samount =  Damount/rate[key]
            }
            this.setState({
                Samount:Samount,
                Damount:Damount
            })
        }
    }

    DcurrencyChangeHandler(e){
        e.preventDefault();
        this.setState({
            Dcurrency:e.target.value
        })
    }
    ScurrencyChangeHandler(e){
        e.preventDefault();
        this.setState({
            Scurrency:e.target.value
        })
    }
    submit(e){
        e.preventDefault();
        let Samount = this.state.Samount
        let Scurrency = this.state.Scurrency
        let Dcurrency = this.state.Dcurrency
        axios.get(url + '/offer/all?pageNum='+1+"&Scurrency="+Scurrency+"&Samount="+Samount+"&Dcurrency="+Dcurrency)
            .then(res => {
                if(res.status === 200 && res.data.message === 'success'){
                    let payload_arr = res.data.payload_arr
                    if(payload_arr.length != 0){
                        this.setState({
                            offerList:payload_arr
                        })

                    }else{
                        alert("there is no offers mateched")
                    }

                }
            })
    }

    detail(offer){
        console.log("offeroffer",offer)
        this.setState({
            offer:offer
        })
    }
    render(){
        let Samount = this.state.Samount
        let Damount = this.state.Damount

        return ( <div class="col-md-12 ">
                <h3 className="center">Offers List </h3>
            <div className="cprofile_card img" style={{'width': '100%'}}>

                <h3 className="center">left is source  ,  right is destination</h3>

                <form onSubmit={this.submit} className='img' style={{'width': '43%'}} >

                    <select style={{'margin-left': '30px'}} ref="" name="Scurrency" onChange={this.ScurrencyChangeHandler}>
                        {
                            this.state.currencyList.map((m) =>(
                                <option  value={m} >{m}</option>
                            ))
                        }
                    </select>
                    <input type="text" name="Samount" value={Samount} placeholder="amount of source"
                           style={{'width': '28%'}} onChange={this.SamountChangeHandler}></input>

                    <select style={{'margin-left': '30px'}} ref="" name="Dcurrency" onChange={this.DcurrencyChangeHandler}>
                        {
                            this.state.currencyList.map((m) =>(
                                <option  value={m} >{m}</option>
                            ))
                        }
                    </select>
                    <input type="text"  style={{}} name="Damount" value={Damount} placeholder="amount of destination"
                           onChange={this.DamountChangeHandler}></input>

                    <button type="submit" className="glyphicon glyphicon-search "
                            style={{'margin-left': '10px'}}></button>
                </form>
            </div>
            <div className="col-md-6">
                <div className='profile_card' style={{'margin-left': '0px'}}>
                    <h2>Posted Offers</h2>
                {this.state.offerList.map( (offer,index) => (
                    <div class = "education_box" >
                        <button type="button" style={{}} onClick={()=>this.detail(offer)}
                                className="glyphicon glyphicon-triangle-right edit-right">detail
                        </button>
                        <p style = {{}}>Source Country:<h4 class='inline'>{offer.SCountry}</h4></p>
                        <p style=  {{}}>Source Currency:<h4 className='inline'>{offer.SCurrency}</h4></p>
                        <p style=  {{}}>Destination Country:<h4 className='inline'>{offer.DCountry}</h4></p>
                        <p style=  {{}}>Destination Currency:<h4 className='inline'>{offer.DCurrency}</h4></p>
                        <p style=  {{}}>Amount:<h4 className='inline'>{offer.Amount}</h4></p>
                        <p style=  {{}}>Rate:<h4 className='inline'>{offer.Rate}</h4></p>

                    </div>
                ))}
                </div>
            </div>
            <div className="col-md-6">
                <div className='profile_card' style={{'margin-left': '0px', 'height': 'auto'}}>
                    <h2>detail info</h2>
                    <div className="education_box">

                        <p style={{}}>Allow Counter Offer:<h4 className='inline'>{this.state.offer.CounterOffer}</h4></p>
                        <p style={{}}>Allow Split Offer:<h4 className='inline'>{this.state.offer.SplitExchange}</h4></p>
                        <p style={{}}>owner_id:<h4 className='inline'>{this.state.offer.owner_id}</h4></p>
                        <p style={{}}>owner_name:<h4 className='inline'>{this.state.offer.owner_name}</h4></p>
                        <p style={{}}>owner_rating:<h4 className='inline'>{this.state.offer.owner_rating}</h4></p>

                    </div>
                </div>
            </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.userinfo.id,
    }
}

const mapDispatchToProps = (dispatch) => ({

    signupByOutId(out_id){
        dispatch(actionCreators.signupByOutId(out_id));
    },
    connectLocalAccount(out_id,emailId,pwd,nickName){
        dispatch(actionCreators.connectLocalAccount(out_id,emailId,pwd,nickName));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(browserOffer);