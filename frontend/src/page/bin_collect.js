/*
 * @author Maksim Sandybekov
 * @date: 4.3.2020
 * 
 */

import React, { Component } from 'react'

import { connect } from 'react-redux';

// import Button from '../components/button';
import MapView from '../components/map'
import DistrictSelection from '../components/district';


/**
 * Render page for the collection routine.
 * 
 */
export class BinCollectPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            districtSelection: true,
        }
    }


    render() {


        // Render component
        return (
            <React.Fragment>
                <div className={"map" + (this.props.route? " active" : "")}>
                    <div className="overlay"/>
                    <MapView/>
                </div>

                <div className="interactive-elements">
                    <DistrictSelection/>
                   
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        districts: state.collect.districts,
        bins: state.collect.bins,
        position: state.collect.position,
        route: state.collect.route
    }
}


export default connect(mapStateToProps)(BinCollectPage);
