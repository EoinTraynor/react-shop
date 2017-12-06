import React from 'react'

export default class Cart extends React.Component {
    constructor(){
        super();
        this.state = {            
            total: 0,
            cartItems: [
                {
                    "itemName": "banana",
                    "imgSrc": "https://tinyurl.com/zcdrymz",
                    "price": 1.25,
                    "quantity": 10
                },
                {
                    "itemName": "apple",
                    "imgSrc": "https://tinyurl.com/lg5rj5z",
                    "price": 2.50,
                    "quantity": 5
                }
            ]
        }
    }

    render(){
        const cartItems = this.state.cartItems;
        const numItems = Object.keys(cartItems).length;
        const cartTotal = Object.keys(cartItems).reduce((total, key) => {
            return total + (cartItems[key].price * cartItems[key].quantity);
        }, 0);
        let itemList = Object.keys(cartItems).map(index => {        
            return <div key={ index } className="col"> 
                <CartItem item={cartItems[index]} />
            </div>;
        });
        
        return(
            <div id="shoping-cart" className="col-3">
                <h2>Shoping Cart</h2>
                <p>{numItems} items</p>
                {itemList}
                <p>Total: $<span>{cartTotal}</span></p>
                <a>Empty Cart</a>
                <button>Confirm Purchase</button>
            </div>
        )
    }
}

class CartItem extends React.Component {
    render(){                   
        return (
            <div className='cart-item row'>     
                <img src={this.props.item.imgSrc} alt={this.props.item.itemName} className="img-responsive" width="75px" height="75px"/>        
                <div style={{display: 'inline-block', marginLeft: 10}}>
                    <div style={{fontSize:'1.25em', fontWeight: 'bold'}}>{this.props.item.itemName}</div>
                    <p>Unit ${this.props.item.price}</p>              
                    <p>Toatal ${this.props.item.price * this.props.item.quantity}</p>              
                </div>
                <div>                    
                    <a href="#">+</a>
                    <span>{this.props.item.quantity}</span>
                    <a href="#">-</a>
                    <a href="#">Remove Item</a>
                </div>
            </div>
        );
    }
}