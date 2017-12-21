import React from 'react'
import { connect } from 'react-redux'
import { removeFromCart, reduceItemInCart, increaseItemInCart, clearCart, purchaseCart } from '../actions/'

class Cart extends React.Component {
    handlePurchaseCartClick(){
        const { purchaseCart } = this.props;
        purchaseCart();
    }
    handleClearCartClick(){
        const { clearCart } = this.props;
        clearCart();
    }

    render(){        
        const { cart, removeFromCart, reduceItemInCart, increaseItemInCart } = this.props;
        // calculate num of items & cart total        
        const numItems = Object.keys(cart).length;
        const cartTotal = Object.keys(cart).reduce((total, key) => {
            const itemTotal = Math.round((cart[key].price * cart[key].quantity) *100)/100;
            return Math.round((total + itemTotal)*100)/100;            
        }, 0);
        let itemList = Object.keys(cart).map(index => {        
            return <div key={ index } className="col"> 
                <CartItem itemIndex={index} item={cart[index]} removeFromCart={removeFromCart} reduceItemInCart={reduceItemInCart} increaseItemInCart={increaseItemInCart} />
            </div>;
        });
        
        return(
            <div id="shoping-cart" className="col-3">
                <h2>Shoping Cart</h2>
                <p>{numItems} Items</p>
                <div id="cart-item-list">
                    {itemList}
                </div>
                <p id="total-price">Cart Total: $<span>{cartTotal.toFixed(2)}</span></p>
                <a id="empty-cart" href="#" onClick={this.handleClearCartClick.bind(this)}>Empty Cart</a>                
                <button type="button" className="btn btn-primary" onClick={this.handlePurchaseCartClick.bind(this)}>Confirm Purchase</button>
            </div>
        )
    }
}

class CartItem extends React.Component {
    handleRemoveItemClick(item, itemIndex){    
        const { removeFromCart } = this.props;        
        removeFromCart(item, itemIndex);
    }
    handleReduceItemClick(item ,itemIndex){            
        const { reduceItemInCart } = this.props;        
        reduceItemInCart(item, itemIndex);
    }
    handleIncreaseItemClick(item ,itemIndex){            
        const { increaseItemInCart } = this.props;        
        increaseItemInCart(item, itemIndex);
    }

    render(){                
        const { itemIndex, item} = this.props;
        return (
            <div className='cart-item row'>     
                <img src={item.imgSrc} onError={(e)=>{e.target.src='http://via.placeholder.com/75x75'}} alt={item.itemName} className="img-responsive" width="75px" height="75px"/>        
                <div style={{display: 'inline-block', paddingLeft:10, textAlign:"initial", width:"170px"}}>
                    <div className="item-name text-capitalize">{item.itemName}</div>
                    <span style={{float:"left", paddingTop:"3px"}}>Unit ${item.price}</span>                                  
                    <div style={{float:"right"}}>
                        <i className="fa fa-minus" aria-hidden="true" onClick={this.handleReduceItemClick.bind(this, item, itemIndex)}></i>
                        <span style={{fontSize:"1.2em"}}>{item.quantity}</span>                    
                        <i className="fa fa-plus" aria-hidden="true" onClick={this.handleIncreaseItemClick.bind(this, item, itemIndex)}></i>
                    </div>
                </div>
                <div style={{width:"100%"}}>                                        
                    <a href="#" onClick={this.handleRemoveItemClick.bind(this, item, itemIndex)} style={{float:"left"}}>Remove Item</a>
                    <span style={{float:"right"}}>Item Total ${(item.price * item.quantity).toFixed(2)}</span>              
                </div>
            </div>
        );
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
        increaseItemInCart: (item, itemIndex) => {
            dispatch(increaseItemInCart(item, itemIndex))
        },
        clearCart: () => {
            dispatch(clearCart())
        },
        purchaseCart: () => {
            dispatch(purchaseCart())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)