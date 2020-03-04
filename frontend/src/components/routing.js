/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 */

import React, { Component } from 'react'
import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';


// TODO: Add track of current position + remove waypoints.

/**
 * Creates an array of latLongs useable by the leaflet-routing-machine.
 * 
 * @param {array[]} positions 
 */
const createWaypoints = (positions) => {

    // Catch non-array types
    if (!(positions instanceof Array)) {
        return [];
    }

    console.log(positions);

    let waypoints = [];
    positions.forEach(pos => {
        waypoints.push(L.latLng(pos[0], pos[1]));
    });
    
    return waypoints;
}


/**
 * Creates a route inside a map.
 * 
 * @param {array[]} positions - An array of arrays with [lat, long]. [[lat, long], [lat, long]]
 * 
 */
export class Routing extends MapLayer {

    createLeafletElement() {

        const {map, positions} = this.props;
        let leafletElement = L.Routing.control({

            waypoints: createWaypoints(positions),

            lineOptions: {
                styles: [{
                    color: "blue",
                    opacity: 0.6,
                    weight: 4
                }]
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectionRoute: false,
            showAlternatives: false
        }).addTo(map.leafletElement);

        return leafletElement.getPlan();
    }
}

export default withLeaflet(Routing);
