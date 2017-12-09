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
        // does object exist in cart
        function containsObject(obj, list) {            
            for (let i = 0; i < list.length; i++) {
                if (list[i].itemName === obj.itemName) {
                    return i;
                }
            }        
            return false;
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
        state = {
            ...state,
            cart: {
                ...state.cart,                                    
                [objectIndex]: {
                    ...state.cart[objectIndex],
                    quantityRemaining: state.cart[objectIndex].quantityRemaining+1
                }  
            }
        }
        
    }
    return state;    
}

export default reducer