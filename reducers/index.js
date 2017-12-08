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
// add key index to each store item 
Object.keys(StoreItems).map(index => {        
    index: StoreItems[index];    
});
const defaults = {
    storeItems: StoreItems,
    cart: []
}
const reducer = (state=defaults, action) => {       
    console.log(state);
    if (action.type === 'ADD_TO_BASKET') {
        const itemIndex = action.itemIndex;            
        const item = state.storeItems[itemIndex];        

        // ensure quantity is not 0
        if (!item.quantityRemaining) {            
            return state;
        }
        // decrement quantityRemaining
        state = {...state, 
            storeItems: {
                ...state.storeItems,
                    [action.itemIndex]: {
                        ...state.storeItems[action.itemIndex],
                        quantityRemaining: item.quantityRemaining-1
                    }
                
            }
        }
        // add object to cart
        function containsObject(obj, list) {            
            for (let i = 0; i < list.length; i++) {
                if (list[i].itemName === obj.itemName) {
                    return i;
                }
            }        
            return false;
        }

        function updateObjectInArray(array, action) {
            return array.map( (item, index) => {
                if(index !== action) {
                    // This isn't the item we care about - keep it as-is
                    return item;
                }
                
                // Otherwise, this is the one we want - return an updated value                
                return {
                    ...item,
                    quantityRemaining: 100
                };    
            });
        }

        // check if items is already in the basket
        const objectIndex = containsObject(item, state.cart)
        // add item        
        if (objectIndex === false) {
            state = {...state,
                cart: [
                    ...state.cart, item
                ]
            }
            return state;
        }
        
        // increase quantity
        // const cartList = {
        //     ...state,
        //     cart: [
        //         ...state.cart                                    
        //         // "hello"                
        //     ]
        // }
        const cartList = state.cart;
        updateObjectInArray(cartList, objectIndex);
        
    }
    return state;    
}

export default reducer