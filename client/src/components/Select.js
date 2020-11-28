import React, { Component } from 'react';
import StatusBar from './components/StatusBar.js';

// TODO need table for selecting stock, logic for clicking button
export default class Select extends Component {
    render() {
        return (
            <div class='main'>
                <div class='main-title'>Step 1: Select a stock from our dataset</div>
                <div id='stock-table'>TODO</div>
                <div id='confirm-button'>Confirm</div>
                <StatusBar/>
            </div>
        );
    }
}