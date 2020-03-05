/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 */


let initialState = {
    districts: [], // all districts
    active: [], // List of active collectors (objects)
}



export default function(state = initialState, action) {

    switch (action.type) {

        default:
            return state;
    }

    return state;
}