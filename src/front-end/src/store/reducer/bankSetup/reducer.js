import { BANK_SETUP_SUCCESS } from '../../action-types';

const initialState = {
    accounts : []
}

const bankSetup =  (state = initialState,action) => {
    switch(action.type){
    case BANK_SETUP_SUCCESS:
        return {
            ...state,
            accounts: [...state.accounts,action.payload]
          };
    default:
        return state;
    }
}

export default bankSetup;