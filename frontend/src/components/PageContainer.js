import React, { Component } from 'react';
import HeaderContainer from './header/HeaderContainer';
import './PageContainer.css';


class PageContainer extends Component {
    render() {
        return (
            <div className={'pageContainer'}>
                <HeaderContainer/>
            </div>
        );
    }
}

export default PageContainer;