import React, { Component } from 'react';
import { Table } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import axios from 'axios';

// const sampleData = [
//     {company:'Zoom', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom2', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom3', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom4', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom5', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom6', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom7', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom8', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom9', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
//     {company:'Zoom10', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
// ]

export default class StockTable extends Component {
    constructor() { 
        super();
        this.state = {
            selected: null,
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    /* commented out because was reaching max update limit, if optimized can use */
    handleHover = (index, highlight) => { 
        // let newSelected = new Array(sampleData.length).fill(false);
        // if (highlight) { 
        //     newSelected[index] = true;
        // }
        // this.selected = newSelected;
        // this.setState({
        //     selected:newSelected
        // })
    }

    handleClick = (event, index) => {
        // let newSelected = new Array(sampleData.length).fill(false);
        // newSelected[index] = true;
        // this.selected = newSelected;
        // this.setState({
        //     selected:newSelected
        // });

        this.setState({
            selected:this.state.data[index].symbol
        });
    };

    /* Function returns if a row of index i is selected */
    isSelected = (i) => {
        // return this.state.selected[i];
        return this.state.selected===this.state.data[i].symbol;
    };


    componentDidMount() {
        axios.get('/api/getAllRows').then(res => {
            this.setState((state, props) => ({
                data: res.data
            }));
        });
    }

    render() {
        return (
            <div className='tableContainer'>

                <div className='table-title medium'>Select a stock from our dataset</div>

                <Paper className='table-main' height="100%">
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow className='table-head'>
                                <TableCell>COMPANY</TableCell>
                                <TableCell align='right'>NASDAQ</TableCell>
                                <TableCell align='right'>START DATE</TableCell>
                                <TableCell align='right'>END DATE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map((row, i) => {
                                const isItemSelected = this.isSelected(i);
                                const startDate = String(row.month).padStart(2,'0')+'-'+row.day+'-'+row.year;
                                const endDate = String(row.month+3>12?row.month-9:row.month+3).padStart(2,'0')+'-'+String(row.day).padStart(2, '0')+'-'+row.year;

                                return (
                                    <TableRow
                                        key={i}
                                        onMouseEnter={this.handleHover(i, true)}
                                        onMouseLeave={this.handleHover(i, false)}
                                        onClick={(event) => this.handleClick(event, i)}
                                        className={isItemSelected ? 'table-row-selected' : 'table-row-unselected'}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.symbol}
                                        </TableCell>
                                        <TableCell align="right">{row.symbol}</TableCell>
                                        <TableCell align="right">{startDate}</TableCell>
                                        <TableCell align="right">{endDate}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <div className='button-wrapper'>
                    <Link to={{
                        pathname: "/Result",
                        state: {
                            stock: this.state.selected?this.state.selected:"AAPL"
                        }
                    }}>
                        <button id='confirm-button' className="medium">Confirm</button>
                    </Link>
                </div>
            </div>
        );
    }
}