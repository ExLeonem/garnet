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
