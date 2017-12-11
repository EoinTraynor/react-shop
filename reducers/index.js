// import { combineReducers } from 'redux'
// import storeItem from './storeItem'

// const tweetsReducer = (state={}, actions) => {
//     return state;
// }
// export default combineReducers({
//     storeItem: storeItem,
//     tweets: tweetsReducer
// })

const StoreItems = require('../data/store_items.json');
// add key index to each store item 
Object.keys(StoreItems).map(index => {        
    index: StoreItems[index];    
});
const defaults = {
    storeItems: StoreItems,
    cart: {}
}
const reducer = (state=defaults, action) => {           
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

        // does object exist in cart helper
        function containsObject(obj, list) {                        
            console.log(list);
            for (let i = 0; i < list.length; i++) {
                // console.log("list " + list[i].itemName + "obj " + obj.itemName);
                if (list[i].itemName === obj.itemName) {                    
                    return i;
                }
            }        
            return false;
        }

        // remove object from array helper
        function updateItem(array, index, item) {
            return [
                ...array.slice(index, 1, item)                                
            ];
        }

        // check if items is already in the basket
        const objectIndex = containsObject(item, state.cart);
        // add item        
        let cartItem = item;
        delete cartItem.quantityRemaining;
        cartItem.quantity = 1;        
        if (objectIndex === false) {
            state = {...state,
                cart: [
                    ...state.cart, 
                    cartItem
                ]
            }
            return state;
        }
        
        // create new item
        let updatedItem = state.cart[objectIndex];
        updatedItem.quantity++;

        // update origional item from array
        let modifiedCart = updateItem(state.cart, objectIndex, updatedItem);                                

        // increase quantity
        state = {
            ...state,
            cart: modifiedCart
        }      
    }
    return state;    
}

export default reducer