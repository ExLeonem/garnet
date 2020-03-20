/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 */

// import axios from 'axios';
import superagent from 'superagent';
import { LOAD_DISTRICTS_SUCCESS, LOAD_DISTRICTS_ERROR } from '../types/env'


 const loadDistricts = () => {

    let endpoint = process.env.REACT_APP_GARNET_BACKEND + 'allFilledDistricts';
    return dispatch => {

        superagent.get(endpoint)
        .set('content-type', 'application/json')
        .then(res => {
            dispatch(loadDistrictsSuccess(res));

        }).catch(err => {
            dispatch(loadDistrictsError(err));

        });
    };
 }

 const loadDistrictsSuccess = districts => ({
    type: LOAD_DISTRICTS_SUCCESS,
    payload: {
        ...districts
    }
 });

const loadDistrictsError = error => {

    return {
    type: LOAD_DISTRICTS_ERROR,
    payload: {
        ...error
        }
    };
}

 export {
     loadDistricts
 }