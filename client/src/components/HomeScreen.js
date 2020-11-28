import React, { Component } from 'react';


// TODO button is not hooked up

export default class HeaderBar extends Component {
    render() {
        return (
            <div id="homepage">
                <div id="homepage-content">
                    <h1>Welcome to Smart Stock</h1>
                    <p>A Machine Learning powered tool powered by NASDAQ stocks</p>
                    <button>Get Started</button>
                </div> 
            </div>
        );
    }
}