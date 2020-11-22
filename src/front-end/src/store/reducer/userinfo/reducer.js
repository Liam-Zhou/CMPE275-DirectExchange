const defaultState = {
    isLogin:false,
    email:"",
    nickName:'',
    id:null
}


export default (state = defaultState,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case 'login':
            newState.isLogin = true;
            newState.id = action.id;
            return newState;

        case 'logout':
            newState.isLogin = false;
            newState.choose_school = false;
            return {};

        default:
            return state;
    }
}