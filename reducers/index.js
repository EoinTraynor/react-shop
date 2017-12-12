import { combineReducers } from 'redux'
// import storeItem from './storeItem'

const tweetsReducer = (state={}, actions) => {
    return state;
}

// export default combineReducers({
//     store: storeReducer,
//     tweets: tweetsReducer
// })

const StoreItems = require('../data/store_items.json');
// add key index to each store item 
// Object.keys(StoreItems).map(index => {        
//     index: StoreItems[index];    
// });
const defaults = {
    storeItems: StoreItems,
    cart: []
}

function removeItem(array, index) {
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];
}

function updateObjectInArray(array, itemIndex) {
    return array.map( (item, index) => {
        if(index !== itemIndex) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        
        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            quantity: item.quantity-1
        };    
    });
}

function findItemInStore(objList, itemName) {
    let itemIndex;
    Object.keys(objList).find((key) => {
        // match store item
        if (objList[key].itemName === itemName) {                    
            itemIndex = key;
        }                
    }); 
    return itemIndex;
}

const storeReducer = (state=defaults, action) => {         
    switch (action.type) {
        case 'ADD_TO_BASKET': {
            const itemIndex = action.itemIndex;
            const item = state.storeItems[itemIndex];

            // ensure quantity is not 0
            if (!item.quantityRemaining) {
                return state;
            }
            // decrement quantityRemaining
            state = {
                ...state,
                storeItems: {
                    ...state.storeItems,
                    [action.itemIndex]: {
                        ...state.storeItems[action.itemIndex],
                        quantityRemaining: item.quantityRemaining - 1
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
                state = {
                    ...state,
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
            return state;
            break;
        }
        case 'REMOVE_ITEM_FROM_BASKET': {
            const cartItemQuantity = action.item.quantity;
            const cartItemName = action.item.itemName;
            
            // find item in store            
            const storeItemIndex = findItemInStore(state.storeItems, cartItemName);                        
            
            // replenish store quantity
            state = {
                ...state,
                storeItems: {
                    ...state.storeItems,
                    [storeItemIndex]: {
                        ...state.storeItems[storeItemIndex],
                        quantityRemaining: state.storeItems[storeItemIndex].quantityRemaining + cartItemQuantity
                    }
                }
            }

            // remove item from cart            
            const updatedCart = removeItem(state.cart, action.itemIndex);            
            state = {
                ...state,
                cart: updatedCart                
            }

            return state;
            break;
        }
        case 'REDUCE_ITEM_IN_CART': {
            // replenish store quantity
            const storeItemIndex = findItemInStore(state.storeItems, action.item.itemName);         
            state = {
                ...state,
                storeItems: {
                    ...state.storeItems,
                    [storeItemIndex]: {
                        ...state.storeItems[storeItemIndex],
                        quantityRemaining: state.storeItems[storeItemIndex].quantityRemaining + 1
                    }
                }
            }
            
            // decrement cart quantity
            const updatedCart = updateObjectInArray(state.cart, action.itemIndex);            
            
            state = {
                ...state,
                cart: updatedCart                
            }

            // if cart item quantity is 0 remove from cart
            if(state.cart[action.itemIndex].quantity === 0){                
                const itemRemoved = removeItem(state.cart, action.itemIndex);
                state = {
                    ...state,
                    cart: itemRemoved
                }
            }

            return state;
        }
        default: {
            return state;
            break;
        }
    }               
}

export default storeReducer