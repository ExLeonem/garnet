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
                "10": "Altstadt",
                "20": "Paradies",
                "30": "Petershausen-West",
                "35": "Petershausen-Ost",
                "40": "Königsbau",
                "50": "Allmansdorf",
                "60": "Staad",
                "70": "Fürstenberg",
                "80": "Wolmatingen",
                "90": "Industriegebiet",
                "100": "Egg",
                "110": "Litzelstetten",
                "120": "Dingelsdorf",
                "130": "Dettingen",
                "140": "Wallhausen"
            };

            let data = action.payload.data;
            let mapped = data.map(dist => ({id: dist.id, name: districtMapping[dist.district_number]}));

            return {...state, districts: mapped};
            break;
        }

        default:
            return state;
    }
}