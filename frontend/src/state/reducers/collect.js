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
    SET_LOCATION_ID,
    START_ROUTING,
    END_ROUTING,
    RESET_MAP
} from '../types/collect';

import { getItem, setItem } from './local_storage';


let initialState = {
    districts: getItem("selectedDistricts", []), // selected districts to use for collection
    bins: getItem("bins", []), // array of {id: id, position: [lat, long], fillState: fillState}
    position: getItem("position", []), // current position
    locationId: getItem("locationId", null), // Id of geolocation
    route: getItem("route", false), // wether or not to start routing
    mapKey: getItem("mapKey", Math.random()),
    tileKey: getItem("tileKey", Math.random()),
}

// Fallback if no access to geo-coordinates
const DEFAULT_POSITION = [47.672473, 9.173396];
const DEFAULT_VIEWPORT = {
    center: DEFAULT_POSITION,
    zoom: 15,
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

            let route = state.route;
            if (state.position !== []) {
                route = true;
            }

            newState = {...state, bins: action.payload.body, route: route};

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
            
            let route = state.route;
            if (state.bins !== []) {
                route = true;
            }

            let position = action.payload;
            setItem("position", position);
            newState = {...state, position: position};
            break;
        }

        case SET_LOCATION_ID: {

            let id = action.payload;
            setItem("locationId", id);
            newState = {...state, locationId: id};
            break;
        }

        case RESET_MAP: {

            let newKey = Math.random();
            newState = {...state, mapKey: newKey};
            setItem("mapKey", newKey);
            break;
        }

        case START_ROUTING: {

            newState = {...state, route: true};
            setItem("route", true);
            break;
        }

        case END_ROUTING: {

            // Default values
            let districts = [];
            let bins = [];
            let position = [];
            let route = false;
            let newKey = Math.random();
            
            newState = {
                districts: districts,
                bins: bins,
                position: position,
                route: route,
                mapKey: newKey
            };

            // Reset local storage
            setItem("selectedDistricts", districts);
            setItem("bins", bins);
            setItem("position", position);
            setItem("route", route);

            // Clear geo-watcher
            if ("geolocation" in navigator) {
                navigator.geolocation.clearWatch(state.locationId);
            }
            setItem("locationId", null);

            // Reset Map key
            setItem("mapKey", newKey);

            break;
        }

        default:
            return state;
    }

    return newState;
}