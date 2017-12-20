import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../actions/'

class Item extends React.Component {    
    handleItemClick(itemIndex){
        const { addToCart } = this.props;        
        addToCart(itemIndex);
    }
    
    render(){           
        const { index, item } = this.props;
        return (
          <div className='list-item'> 
              <div>
                  <img src={item.imgSrc} onError={(e)=>{e.target.src='http://via.placeholder.com/160x160'}} alt={item.itemName} className="img-responsive" width="160px" height="160px"/>
              </div>        
              <p className="item-name text-capitalize">{item.itemName}</p>
              <p><span className="price">${item.price}</span> {item.quantityRemaining} In Stock</p>
              <button onClick={this.handleItemClick.bind(this, index)} type="button" className="btn btn-success" disabled={!item.quantityRemaining>0}>Add to Cart</button>
          </div>
        );
    }
}

class ItemList extends React.Component {
    render(){        
        const { storeItems, addToCart } = this.props;    
        let itemList = Object.keys(storeItems).map((key, index) => {                    
            return <div key={ index } className="col-4"> 
                <Item index={ index } item={storeItems[index]} addToCart={addToCart} /> 
            </div>;
        });
        return( 
            <div className="col-9 items-group">
                <div className="row"> {itemList} </div>                            
            </div>
        )
    }                   
}

const mapStateToProps = state => {
    return {
        storeItems: state.storeItems
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToCart: id => {
        dispatch(addToCart(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)