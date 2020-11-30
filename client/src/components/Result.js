import React, { Component } from 'react';
import StatusBar from './StatusBar';
import {Link} from 'react-router-dom';
import { TableContainer } from '@material-ui/core';
import axios from 'axios';

// TODO need table for selecting stock, logic for clicking button
export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        axios.get(`/api/getRow/${this.props.location.state.stock}`).then(res => {
            this.setState((state, props) => ({
                data: res.data
            }));
        });
    }

    render() {
        return (
            <>
                <div className="tableContainer">
                    <div className="resultTopContainer">
                        <div className="resultTopLeftContainer">
                            <div className='result-title medium'>{this.props.location.state.stock}</div>
                            <div id="graphContainer">container</div>
                        </div>
                        <div className="resultTopRightContainer">{this.state.data.map((row, i) => {
                                const startDate = String(row.month).padStart(2,'0')+'-'+row.day+'-'+row.year;
                                const endDate = String(row.month+3>12?row.month-9:row.month+3).padStart(2,'0')+'-'+String(row.day).padStart(2, '0')+'-'+row.year;
                                const startPrice = row.stockPrice;
                                const endPrice = 500; // insert
                                const quarterPrice = 650; // insert
                                const yearPrice = 1000; // insert
                                const priceChange = (endPrice-startPrice).toFixed(2);

                                return (
                                    <div key={i}>
                                        <div className="textWithDash">
                                            <div className="smallText bold">SELECTED PERIOD&emsp;</div>
                                            <div className="divider"></div>
                                        </div>

                                        <div className="spaceBetween resultText medium lightBlueFont" style={{marginTop: "5px"}}>
                                            <div>{startDate}</div>
                                            <div>{endDate}</div>
                                        </div>
                                        <div className="spaceBetween smallText regular darkBlueFont">
                                            <div>START DATE</div>
                                            <div>END DATE</div>
                                        </div>

                                        <div className="spaceBetween resultText medium" style={{marginTop: "5px"}}>
                                            <div>${startPrice.toFixed(2)}</div>
                                            <div>${endPrice.toFixed(2)}</div>
                                        </div>
                                        <div className="spaceBetween smallText regular darkBlueFont">
                                            <div>START PRICE</div>
                                            <div>END PRICE</div>
                                        </div>

                                        <div className="spaceBetween resultText medium greenFont" style={{marginTop: "5px"}}>
                                            <div>{priceChange>=0?`$${priceChange}`:`-$${Math.abs(priceChange)}`}</div>
                                            <div>{((endPrice-startPrice)/startPrice*100).toFixed(2)}%</div>
                                        </div>
                                        <div className="spaceBetween smallText regular darkBlueFont">
                                            <div>PRICE CHANGE</div>
                                            <div>PRICE PERCENTAGE CHANGE</div>
                                        </div>


                                        <div className="textWithDash">
                                            <div className="smallText bold">Predictions&emsp;</div>
                                            <div className="divider"></div>
                                        </div>

                                        <div className="spaceBetween resultText medium pinkFont" style={{marginTop: "5px"}}>
                                            <div>${quarterPrice.toFixed(2)}</div>
                                            <div>{((quarterPrice-startPrice)/startPrice*100).toFixed(2)}%</div>
                                        </div>
                                        <div className="spaceBetween smallText regular darkBlueFont">
                                            <div>STOCK PRICE IN ONE QUARTER</div>
                                            <div>PRICE PERCENTAGE CHANGE</div>
                                        </div>

                                        <div className="spaceBetween resultText medium greenFont" style={{marginTop: "5px"}}>
                                            <div>${yearPrice.toFixed(2)}</div>
                                            <div>{((yearPrice-startPrice)/startPrice*100).toFixed(2)}%</div>
                                        </div>
                                        <div className="spaceBetween smallText regular darkBlueFont">
                                            <div>STOCK PRICE IN ONE YEAR</div>
                                            <div>PRICE PERCENTAGE CHANGE</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='button-wrapper'>
                        <Link to='Select'>
                            <button id='go-back-button' className="medium">Go Back</button>
                        </Link>
                    </div>
                </div>
                <StatusBar index="2"/>
            </>
        );
    }
}
