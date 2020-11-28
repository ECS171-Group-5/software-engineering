import React, { Component } from 'react';


// TODO button is not hooked up

export default class HeaderBar extends Component {
    render() {
        return (
            <div id="homepage">
                <h1>Welcome to Smart Stock</h1>
                <h3>A Machine Learning powered tool powered by NASDAQ stocks</h3>
                <button>Get Started</button> 
            </div>
        );
    }
}