import React, { Component } from 'react'


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


export default Bin
