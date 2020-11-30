import React, { Component } from 'react';

export default class StatusBar extends Component {
    render() {
        return (
            <div id='status-bar'>
                <div id='select'>SELECT</div>
                <div id='result'>RESULT</div>
            </div>
        );
    } 
}