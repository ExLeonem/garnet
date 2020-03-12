/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 */

import { LOAD_DISTRICTS_SUCCESS, LOAD_DISTRICTS_ERROR } from '../types/env';


let initialState = {
    districts: [
        {id: 1, name: "Petershausen-Ost"},
        {id: 2, name: "Königsbau"},
        {id: 3, name: "Allmannsdorf"},
        {id: 4, name: "Staad"},
        {id: 5, name: "Altstadt"},
        {id: 6, name: "Paradies"},
        {id: 7, name: "Petershausen-West"},
        {id: 8, name: "Königsbau"},
        {id: 9, name: "Fürstenberg"},
        {id: 10, name: "Wollmatingen"},
        {id: 11, name: "Industriegebiet"},
        {id: 12, name: "Egg"},
        {id: 13, name: "Litzelstetten"},
        {id: 14, name: "Dingelsdorf"},
        {id: 15, name: "Dettingen"},
        {id: 16, name: "Wallhausen"}
    ], // all districts
    active: [], // List of active collectors (objects)
}



export default function(state = initialState, action) {

    switch (action.type) {

        case LOAD_DISTRICTS_SUCCESS: {
            // Successfully loaded

            break;
        }

        case LOAD_DISTRICTS_ERROR: {
            // Error loading, display hint and reload button (with timeout)

            break;
        }

        default:
            return state;
    }
}