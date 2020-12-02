import {
        GET_MATCHING_OFFERS,
        SET_FILTER
     } from '../../action-types';
import axios from 'axios';
import config from '../../../config/basicConfig'
let backend_url = config.host+":"+config.back_end_port

export const getMatchingOffers = (offerId) =>  dispatch => {
        axios({
            method:"GET",
            url:backend_url+"/matchingOffers/all?offerId="+offerId,
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(function (response) {
            if(response.status === 200 && response.data.message === 'success'){
                let data = response.data.payload;
                dispatch( {
                    type: GET_MATCHING_OFFERS,
                    payload: data
                })
            }
            else{
                let jsonRes = response.data;
                alert("Couldn't fetch matching offers! Please try again!\n" + "Status Code: "+ jsonRes.code + "\n"+
                "Message: " +jsonRes.debugMessage);
                return;
            }
        }).catch(function (error) {
            console.log(JSON.stringify(error));
        });
}

export const setFilter = (excludeSetup) => dispatch => {
    return dispatch( {
        type: SET_FILTER,
        payload: excludeSetup
    })
}