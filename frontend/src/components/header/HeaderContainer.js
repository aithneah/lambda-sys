import React, { Component } from 'react';
import TopBarComponent from './TopBarComponent/TopBarComponent';
import BottomBarComponent from './BottomBarComponent/BottomBarComponent';
import './HeaderContainer.css';
import ContentContainer from "../content/ContentContainer";

class HeaderContainer extends Component {
    render() {
        return (
            <div className={'headerContainer'}>
                <TopBarComponent getAccountData={this.props.getAccountData}
                                 isLogged={this.props.account}
                                 logOut={this.props.logOut}  />
                <BottomBarComponent isLogged={this.props.account}
                                    account={this.props.account}/>
            </div>
        );
    }
}

export default HeaderContainer;