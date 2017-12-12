export function addToBasket(itemIndex) {
    return {
        type: "ADD_TO_BASKET", 
        itemIndex
    }
}

export function removeFromBasket(item, itemIndex) {     
    return {
        type: "REMOVE_ITEM_FROM_BASKET", 
        item,
        itemIndex: Number(itemIndex)
    }
}

export function reduceItemInBakset(item) {
    return {
        type: "REDUCE_ITEM_IN_BASKET", 
        itemIndex: item
    }
}

export function clearBasket(item) {
    return {
        type: "CLEAR_BASKET", 
        itemIndex: item
    }
}

export function purchaseBasket(item) {
    return {
        type: "PURCHASE_BASKET", 
        itemIndex: item
    }
}

