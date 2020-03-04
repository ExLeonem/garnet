/*
 * @author Maksim Sandybekov
 * @date: 4.3.2020
 * 
 */

import React, { Component } from 'react'

class Button extends Component {
    render() {

        let className = "button" + (this.props.className? " " + this.props.className : "");

        return (
            <div className={className} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}

export default Button;