import React from 'react'
import ItemList from './Items'
import Cart from './Cart'
const StoreItems = require('../assets/store_items.json');

// TO DO
// width
// Position
// Name length
// missing image

// basket

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            storeItems: StoreItems,
            cart: {},
        };
    }

    changeStore(){
        this.setState({storeItems: this.cart})
    }

	render() {
        return(
            <div className="row">                
                <ItemList items={this.state.storeItems} changeStore={this.changeStore.bind(this)}/>
                <Cart items={this.state.cart}/>                                
            </div>
        );
    }
}