/*
 * @author Maksim Sandybekov
 * @date: 4.3.2020
 * 
 */

import React, { Component } from 'react'

import Button from '../components/button';
import MapView from '../components/map'


export class BinCollectPage extends Component {

    render() {

        // Update & track current position
        if ("geolocation" in navigator) {
        
            navigator.geolocation.getCurrentPosition((position) => {
                let newViewport = {
                    center: [position.coords.latitude, position.coords.longitude],
                    zoom: 15
                }

                // Set Viewport on current position
                this.setState({viewport: newViewport});
            });
        }

        // Render component
        return (
            <React.Fragment>
                
                <MapView/>

                <div className="interactive-elements">
                    <Button className="start" onClick={console.log("hey")}>Start</Button>
                </div>
            </React.Fragment>
        )
    }
}


export default BinCollectPage;
