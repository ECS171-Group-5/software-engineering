import React, { Component } from 'react';
import {Link} from 'react-router-dom'


// TODO button is not hooked up

export default class Home extends Component {
    render() {
        return (
            <div id="homepage">
                <h1 id="homeTitle" className="medium">Welcome to Smart Stock</h1>
                <p id="homeSubtitle" className="regular">A Machine Learning powered tool powered by NASDAQ stocks</p>
                <Link to="/Select">
                    <button id="homeButton" className="medium">Get Started</button>
                </Link>
            </div>
        );
    }
}