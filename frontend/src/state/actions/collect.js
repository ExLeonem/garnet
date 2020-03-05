/**
 * @author Maksim Sandybekov
 * @date 4.2.2020
 * 
 */

import {
    ADD_DISTRICT,
    REMOVE_DISTRICT,
    REMOVE_BIN,

    START_ROUTING,
    END_ROUTING
} from '../types/collect';


// Add district for selection its bins 
const addDistrict = (districtID) => {
    return {
        type: ADD_DISTRICT,
        payload: districtID
    }
}


const removeDistrict = (districtID) => {
    return {
        type: REMOVE_DISTRICT,
        payload: districtID
    }
}

const removeBin = (binID) => {
    return {
        type: REMOVE_BIN,
        payload: binID
    }
}

const startRouting = () => {
    return {
        type: START_ROUTING,
        payload: null
    };
}

const endRouting = () => {
    return {
        type: END_ROUTING,
        payload: null
    };
}

export {
    addDistrict,
    removeDistrict,
    removeBin,
    startRouting,
    endRouting
}