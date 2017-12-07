// const test = (state=0, action) => {
//   if (action.type === 'INC') {
//     return state+1;
//   }
//   return state;
// }

// export default test

const StoreItems = require('../data/store_items.json');

const defaults = {
    storeItems: StoreItems,
    basket: []
}
const reducer = (state=defaults, action) => {
    const newState = state;
    if (action.type === 'ADD_TO_BASKET') {
        const item = state.storeItems[0];        
        // ensure quantity is not 0
        if (!item.quantityRemaining) {
            return state;
        }
        // decrement quantityRemaining
        newState.name: "name"}
        // add object to cart
    }
    return state;    
}

export default reducer