import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers"

export const store = createStore(
    reducers, // pass reducers, this gets in to the index.js in reducers. it is the root reducer
        // pass middleware
    compose(
        applyMiddleware(thunk),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)