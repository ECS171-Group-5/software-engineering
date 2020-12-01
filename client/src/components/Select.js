import React, { Component } from 'react';
import StatusBar from './StatusBar';
import StockTable from './StockTable';

export default class Select extends Component {
    render() {
        return (
            <>
                <StockTable/>
                <StatusBar index="0"/>
            </>
        );
    }
}