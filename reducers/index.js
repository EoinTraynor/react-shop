// import { combineReducers } from 'redux'
// import test from './todos'

// const tweetsReducer = (state={}, actions) => {
//     return state;
// }
// export default combineReducers({
//     test: test,
//     tweets: tweetsReducer
// })

const StoreItems = require('../data/store_items.json');

const defaults = {
    storeItems: StoreItems,
    basket: []
}
const reducer = (state=defaults, action) => {   
    if (action.type === 'ADD_TO_BASKET') {            
        // console.log(state.storeItems[0].quantityRemaining);        
        // ensure quantity is not 0
        // if (!item.quantityRemaining) {
        //     return state;
        // }
        // decrement quantityRemaining
        state = {
            ...state, name: action.objectKey            
        }
        // add object to cart
    }
    return state;    
}

export default reducer