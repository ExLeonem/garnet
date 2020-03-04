/**
 * @author Maksim Sandybekov
 * @date 4.2.2020
 * 
 */

import {
    ADD_DISTRICT,
    REMOVE_DISTRICT,
    REMOVE_BIN
} from '../types/collect';


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


export {
    addDistrict,
    removeDistrict,
    removeBin
}