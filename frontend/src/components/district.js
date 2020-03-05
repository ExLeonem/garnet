/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';

import { LOAD_DISTRICTS } from '../state/types/env';


/**
 * Renders a list of selectable districts.
 * 
 * @param {object[]} districts - An array of of district objects [{id: number, name: string}]
 */
export class DistrictSelection extends Component {


    /**
     * Render districts into a list of selectable options
     */
    renderDistricts = districts => {


        let selectables = [];
        districts.forEach(dist => {

            let toAdd = (<li></li>);
        });


        return selectables;
    }

    
    render() {

        // Load districts if they are not already available
        let districts = this.props.districts;
        if (districts.length == 0 || !districts) {

            this.props.loadDistricts();
        }

        return (
            <ul className="districts">
                {this.renderDistricts(districts)}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        districts: state.env.districts
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loadDistricts: () => dispatch({type: LOAD_DISTRICTS})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DistrictSelection)
