import React from 'react'
import { connect } from 'react-redux'
import { addToBasket } from '../actions/'

class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item: props.item            
        };
    }
    
    addedToBasket(e){
        this.state.item.quantityRemaining -= 1;        
        this.setState({item: this.state.item});
    }
    
    render(){           
        // console.log(this.state.item.quantityRemaining);
        return (
          <div className='list-item'> 
              <div>
                  <img src={this.state.item.imgSrc} alt={this.state.item.itemName} className="img-responsive" width="160px" height="160px"/>
              </div>        
              <p>{this.state.item.itemName}</p>
              <p><span className="price">${this.state.item.price}</span> {this.state.item.quantityRemaining} In Stock</p>
              <button onClick={this.addedToBasket.bind(this)} type="button" className="btn btn-success">Add to Cart</button>
          </div>
        );
    }
}

class ItemList extends React.Component {
    render(){
        console.log(this.props);
        const { storeItems, addToBasket } = this.props;
        this.props.addToBasket(1);
        let itemList = Object.keys(storeItems).map((key, index) => {                    
            return <div key={ index } className="col"> <Item item={storeItems[index]}/> </div>;
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
        addToBasket: id => {
        dispatch(addToBasket(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)