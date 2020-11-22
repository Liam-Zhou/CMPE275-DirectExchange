import { combineReducers } from 'redux'
import { reducer as userinfo } from './userinfo';

const reducer =  combineReducers({
    userinfo:userinfo,
});

export default reducer;