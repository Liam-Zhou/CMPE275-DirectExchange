import { combineReducers } from 'redux'
import { reducer as userinfo } from './userinfo';
import  bankSetup  from './bankSetup/reducer';
import getMatchingOffers from './matchingOffers/reducer'

const reducer =  combineReducers({
    userinfo:userinfo,
    bankSetup,
    matchingOffers:getMatchingOffers
});

export default reducer;