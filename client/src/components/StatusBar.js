import React, { Component } from 'react';


// TODO buttons not hooked up
export default class StatusBar extends Component {
    render() {
        return (
            <div id='status-bar'>
                <div id='select'>SELECT</div>
                <div id='configure'>CONFIGURE</div>
                <div id='RESULT'>RESULT</div>
            </div>
        );
    } 
}