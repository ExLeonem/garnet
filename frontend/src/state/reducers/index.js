/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 * 
 */

import { combineReducers } from 'redux'
import collectReducer from './collect'
import environmentReducer from './env'
import teamReducer from './team'



let rootReducer = combineReducers({
    collect: collectReducer,
    env: environmentReducer,
    team: teamReducer
});

export default rootReducer;