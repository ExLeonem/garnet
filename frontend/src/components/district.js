/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 */

import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { LOAD_DISTRICTS } from '../state/types/env';
import { addDistrict, removeDistrict, startRouting } from '../state/actions/collect';

import { ButtonText, ButtonCircle } from './button';
import { Add } from './icons';



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
            selectedDistricts[dist.id] = false;
        });

        this.state = {
            countSelected: 0,
            selectedIds: selectedDistricts
        };
    }


    /**
     * Render districts into a list of selectable options
     * 
     * @param {object[]} districts - objects of districts [{id: number, name: string}]
     */
    renderDistricts = districts => {

        let selectables = [];
        districts.forEach(dist => {

            let id = dist.id;
            let callback = () => {
                let updatedState = this.state.selectedIds;

                let count = this.state.countSelected;
                if (updatedState[id]) {
                    count--;
                    this.props.removeDistrict(id);
                } else {
                    count++;
                    this.props.addDistrict(id);
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
    renderRedirect = routeLocations => {
        
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
                    <p>Wähle ein oder mehrere Bezirke.
                        <i className={"selected-districts" + (this.state.countSelected > 0? " active" : "")}>{this.state.countSelected}</i>
                    </p>
                    <ButtonCircle onClick={this.props.startRouting}/>
                </div>

                <ul className="districts">
                    {this.renderDistricts(districts)}
                </ul>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        districts: state.env.districts,
        route: state.collect.route
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loadDistricts: () => dispatch({type: LOAD_DISTRICTS}),
        addDistrict: id => dispatch(addDistrict(id)),
        removeDistrict: id => dispatch(removeDistrict(id)),
        startRouting: () => dispatch(startRouting())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DistrictSelection)
