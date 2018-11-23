import React, { Component } from 'react';
import TopBarComponent from './TopBarComponent/TopBarComponent';
import BottomBarComponent from './BottomBarComponent/BottomBarComponent';
import './HeaderContainer.css';

class HeaderContainer extends Component {
    render() {
        return (
            <div className={'headerContainer'}>
                <TopBarComponent getAccountData={this.props.getAccountData}
                                 isLogged={this.props.account}/>
                <BottomBarComponent isLogged={this.props.account}
                                    account={this.props.account}/>
            </div>
        );
    }
}

export default HeaderContainer;