/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 */

import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { addDistrict, removeDistrict, startRouting } from '../state/actions/collect';
import { loadDistricts } from '../state/actions/env';

import { ButtonText, ButtonCircle } from './button';
import { Add } from './icons';


// Usage for demo-case
let districtMapping = {
    "010": "Altstadt",
    "020": "Paradies",
    "030": "Petershausen-West",
    "035": "Petershausen-Ost",
    "040": "Königsbau",
    "050": "Allmansdorf",
    "060": "Staad",
    "070": "Fürstenberg",
    "080": "Wolmatingen",
    "090": "Industriegebiet",
    "100": "Egg",
    "110": "Litzelstetten",
    "120": "Dingelsdorf",
    "130": "Dettingen",
    "140": "Wallhausen"
};


/**
 * Renders a list of selectable districts.
 * 
 * @param {object[]} districts - An array of of district objects [{id: number, name: string}]
 */
export class DistrictSelection extends Component {

    constructor(props) {
        super(props);

        // Eventually better in component will mount
        let selectedDistricts = {};
        props.districts.forEach((dist) => {

            let valueToSet = false;
            if (this.props.selectedDistricts.includes(dist.id)) {
                valueToSet = true
            } 

            selectedDistricts[dist.id] = valueToSet;
        });

        this.state = {
            countSelected: this.props.selectedDistricts.length,
            selectedIds: selectedDistricts
        };
    }


    /**
     * Render districts into a list of selectable options
     * 
     * @param {object[]} districts - objects of districts [{id: number, name: string}]
     */
    renderDistricts(districts, selectedDistricts) {

        let selectables = [];
        districts.forEach(dist => {

            let id = dist.id;
            let callback = () => {
                let updatedState = this.state.selectedIds;

                let count = this.state.countSelected;
                if (updatedState[id]) {
                    count--;
                    this.props.removeDistrict(dist.id);
                } else {
                    count++;
                    this.props.addDistrict(dist.id);
                }
                this.setState({countSelected: count});
                
                updatedState[id] = !updatedState[id];
                this.setState({selectedIds: updatedState})
            }


            let toAdd = (
                <li key={id}>
                    <ButtonText className={this.state.selectedIds[id]? "active": ""} onClick={callback}>
                        <i className="add"><Add/></i>
                        {dist.name}
                    </ButtonText>
                </li>
            );

            selectables.push(toAdd);
        });

        return selectables;
    }


    // Redirects to the routing view
    renderRedirect(routeLocations) {
        
        return routeLocations? <Redirect to="/collect/route"/> : null;
    }

    
    render() {

        // Load districts if they are not already available
        let districts = this.props.districts;
        if (districts.length === 0 || !districts) {

            this.props.loadDistricts();
        }

        return (
            <React.Fragment>
                {this.renderRedirect(this.props.route)}

                <div className="header">
                    <p>
                        {this.state.countSelected > 0? "Ausgewählte Bezirke" : "Wähle ein oder mehrere Bezirke."}
                        <i className={"selected-districts" + (this.state.countSelected > 0? " active" : "")}>{this.state.countSelected}</i>
                    </p>
                    <ButtonCircle onClick={this.props.startRouting}/>
                </div>

                <ul className="districts">
                    {this.renderDistricts(districts, this.props.selectedDistricts)}
                </ul>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        districts: state.env.districts,
        selectedDistricts: state.collect.districts,
        route: state.collect.route
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loadDistricts: () => dispatch(loadDistricts()),
        addDistrict: id => dispatch(addDistrict(id)),
        removeDistrict: id => dispatch(removeDistrict(id)),
        startRouting: () => dispatch(startRouting())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DistrictSelection)
