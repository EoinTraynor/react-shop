import React from 'react'
import { connect } from 'react-redux'
import { removeFromBasket, reduceItemInCart } from '../actions/'

class CartItem extends React.Component {
    handleRemoveItemClick(item, itemIndex){    
        const { removeFromBasket } = this.props;        
        removeFromBasket(item, itemIndex);
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
    render(){        
        const { cart, removeFromBasket, reduceItemInCart } = this.props;
        // calculate num of items & cart total        
        const numItems = Object.keys(cart).length;
        const cartTotal = Object.keys(cart).reduce((total, key) => {
            return total + (cart[key].price * cart[key].quantity);
        }, 0);
        let itemList = Object.keys(cart).map(index => {        
            return <div key={ index } className="col"> 
                <CartItem itemIndex={index} item={cart[index]} removeFromBasket={removeFromBasket} reduceItemInCart={reduceItemInCart} />
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

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeFromBasket: (item, itemIndex) => {
        dispatch(removeFromBasket(item, itemIndex))
        },
        reduceItemInCart: (item, itemIndex) => {
            dispatch(reduceItemInCart(item, itemIndex))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)