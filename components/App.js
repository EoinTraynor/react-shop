import React from 'react'

import ItemList from './Items'
import Cart from './Cart'

export default class App extends React.Component {    
    changeStore(){
        this.setState({storeItems: this.cart})
    }

	render() {         
        const { storeItems, cart} = this.props.state;
        return(
            <div className="row">                
                <ItemList items={storeItems} changeStore={this.changeStore.bind(this)}/>
                <Cart items={cart}/>                                
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