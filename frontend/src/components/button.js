/*
 * @author Maksim Sandybekov
 * @date: 4.3.2020
 * 
 */

import React from 'react'
import { CheckMark} from './icons'

/**
 * Renders a ciruclar button with an icon inside
 * 
 * @param {string} type - Which icon to use {check, close, ...} look into ./icons.js
 * @param {string} className - Additional class names to be add.
 * @param {callback} onClick - Callback for the onClick even
 */
let ButtonCircle =({type, className = null, onClick = () => {return null}}) => {

    let classes = "button-circular" + (className != null? " " + className : ""); 

    return (
        <div className={classes} onClick={() => onClick()}>
            <CheckMark/>
        </div>
    )
}


/**
 * Renders a mixed button, displaying text and a button.
 * 
 * @param {string} className - append to the already existing classes.
 * @param {callback} onClick - callback function for the onClick event
 * @param {string} children -  Text displayed by the button
 */
let ButtonMixed = ({className, onClick, children}) => {

    let style = "button" + (className? " " + className : "");
    let icon = "";

    return (
        <div className={style} onClick={onClick}>
            {children}
            <i className="icon">{icon}</i>
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
        <div className={style} onClick={() => onClick()}>
            {children}
        </div>
    )
}

export default ButtonText;
export {
    ButtonText,
    ButtonCircle,
    ButtonMixed
}