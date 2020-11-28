const defaultState = {
    id:"",
    isLogin:false,
    username:"",
    nickname:'',
    out_id:"",
    rating:"",
    accounts:"",
    offers:[]
}



export default (state = defaultState,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case 'login':
            delete action.type;
            delete action.password;
            return action;

        case 'logout':

            return {};

        // case 'signupByLocal':
            // delete action.type;
            // delete action.password;
            // return action;


        default:
            return state;
    }
}