/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 * 
 */


let initialState ={
    role: "Collector",
    equipment: {
        // Useable equpiment to collect certain bin-types
    },
    groupSize: 0, // Number of group members
};


export default function(state = initialState, action) {

    switch (action.type) {

        default:
            return state;
    }
}
