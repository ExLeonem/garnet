/**
 * @author Maksim Sandybekov
 * @date 4.3.2020
 */

import React, { Component } from 'react'
import { Map, TileLayer, Marker} from 'react-leaflet';
import { connect } from 'react-redux';

import Routing from './routing';
import { setPosition } from '../state/actions/collect';

// Fallback if no access to geo-coordinates
const DEFAULT_POSITION = [47.672473, 9.173396];
const DEFAULT_VIEWPORT = {
    center: DEFAULT_POSITION,
    zoom: 15,
}


// Map Provider
// TODO: Check which ideally to use: https://leaflet-extras.github.io/leaflet-providers/preview/
const MAP_PROVIDER = {
    openTopo: {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    },
    openStreetmap: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
}

// Example points used to test render of route
const POS = [
    [47.674682, 9.180758],
    [47.673538, 9.184933],
    [47.676096, 9.180624]
]


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
            currentPosition: DEFAULT_POSITION,
            isMapInit: false
        }
    }

    componentWillMount() {
        
    }


    onClickReset = () => {
        this.setState({ viewport: DEFAULT_VIEWPORT })
    }
    
    onViewportChanged = (viewport) => {
        this.setState({ viewport })
    }

    saveMap = map => {
        this.map = map;
        this.setState({
            isMapInit: true
        })
    }

    
    render() {

        // Track current position if possible by the device
        if ("geolocation" in navigator) {
                
            navigator.geolocation.watchPosition((position) => {

                // Set current position in state
                this.props.setPosition(position.coords);

                let newViewport = {
                    center: [position.coords.latitude, position.coords.longitude],
                    zoom: 15
                }

                // Set Viewport & Position 
                this.setState({viewport: newViewport});
                this.setState({currentPosition: [position.coords.latitude, position.coords.longitude]})
            });
        } else {
            // Error message: Browser does not support geolocation

        }

        // Empty position: halt, cause not enabled
        if (this.props.position == []) {
            
        }


        return (
            <React.Fragment>
                <Map
                    onClick={this.onClickReset}
                    onViewportChanged={this.onViewportChanged}
                    viewport={this.state.viewport}
                    ref={this.saveMap}
                    animate={true}>
                    {/* <Marker  position={this.state.currentPosition} draggable={false}/> */}
                    {/* Render bin positions with path into the map */}
                    <TileLayer
                        attribution={MAP_PROVIDER.openStreetmap.attribution}
                        url={MAP_PROVIDER.openStreetmap.url}/>
                    {this.state.isMapInit && <Routing map={this.map} bins={POS} />}
                </Map>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentPosition: state.collect.position
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPosition: position => dispatch(setPosition(position))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
