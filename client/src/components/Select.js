import React, { Component } from 'react';
import StatusBar from './StatusBar';
import StockTable from './StockTable';

// TODO need table for selecting stock, logic for clicking button
export default class Select extends Component {
    render() {
        return (
            <div class='main'>
                <StockTable/>
                <StatusBar/>
            </div>
        );
    }
}