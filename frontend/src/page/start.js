/**
 * @author Maksim Sandybeikov
 * @date 5.3.2020
 */


import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

/**
 * Renders the starting page. Where the user is able to select the bins.
 * 
 */
export class StartPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({redirect: true});
        }, 1000);
    }

    renderRedirect(redirect) {
        return redirect? <Redirect to="/collect/districts"/> : null;
    }


    render() {
        return (
            <React.Fragment>

                {this.renderRedirect(this.state.redirect)}

                <div>
                    Welcome to the Garbage Network
                </div>

            </React.Fragment>
        )
    }
}

export default StartPage
