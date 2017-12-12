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
                  <img src={item.imgSrc} alt={item.itemName} className="img-responsive" width="160px" height="160px"/>
              </div>        
              <p>{item.itemName}</p>
              <p><span className="price">${item.price}</span> {item.quantityRemaining} In Stock</p>
              <button onClick={this.handleItemClick.bind(this, index)} type="button" className="btn btn-success">Add to Cart</button>
          </div>
        );
    }
}

class ItemList extends React.Component {
    render(){
        console.log(this.props);
        const { storeItems, addToCart } = this.props;
        // this.props.addToCart(1);
        let itemList = Object.keys(storeItems).map((key, index) => {                    
            return <div key={ index } className="col"> 
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