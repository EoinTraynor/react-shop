export function addToCart(itemIndex) {
    return {
        type: "ADD_TO_CART", 
        itemIndex
    }
}

export function removeFromCart(item, itemIndex) {     
    return {
        type: "REMOVE_ITEM_FROM_CART", 
        item,
        itemIndex: Number(itemIndex)
    }
}

export function reduceItemInCart(item, itemIndex) {    
    return {
        type: "REDUCE_ITEM_IN_CART", 
        item,
        itemIndex: Number(itemIndex)
    }
}

export function clearCart(item) {
    return {
        type: "CLEAR_CART", 
        itemIndex: item
    }
}

export function purchaseCart(item) {
    return {
        type: "PURCHASE_CART", 
        itemIndex: item
    }
}

