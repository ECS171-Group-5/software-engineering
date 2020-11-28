import React, { Component } from 'react';
import StatusBar from './components/StatusBar.js';

// TODO need table for selecting stock, logic for clicking button
export default class Select extends Component {
    render() {
        return (
            <div class='main'>
                <div class='result-title'>Step 1: Select a stock from our dataset</div>
                <div id='result-graph'>TODO</div>
                <div class='stats'>TODO</div>
                <StatusBar/>
            </div>
        );
    }
}