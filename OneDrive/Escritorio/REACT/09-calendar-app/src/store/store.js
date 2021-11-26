import { applyMiddleware, compose, createStore/*,combineReducers */} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducers";
//import { uiReducer } from "../reducers/uiReducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/*const reducers = combineReducers({
    ui:uiReducer,

});*/

export const store=createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);