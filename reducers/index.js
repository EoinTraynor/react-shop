const StoreItems = require('../data/store_items.json');
const defaults = {
    storeItems: StoreItems,
    cart: []
}

// HELPERS
// does item exist in cart
function containsObject(obj, list) {    
    for (let i = 0; i < list.length; i++) {        
        if (list[i].itemName === obj.itemName) {
            return i;
        }
    }
    return false;
}

function removeItem(array, index) {
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];
}

function updateObjectInArray(array, itemIndex, instruction) {    
    return array.map( (item, index) => {
        if(index !== itemIndex) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        
        // Otherwise, this is the one we want - return an updated value
        // increment cart item quantity 
        if (instruction === 'INC') {
            return {
                ...item,
                quantity: item.quantity+1
            };    
        }
        // decrement cart item quantity 
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
        case 'ADD_TO_CART': {            
            const storeItemIndex = action.itemIndex;
            const item = state.storeItems[storeItemIndex];

            // ensure quantity is not 0
            if (!item.quantityRemaining) {
                return state;
            }
            // decrement quantityRemaining
            state = {
                ...state,
                storeItems: {
                    ...state.storeItems,
                    [storeItemIndex]: {
                        ...state.storeItems[storeItemIndex],
                        quantityRemaining: item.quantityRemaining - 1
                    }

                }
            }        

            // check if items is already in the Cart
            const objectIndex = containsObject(item, state.cart);
            // it doesn't => add item                                
            if (objectIndex === false) {
                // modify the item 'quantity'
                let cartItem = item;
                delete cartItem.quantityRemaining;
                cartItem.quantity = 1;
                state = {
                    ...state,
                    cart: [
                        ...state.cart,
                        cartItem
                    ]
                }
                return state;
            }            

            // increase quantity
            const updatedCart = updateObjectInArray(state.cart, objectIndex, 'INC');
            
            state = {
                ...state,
                cart: updatedCart
            }
            return state;
            break;
        }
        case 'REMOVE_ITEM_FROM_CART': {
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
            const updatedCart = updateObjectInArray(state.cart, action.itemIndex, 'DEC');            
            
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
        case 'INCREASE_ITEM_IN_CART': {                        
            const storeItemIndex = findItemInStore(state.storeItems, action.item.itemName); 
            const item = state.storeItems[storeItemIndex];
            
            // ensure quantity is not 0
            if (!item.quantityRemaining) {
                return state;
            }
            // decrement quantityRemaining
            state = {
                ...state,
                storeItems: {
                    ...state.storeItems,
                    [storeItemIndex]: {
                        ...state.storeItems[storeItemIndex],
                        quantityRemaining: item.quantityRemaining - 1
                    }

                }
            }

            // increase cart item quantity
            const updatedCart = updateObjectInArray(state.cart, action.itemIndex, 'INC');            
            state = {
                ...state,
                cart: updatedCart                
            }

            return state;
            
        }
        case 'PURCHASE_CART': {
            // empty cart
            state = {
                ...state,
                cart: []
            }
            return state;
        }
        case 'CLEAR_CART': {
            // foreach item in cart
            // find item in store            
            Object.keys(state.cart).map(index => {        
                const storeItemIndex = findItemInStore(state.storeItems, state.cart[index].itemName);                                
                const cartItemQuantity = state.cart[index].quantity;
                // // replenish store quantity
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
            });            
            
            // empty cart 
            state = {
                ...state,
                cart: []                
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