import React, { Component } from 'react';
import StatusBar from './components/StatusBar.js';

export default class Configure extends Component {
    render() {
        return (
            <div class='main'>
                <div class='main-title'>Step 2: Select parameters in the machine learning model</div>
                <div id='parameter-table'>TODO</div>
                <div id='show-result-button'>Show Result</div>
                <StatusBar/>
            </div>
        );
    }
}