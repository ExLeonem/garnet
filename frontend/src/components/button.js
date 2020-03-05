/*
 * @author Maksim Sandybekov
 * @date: 4.3.2020
 * 
 */

import React, { Component } from 'react'
import { CheckMark } from './icons'

/**
 * Renders a ciruclar button with an icon inside
 * 
 * @param {string} type - Which icon to use {check, close, ...} look into ./icons.js
 * @param {callback} onClick - Callback for the onClick even
 */
let ButtonCircle =({type, onClick}) => {

    return (
        <div className="button-circular">
            <CheckMark/>
        </div>
    )
}


/**
 * Renders a regular text button.
 * 
 * @param {string} className - additional class names to append
 * @param {callback} onClick - callback for the onClick method
 * @param {string} children - Button text to display 
 */
let ButtonText = ({className, onClick, children}) => {

    let style = "button" + (className? " " + className : "");

    return (
        <div className={style} onClick={onClick}>
            {children}
        </div>
    )
}

export default ButtonText;
export {
    ButtonText,
    ButtonCircle
}