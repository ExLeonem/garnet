/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 */

import { 
    ADD_DISTRICT, 
    REMOVE_BIN, 
    REMOVE_DISTRICT
} from '../types/collect';



let initialState = {
    districts: [], // selected districts to use for collection
    bin: [], // array of {id: id, position: [lat, long], fillState: fillState}
    position: [] // current position
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

                currentDistricts.filter((districtID) => districtID != action.payload);
                newState = {...state, districts: currentDistricts};
            }

            break;
        }

        case REMOVE_BIN: {

        }
    }

    return newState;
}