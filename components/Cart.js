import React from 'react'

export default class Cart extends React.Component {
    constructor(){
        super();
        this.state = {
            numItems: 0,
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

    clearCart(e){
        console.log(e);
    }

    render(){
        let itemList = Object.keys(this.state.cartItems).map(index => {        
            return <div key={ index } className="col"> 
                <CartItem item={this.state.cartItems[index]} />
            </div>;
        });
        
        return(
            <div id="shoping-cart" className="col-3">
                <h2>Shoping Cart</h2>
                <p>{this.state.numItems} items</p>
                <div className="row"> {itemList} </div>            
                <p>Total: $<span>{this.state.total}</span></p>
                <a>Empty Cart</a>
                <button>Confirm Purchase</button>
            </div>
        )
    }
}

class CartItem extends React.Component {
    render(){                   
        return (
            <div className='list-item'>             
                <p>${this.props.item.itemName}</p>              
                <p>${this.props.item.price}</p>              
                <p>${this.props.item.quantity}</p>              
                <p>${this.props.item.price * this.props.item.quantity}</p>    

                {/* To Do                         
                Delete Item                
                Increment/Decrement Item
                */}

            </div>
        );
    }
}