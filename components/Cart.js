import React from 'react'
import { connect } from 'react-redux'
import { removeFromCart, reduceItemInCart, clearCart, purchaseCart } from '../actions/'

class CartItem extends React.Component {
    handleRemoveItemClick(item, itemIndex){    
        const { removeFromCart } = this.props;        
        removeFromCart(item, itemIndex);
    }
    handleReduceItemClick(item ,itemIndex){            
        const { reduceItemInCart } = this.props;        
        reduceItemInCart(item, itemIndex);
    }

    render(){                
        const { itemIndex, item} = this.props;
        return (
            <div className='cart-item row'>     
                <img src={item.imgSrc} alt={item.itemName} className="img-responsive" width="75px" height="75px"/>        
                <div style={{display: 'inline-block', marginLeft: 10}}>
                    <div style={{fontSize:'1.25em', fontWeight: 'bold'}}>{item.itemName}</div>
                    <p>Unit ${item.price}</p>              
                    <p>Toatal ${item.price * item.quantity}</p>              
                </div>
                <div>                    
                    <a href="#">+</a>
                    <span>{item.quantity}</span>
                    <a href="#" onClick={this.handleReduceItemClick.bind(this, item, itemIndex)}>-</a>
                    <a href="#" onClick={this.handleRemoveItemClick.bind(this, item, itemIndex)}>Remove Item</a>
                </div>
            </div>
        );
    }
}

class Cart extends React.Component {
    handlePurchaseCartClick(){
        const { purchaseCart } = this.props;
        purchaseCart();
    }

    render(){        
        const { cart, removeFromCart, reduceItemInCart } = this.props;
        // calculate num of items & cart total        
        const numItems = Object.keys(cart).length;
        const cartTotal = Object.keys(cart).reduce((total, key) => {
            return total + (cart[key].price * cart[key].quantity);
        }, 0);
        let itemList = Object.keys(cart).map(index => {        
            return <div key={ index } className="col"> 
                <CartItem itemIndex={index} item={cart[index]} removeFromCart={removeFromCart} reduceItemInCart={reduceItemInCart} />
            </div>;
        });
        
        return(
            <div id="shoping-cart" className="col-3">
                <h2>Shoping Cart</h2>
                <p>{numItems} items</p>
                {itemList}
                <p>Total: $<span>{cartTotal}</span></p>
                <a>Empty Cart</a>
                <button onClick={this.handlePurchaseCartClick.bind(this)}>Confirm Purchase</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (item, itemIndex) => {
        dispatch(removeFromCart(item, itemIndex))
        },
        reduceItemInCart: (item, itemIndex) => {
            dispatch(reduceItemInCart(item, itemIndex))
        },
        clearCart: (item, itemIndex) => {
            dispatch(clearCart(item, itemIndex))
        },
        purchaseCart: () => {
            dispatch(purchaseCart())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)