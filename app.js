import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import store from './store.js'

store.subscribe(() => {
    console.log("store changed", store.getState());
});

store.dispatch({type: "ADD_TO_BASKET", objectKey:0});
store.dispatch({type: "ADD_TO_BASKET", objectKey:1});
store.dispatch({type: "ADD_TO_BASKET", objectKey:2});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)