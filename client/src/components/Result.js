import React, { Component } from 'react';
import StatusBar from './StatusBar';

// TODO need table for selecting stock, logic for clicking button
export default class Result extends Component {
    render() {
        return (
            <div className='main'>
                <div className='result-title'>Step 1: Select a stock from our dataset</div>
                <div id='result-graph'>TODO</div>
                <div id='results-data'>TODO</div>
                <div className='stats'>TODO</div>
                <div id='go-back-button'>TODO</div>
                <div id='next-step-button'>TODO</div>
                <StatusBar/>
            </div>
        );
    }
}
