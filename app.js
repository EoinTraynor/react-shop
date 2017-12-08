import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'

import { addToBasket } from './actions/'
import App from './components/App'
import store from './store.js'


const mapStateToProps = state => {
    return {
        state: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToBasket: id => {
        dispatch(addToBasket(id))
        }
    }
}

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App)


// store.subscribe(() => {
//     console.log("store changed", store.getState());
// });

// store.dispatch({type: "ADD_TO_BASKET", objectKey:0});
// store.dispatch({type: "ADD_TO_BASKET", objectKey:1});
// store.dispatch({type: "ADD_TO_BASKET", objectKey:2});

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('app')
)