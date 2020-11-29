import React, { Component } from 'react';
import StatusBar from './StatusBar.js';

// TODO need table for selecting stock, logic for clicking button
export default class Select extends Component {
    render() {
        return (
            <div class='main'>
                <div class='result-title'>Step 1: Select a stock from our dataset</div>
                <div id='result-graph'>TODO</div>
                <div id='results-data'>TODO</div>
                <div class='stats'>TODO</div>
                <div id='go-back-button'>TODO</div>
                <div id='next-step-button'>TODO</div>
                <StatusBar/>
            </div>
        );
    }
}