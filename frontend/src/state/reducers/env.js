/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 */

import { LOAD_DISTRICTS_SUCCESS, LOAD_DISTRICTS_ERROR } from '../types/env';


let initialState = {
    districts: [], // all districts
    active: [], // List of active collectors (objects)
}


export default function(state = initialState, action) {

    switch (action.type) {

        case LOAD_DISTRICTS_SUCCESS: {
            // Successfully loaded
                
            // Only for demo-case
            let districtMapping = {
                "1": "Altstadt",
                "2": "Paradies",
                "3": "Petershausen-West",
                "4": "Petershausen-Ost",
                "5": "Königsbau",
                "6": "Allmansdorf",
                "7": "Staad",
                "8": "Fürstenberg",
                "9": "Wolmatingen",
                "10": "Industriegebiet",
                "11": "Egg",
                "12": "Litzelstetten",
                "13": "Dingelsdorf",
                "14": "Dettingen",
                "15": "Wallhausen"
            };

            let data = action.payload.body;
            let mapped = data.map(dist => ({id: dist, name: districtMapping[dist]}));

            return {...state, districts: mapped};
        }

        default:
            return state;
    }
}