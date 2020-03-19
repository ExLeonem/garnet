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

        console.log(apiURL);

        axios.get(apiURL + "allDistricts", 
        {
            crossDomain: "true",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            // succesfull request
            console.log("success: ");
            console.log(res);
            dispatch(loadDistrictsSuccess(res));
        }).catch(err => {
            // failed request
            console.log("error: ");
            console.log(err);

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
    console.log(error);

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