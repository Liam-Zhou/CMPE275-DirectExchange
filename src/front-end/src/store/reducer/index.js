import { combineReducers } from 'redux'
import { reducer as userinfo } from './userinfo';
import  bankSetup  from './bankSetup/reducer';

const reducer =  combineReducers({
    userinfo:userinfo,
    bankSetup,
});

export default reducer;