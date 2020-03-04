/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 */

import React, { Component } from 'react'
import { Map, TileLayer, Marker} from 'react-leaflet';


// Fallback if no access to geo-coordinates
const DEFAULT_POSITION = [47.672473, 9.173396];
const DEFAULT_VIEWPORT = {
    center: DEFAULT_POSITION,
    zoom: 15,
}


// Map Provider
// TODO: Check which ideally to use: https://leaflet-extras.github.io/leaflet-providers/preview/
const MAP_PROVIDER = {
    open_topo: {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    },
    open_streetmap: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
}


/**
 * 
 * Renders the map displaying the bin locations and the path to take for optimal time efficency.
 * 
 * @param {*}
 * 
 */
class MapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: DEFAULT_VIEWPORT,
            current_position: DEFAULT_POSITION
        }
    }


    onClickReset = () => {
        this.setState({ viewport: DEFAULT_VIEWPORT })
    }
    
    onViewportChanged = (viewport) => {
        this.setState({ viewport })
    }

    
    render() {
        return (
            <React.Fragment>
                <Map
                    onClick={this.onClickReset}
                    onViewportChanged={this.onViewportChanged}
                    viewport={this.state.viewport}
                    animate={true}>
                    <Marker  position={this.state.current_position} draggable={false} alt={"Aktuelle Position"}/>
                    {/* Render bin positions with path into the map */}
                    <TileLayer
                        attribution={MAP_PROVIDER.open_streetmap.attribution}
                        url={MAP_PROVIDER.open_streetmap.url}/>
                </Map>
            </React.Fragment>
        )
    }
}

export default MapView
