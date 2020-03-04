/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 * 
 */

import { combineReducers } from 'redux';
import collectReducer from './collect';


let rootReducer = combineReducers({
    collect: collectReducer
});

export default rootReducer;