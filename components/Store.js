import React from 'react'
// load data
const StoredItems = require('./store_items.json');

const Item = (props) => {
  return (
    <div className='list-item'> 
        <div>
            <img src={props.imgSrc} alt={props.itemName} className="img-responsive" width="160px" height="160px"/>
        </div>        
        <p>{props.itemName}</p>
        <p><span className="price">${props.price}</span> {props.quantityRemaining} In Stock</p>
        <button type="button" className="btn btn-success">Add to Cart</button>
    </div>
  )
}

const ItemList = (props) => {            
    let itemList = Object.keys(props).map(index => {        
        return <div key={ index } className="col"> <Item {...props[index]}/> </div>;
    });
    return <div className="col-9 items-group"><div className="row"> {itemList} </div></div>
}

const SideBar = () => {
    return(
        <div className="col-3">
            SideBar
        </div>
    )
}

export default class App extends React.Component {
	render() {
        return(
            <div className="row">                
                <ItemList {...StoredItems}/>                                                
                {/* <SideBar />                                 */}
            </div>
        );
    }
}