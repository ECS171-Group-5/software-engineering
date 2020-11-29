import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class HeaderBar extends Component {
    render() {
        return (
            <div id="header">
                <div id="smart-stock" className="semi-bold">SMART STOCK</div>
                <div id="created-by"><span className='bold'>Created by</span> Erik, Frances, Haoran, Joey, Martin, Monica, Nathaniel, Nikita, Orli, Rujun Ryan, Todd, and Xin</div>
            </div>
        );
    }
}