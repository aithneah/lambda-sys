import React, { Component } from 'react';
import HeaderContainer from './header/HeaderContainer';
import ContentContainer from './content/ContentContainer';
import './PageContainer.css';


class PageContainer extends Component {
    render() {
        return (
            <div className={"pageContainer"}>
                <div className={"pageHeader"}>
                    <HeaderContainer/>
                </div>
                <div className={"pageContent"}>
                    <ContentContainer/>
                </div>
            </div>
        );
    }
}

export default PageContainer;