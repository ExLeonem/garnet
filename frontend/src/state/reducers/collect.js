/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 */

import { 
    ADD_DISTRICT, 
    REMOVE_DISTRICT,
    LOAD_BINS,
    REMOVE_BIN, 
    START_ROUTING,
    END_ROUTING
} from '../types/collect';


let initialState = {
    districts: [], // selected districts to use for collection
    bins: [], // array of {id: id, position: [lat, long], fillState: fillState}
    position: [], // current position
    route: false // wether or not to start routing
}


export default function(state = initialState, action) {

    let newState = state;

    switch (action.type) {

        case ADD_DISTRICT: {

            // Add not already added district
            let currentDistricts = state.districts;
            if (!(action.payload in currentDistricts)) {
                
                currentDistricts.push(action.payload);
                newState = {...state, district: currentDistricts};
            }

            break;
        }

        case REMOVE_DISTRICT: {

            let currentDistricts = state.districts;
            if (action.payload in currentDistricts) {

                currentDistricts.filter((districtID) => districtID !== action.payload);
                newState = {...state, districts: currentDistricts};
            }

            break;
        }

        case LOAD_BINS: {

            break;
        }

        case REMOVE_BIN: {

            break;
        }

        case START_ROUTING: {
            newState = {...state, route: true};
            break;
        }

        case END_ROUTING: {
            newState = initialState;
            break;
        }

        default:
            return state;
    }

    return newState;
}