/**
 * @author Maksim Sandybeikov
 * @date 5.3.2020
 */


import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

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
        }, 5000);
    }

    renderRedirect(redirect) {
        return redirect? <Redirect to="/collect/districts"/> : null;
    }


    render() {
        return (
            <React.Fragment>

                {this.renderRedirect(this.state.redirect)}

                <div className="welcome">
                    <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="47" height="47" fill="#EEF5FD"/>
                        <path d="M38 13L12 13L12 40L38 13Z" fill="#899CDF"/>
                        <rect x="8" y="7" width="30" height="6" fill="white"/>
                        <rect x="12" y="7" width="33" height="6" transform="rotate(90 12 7)" fill="white"/>
                    </svg>

                    <h3>Welcome to GarNet.</h3>
                </div>
            </React.Fragment>
        )
    }
}

export default StartPage
