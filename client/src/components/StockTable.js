import React, { Component } from 'react';
import { Table } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@material-ui/core';

const titleRow = ['COMPANY', 'NASDAQ', 'START DATE', 'END DATE'];

const sampleData = [
    {company:'Zoom', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
    {company:'Zoom', nasdaq:'ZM', startDate:'2019-04-30', endDate:'2020-07-31'},
]

export default class StockTable extends Component {
    render() {
        return (
            <div class='main-table'>

                <div class='main-title'>Step 1: Select a stock from our dataset</div>

                <Table className='main-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>COMPANY</TableCell>
                            <TableCell align="right">NASDAQ</TableCell>
                            <TableCell align="right">START DATE</TableCell>
                            <TableCell align="right">END DATE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleData.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.company}
                                </TableCell>
                                <TableCell align="right">{row.nasdaq}</TableCell>
                                <TableCell align="right">{row.startDate}</TableCell>
                                <TableCell align="right">{row.endDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div id='confirm-button'>Confirm</div>
            </div>
        );
    }
}