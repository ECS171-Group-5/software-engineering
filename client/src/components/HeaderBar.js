import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class HeaderBar extends Component {
    render() {
        return (
            <header>
                <Link to='/'>
                    <button id="smart-stock" className="semi-bold">SMART STOCK</button>
                </Link>
                <div id="created-by"><span className='bold'>Created by</span> Erik, Frances, Haoran, Joey, Martin, Monica, Nathaniel, Nikita, Orli, Rujun Ryan, Todd, and Xin</div>
            </header>
        );
    }
}