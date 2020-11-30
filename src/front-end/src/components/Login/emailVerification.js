import React, {Component} from 'react';
import '../../App.css';
import 'firebaseui/dist/firebaseui.css'
import {connect} from "react-redux";
import {actionCreators} from "../../store/reducer/userinfo";
require('firebase/auth')

//Define a Signup Component
class EmailVerification extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailId : "",
            password : "",
            nickName:'',
            out_id:"",
            message : null
        }
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        let out_id = localStorage.getItem("out_id");

        let email = localStorage.getItem("emailId")
        let password = localStorage.getItem("password")
        let nickName = localStorage.getItem('nickName')

        this.props.signupByOutId(out_id)
        localStorage.removeItem("out_id");
        if(out_id && email && password && nickName){
            localStorage.removeItem("out_id");
            localStorage.removeItem("emailId");
            localStorage.removeItem("password");
            localStorage.removeItem("nickName");
            this.props.connectLocalAccount(out_id,email,password,nickName)
        }
        this.props.history.push("/login");
    }
    render(){
        return null
    }
}

const mapStateToProps = (state) => {
    return {
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
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);