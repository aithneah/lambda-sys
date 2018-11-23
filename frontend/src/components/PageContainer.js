import React, { Component } from 'react';
import HeaderContainer from './header/HeaderContainer';
import ContentContainer from './content/ContentContainer';
import './PageContainer.css';
import Actions from "../store/actions";
import connect from "react-redux/es/connect/connect";


class PageContainer extends Component {
    render() {
        return (
            <div className={"pageContainer"}>
                <div className={"pageHeader"}>
                    <HeaderContainer account={this.props.account}
                                     getAccountData={this.props.getAccountData}/>
                </div>
                <div className={"pageContent"}>
                    <ContentContainer account={this.props.account}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        account: state.account
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAccountData: Actions.getAccountData.withDispatch(dispatch)
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);