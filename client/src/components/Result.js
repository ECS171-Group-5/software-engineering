import React, { Component } from 'react';
import StatusBar from './StatusBar';
import LineChart from './LineChart';
import {Link} from 'react-router-dom';
import axios from 'axios';
import * as d3 from "d3";

// TODO need table for selecting stock, logic for clicking button
export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            timeSeries: [],
            prediction: -1
        };
    }

    componentDidMount() {
        axios.get(`/api/getRow/${this.props.location.state.stock}`).then(res => {
            this.setState((state, props) => ({
                data: res.data
            }));
        });

        axios.get(`/api/getPrediction/${this.props.location.state.stock}`).then(res => {
            this.setState((state, props) => ({
                prediction: res.data[0].result
            }));
        });

        const url = `/api/getTimeSeries/${this.props.location.state.stock}`;
        axios.get(url).then(res => {
            var prices = [];
            var priceDict = {};

            var priceData = res.data["Time Series (Daily)"];
            for (var d in priceData) {
              var a = priceData[d];
              priceDict[d] = {Date: d,
                Open: parseFloat(parseFloat(a["1. open"]).toFixed(2)),
                High: parseFloat(parseFloat(a["2. high"]).toFixed(2)),
                Low: parseFloat(parseFloat(a["3. low"]).toFixed(2)),
                Close: parseFloat(parseFloat(a["4. close"]).toFixed(2))
              };
            }
        
            for (d in priceDict) {
              prices.push(priceDict[d]);
            }
        
            prices = prices.slice(0,253);
            prices = prices.reverse();

            var dateFormat = d3.timeParse("%Y-%m-%d");
            for (var i = 0; i < prices.length; i++) {
                prices[i]['Date'] = dateFormat(prices[i]['Date'])
            }

            console.log(prices);

            this.setState((state, props) => ({
                timeSeries: prices
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
                            <div id="graphContainer">
                                <LineChart 
                                    data={this.state.timeSeries} 
                                    startDate={this.state.data.length>0?String(this.state.data[0].month).padStart(2,'0')+'-'+this.state.data[0].day+'-'+this.state.data[0].year:"09-30-2020"}
                                    endDate={this.state.data.length>0?String(this.state.data[0].month+3>12?this.state.data[0].month-9:this.state.data[0].month+3).padStart(2,'0')+'-'+String(this.state.data[0].day).padStart(2, '0')+'-'+this.state.data[0].year:"12-31-2020"}
                                    prediction={1000}
                                />
                            </div>
                        </div>
                        <div className="resultTopRightContainer">{this.state.data.map((row, i) => {
                                const startDate = String(row.month).padStart(2,'0')+'-'+String(row.day).padStart(2, '0')+'-'+row.year;
                                const endDate = String(row.month+3>12?row.month-9:row.month+3).padStart(2,'0')+'-'+String(row.day).padStart(2, '0')+'-'+row.year;
                                const startPrice = row.stockPrice;
                                console.log(this.state.timeSeries.length>0?this.state.timeSeries[this.state.timeSeries.length-1]:startPrice);
                                var currentPrice = this.state.timeSeries.length>0?this.state.timeSeries[this.state.timeSeries.length-1].Close:startPrice;
                                var prediction = this.state.prediction;
                                var quarterPrice = startPrice;
                                if (prediction!==-1) { // check if prediction has loaded from database
                                    if (prediction===0)
                                        quarterPrice = startPrice*1.1;
                                    else if (prediction===1)
                                        quarterPrice = startPrice*0.9;
                                    else if (prediction===2)
                                        quarterPrice = startPrice;
                                }
                                var priceChange = (currentPrice-startPrice).toFixed(2);

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
                                            <div>${currentPrice.toFixed(2)}</div>
                                        </div>
                                        <div className="spaceBetween smallText regular darkBlueFont">
                                            <div>START PRICE</div>
                                            <div>CURRENT PRICE</div>
                                        </div>

                                        <div className="spaceBetween resultText medium greenFont" style={{marginTop: "5px"}}>
                                            <div>{priceChange>=0?`$${Math.abs(priceChange).toFixed(2)}`:`-$${Math.abs(priceChange).toFixed(2)}`}</div>
                                            <div>{((currentPrice-startPrice)/startPrice*100).toFixed(2)}%</div>
                                        </div>
                                        <div className="spaceBetween smallText regular darkBlueFont">
                                            <div>PRICE CHANGE</div>
                                            <div>PERCENTAGE CHANGE</div>
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
                                            <div>QUARTER PERCENTAGE CHANGE</div>
                                        </div>

                                        {/* <div className="spaceBetween resultText medium greenFont" style={{marginTop: "5px"}}>
                                            <div>${yearPrice.toFixed(2)}</div>
                                            <div>{((yearPrice-startPrice)/startPrice*100).toFixed(2)}%</div>
                                        </div>
                                        <div className="spaceBetween smallText regular darkBlueFont">
                                            <div>STOCK PRICE IN ONE YEAR</div>
                                            <div>PRICE PERCENTAGE CHANGE</div>
                                        </div> */}
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
