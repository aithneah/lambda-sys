import React, { Component } from 'react';
import TopBarComponent from './TopBarComponent/TopBarComponent';
import BottomBarComponent from './BottomBarComponent/BottomBarComponent';
import './HeaderContainer.css';

class HeaderContainer extends Component {
    render() {
        return (
            <div className={'header'}>
                <TopBarComponent/>
                <BottomBarComponent/>
            </div>
        );
    }
}

export default HeaderContainer;