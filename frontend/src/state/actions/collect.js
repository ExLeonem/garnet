/**
 * @author Maksim Sandybekov
 * @date 4.2.2020
 * 
 */

import superagent from 'superagent';

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


const loadBins = (districIds) => {

    let endpoint = process.env.REACT_APP_GARNET_BACKEND + 'getFilledTrashcans';
    return dispatch => {

        superagent.post(endpoint)
            .set('content-type', 'application/json')
            .send({'districts': districIds})
            .then(res => {
                console.log(res);
                dispatch(loadBinsSuccess(res));

            }).catch(err => {
                console.log(err);
                dispatch(loadBinsError(err));

            });
    }
}

const loadBinsSuccess = (bins) => ({
    type: LOAD_BINS_SUCCESS,
    payload: {
        ...bins
    }
});

const loadBinsError = error => ({
    type: LOAD_BINS_ERROR,
    payload: {
        ...error
    }
});

const removeBin = (binID) => {
    return {
        type: REMOVE_BIN,
        payload: binID
    }
}

const setPosition = (position) => {
    return {
        type: SET_POSITION,
        payload: position
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
    loadBins,
    removeBin,
    setPosition,
    startRouting,
    endRouting
}