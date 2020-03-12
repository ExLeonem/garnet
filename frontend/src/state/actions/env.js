/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 */

import axios from 'axios';
import { LOAD_DISTRICTS_SUCCESS, LOAD_DISTRICTS_ERROR } from '../types/env'


 const loadDistricts = () => {
    // 

    let apiURL = process.env.REACT_APP_GARNET_BACKEND;

    return dispatch => {

        axios.get(apiURL, {
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            // succesfull request
            dispatch(loadDistrictsSuccess(res));
        }).catch(err => {
            // failed request
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

const loadDistrictsError = error => ({
    type: LOAD_DISTRICTS_ERROR,
    payload: {
        ...error
    }

});

 export {
     loadDistricts
 }