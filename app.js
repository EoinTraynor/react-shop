import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'

import { addToBasket } from './actions/'
import App from './components/App'
import store from './store.js'

// listen to store changes: for testing
store.subscribe(() => {
    console.log("store changed", store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)