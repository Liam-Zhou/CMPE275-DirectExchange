import axios from 'axios';

export const login = (email,pwd) =>{
    return ( dispatch ) => {
        let obj = {
            email: email,
            password: pwd
        }
        axios({
            method:"POST",
            url:"",
            data:JSON.stringify(obj),
        }).then(function (res) {
            console.log(res);
            if(res.data.code === "1"){
                const action = {
                    type:'login',
                    id:res.data.user._id,
                    email:res.data.user.email,
                }
                dispatch(action)
            }else{
            alert("登陆失败");
            }
        }).catch(function (error) {
            console.log(error);
        });
}
}