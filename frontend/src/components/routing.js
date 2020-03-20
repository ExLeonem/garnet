/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 */

// import React, { Component } from 'react'
import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import binIcon from '../icons/alt_bin_icon.png';


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

    // console.log(positions);

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

        const {map, bins} = this.props;

        console.log("Bins: ");
        console.log(bins);

        console.log("Inner position: ");
        console.log(this.props.position);

        let mappedBinPositions = [];
        bins.forEach(bin => {
            mappedBinPositions.push([bin.latitude, bin.longitude])
        })

        mappedBinPositions.push([this.props.position.latitude, this.props.position.longitude]);
        mappedBinPositions = mappedBinPositions.reverse();
        let leafletElement = L.Routing.control({

            waypoints: createWaypoints(mappedBinPositions),
            router: new L.Routing.OSRMv1({
                serviceUrl: process.env.REACT_APP_ROUTING_BACKEND
            }),
            createMarker: (i, waypoint, n) => {


                // Default icon for positio
                if (i == 0) {
                    return L.marker(waypoint.latLng);
                }

                
                // Bin icon for garbage bins
                let binIndicator = L.icon({
                    iconUrl: binIcon,
                    iconSize: [20, 30],
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                });

                return L.marker(waypoint.latLng, {
                    icon: binIndicator
                });
            },
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
