/*
 * @author Maksim Sandybekov
 * @date: 4.3.2020
 * 
 */

import React, { Component } from 'react'

import { connect } from 'react-redux';
import { loadBins } from '../state/actions/collect';
import { Switch, Route } from 'react-router-dom';

import MapView from '../components/map'
import DistrictSelection from '../components/district';
import BinView from '../components/bin';

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

    componentWillMount() {
        if (this.props.bins === []) {
            this.props.loadBins(this.props.districts);
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className={"map" + (this.props.route? " active" : "")}>
                    <div className="overlay"/>
                    <MapView/>
                </div>

                <div className="interactive-elements">

                     <Switch>
                         <Route path="/collect/districts">
                             <DistrictSelection/>
                         </Route>
                         <Route path="/collect/route">
                            <BinView/>
                         </Route>
                     </Switch>

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

const mapDispatchToProps = dispatch => {
    return {
        loadBins: districtIds => dispatch(loadBins(districtIds))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BinCollectPage);
