/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 */

import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


/**
 * Renders the state of the bin to collect.
 * 
 * @param {number} fillState - the amount of trash inside the bin in percent [0, 100]
 *  
 */
let BinCollectionState = ({fillState}) => {
    return (
        <div className="circle">

        </div>
    )
}


/**
 * Render a single in the list of bins to collect.
 * 
 * @param {number[]} position - The bin position given as latitude and longitude
 * @param {number} fillState - The amount of trash inside the bin in percent [0, 100]
 * 
 */
let Bin = ({position, fillState}) => {
    return (
        <div className="bin">
            <BinCollectionState/>
        </div>
    )
}


/**
 * Renders a list of objects as bins.
 * 
 * @param {Object} bins - Array of objects, each representing a bin. With {position: [lat, long], fillState: number} 
 */
let BinList = ({bins}) => {
    
}


/**
 * Renders the bins and thei'r filling state.
 * 
 */
export class BinView extends Component {

    renderRedirect(routeLocations) {
        return routeLocations? null : <Redirect to="/collect/districts"/>;
    }


    render() {
        return (
            <React.Fragment>
                {this.renderRedirect(this.props.route)}

                <div className="header">

                </div>

            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        route: state.collect.route
    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(BinView);



