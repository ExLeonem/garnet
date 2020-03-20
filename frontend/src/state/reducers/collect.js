/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 */

import { 
    ADD_DISTRICT, 
    REMOVE_DISTRICT,
    LOAD_BINS_SUCCESS,
    LOAD_BINS_ERROR,
    REMOVE_BIN,
    SET_POSITION, 
    START_ROUTING,
    END_ROUTING
} from '../types/collect';

import { getItem, setItem } from './local_storage';


let initialState = {
    districts: getItem("selectedDistricts", []), // selected districts to use for collection
    bins: getItem("bins", []), // array of {id: id, position: [lat, long], fillState: fillState}
    position: getItem("position", []), // current position
    route: getItem("route", false) // wether or not to start routing
}


export default function(state = initialState, action) {

    let newState = state;

    switch (action.type) {

        case ADD_DISTRICT: {

            // console.log(state.districts);

            // Add not already added district
            let currentDistricts = state.districts;
            if (!currentDistricts.includes(action.payload)) {
                
                currentDistricts.push(action.payload);
                newState = {...state, district: currentDistricts};
                setItem("selectedDistricts", currentDistricts);
            }


            break;
        }

        case REMOVE_DISTRICT: {

            let currentDistricts = state.districts;
            if (currentDistricts.includes(action.payload)) {

                let updatedDistricts = currentDistricts.filter((districtID) => districtID !== action.payload);
                newState = {...state, districts: updatedDistricts};
                setItem("selectedDistricts", updatedDistricts);
            }

            break;
        }

        case LOAD_BINS_SUCCESS: {

            newState = {...state, bins: action.payload.body};

            // to many garbage bins potentially not saveable in localStorage
            setItem("bins", action.payload.body); 
            break;
        }

        case LOAD_BINS_ERROR: {

            break;
        }

        case REMOVE_BIN: {

            break;
        }

        case SET_POSITION: {
            
            setItem("position", action.payload);
            newState = {...state, position: action.payload};
            break;
        }

        case START_ROUTING: {
            newState = {...state, route: true};
            setItem("route", true);
            break;
        }

        case END_ROUTING: {

            let districts = [];
            let bins = [];
            let position = [];
            let route = false;
            
            newState = {
                districts: districts,
                bins: bins,
                position: position,
                route: route
            };

            // Reset local storage
            setItem("selectedDistricts", districts);
            setItem("bins", bins);
            setItem("position", position);
            setItem("route", route);

            // Clear geo-watcher
            if ("geolocation" in navigator) {
                navigator.geolocation.clearWatch();
            }

            break;
        }

        default:
            return state;
    }

    return newState;
}