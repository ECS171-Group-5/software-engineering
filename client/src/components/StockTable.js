import React, { Component } from 'react';
import { Table } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const sampleData = [
    {company:'Zoom', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom2', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom2', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom2', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom2', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom2', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom2', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
]

export default class StockTable extends Component {
    constructor() { 
        super();
        this.state = {
            selected:new Array(sampleData.length).fill(false)
        };
        this.handleClick = this.handleClick.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    /* commented out because was reaching max update limit, if optimized can use */
    handleHover = (index, highlight) => { 
    //     let newSelected = new Array(sampleData.length).fill(false);
    //     if (highlight) { 
    //         newSelected[index] = true;
    //     }
    //     this.selected = newSelected;
    //     this.setState({
    //         selected:newSelected
    //     })
    }

    handleClick = (event, index) => {
        let newSelected = new Array(sampleData.length).fill(false);
        newSelected[index] = true;
        this.selected = newSelected;
        this.setState({
            selected:newSelected
        })
    };

    /* Function returns if a row of index i is selected */
    isSelected = (i) => {
        return this.state.selected[i];
    };

    render() {
        return (
            <div className='tableContainer'>

                <div className='table-title medium'>Step 1: Select a stock from our dataset</div>

                <Paper className='table-main'>
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
                            {sampleData.map((row, i) => {
                                const isItemSelected = this.isSelected(i);

                                return (
                                    <TableRow
                                        key={i}
                                        onMouseEnter={this.handleHover(i, true)}
                                        onMouseLeave={this.handleHover(i, false)}
                                        onClick={(event) => this.handleClick(event, i)}
                                        className={isItemSelected ? 'table-row-selected' : 'table-row-unselected'}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.company}
                                        </TableCell>
                                        <TableCell align="right">{row.nasdaq}</TableCell>
                                        <TableCell align="right">{row.startDate}</TableCell>
                                        <TableCell align="right">{row.endDate}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>

                <div id='confirm-button-wrapper'>
                    <div id='confirm-button'>Confirm</div>
                </div>
            </div>
        );
    }
}