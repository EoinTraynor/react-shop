import React from 'react'
import ItemList from './Items'
import Cart from './Cart'

export default class App extends React.Component {        
	render() {                 
        return(
            <div className="row">                
                <ItemList />
                <Cart />                                
            </div>
        );
    }
}

// TO DO
// width
// Position
// Name length
// missing image

// add key index to each store item 
// Object.keys(StoreItems).map(index => {        
//     index: StoreItems[index];    
// });

    // Functions
    // Add item to basket
    // Increment - Decrement basket item
    // Remove Item from basket
    // Clear Basket
    // Make purchase