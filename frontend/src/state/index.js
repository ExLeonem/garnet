/**
 * @author Maksim Sandybekov
 * @date 4.2.2020
 * 
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


export default createStore(rootReducer, applyMiddleware(thunk));
