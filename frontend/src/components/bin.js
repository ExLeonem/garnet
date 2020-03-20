/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 */

import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ButtonText } from '../components/button';
import { endRouting, loadBins } from '../state/actions/collect';


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
let Bin = ({id, position, fillState}) => {
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
let BinList = ({children}) => {

    let bins = children.map(bin => <Bin key={bin.id}/>)
    
    return (
        <ul className="bin-list">
            
        </ul>
    );
}


/**
 * Renders the bins and thei'r filling state.
 * 
 */
export class BinView extends Component {

    renderRedirect(routeLocations) {
        return routeLocations? null : <Redirect to="/collect/districts"/>;
    }

    componentWillMount() {

        console.log(this.props.districts);

        this.props.loadBins(this.props.districts);
    }


    render() {
        return (
            <React.Fragment>
                {this.renderRedirect(this.props.route)}

                <div className="header">Sammelweg</div>
                <BinList>{this.props.bins}</BinList>

                <ButtonText onClick={() => this.props.endRouting()}>Tour Beenden</ButtonText>

            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        route: state.collect.route,
        districts: state.collect.districts,
        bins: state.collect.bins,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        endRouting: () => dispatch(endRouting()),
        loadBins: (districtIds) => dispatch(loadBins(districtIds))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(BinView);



