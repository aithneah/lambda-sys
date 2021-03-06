import React, {Component} from 'react';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import "./DeclarationsComponent.scss";
import {Icon} from 'antd';
import {withRouter} from "react-router-dom";

class DeclarationsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    fetchDeclarationsData() {
        if (!this.state.isLoading) this.setState({isLoading: true});
        this.props.getAllDeclarationsData();
    }

    componentDidMount() {
        this.fetchDeclarationsData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading && this.state.isLoading) this.setState({isLoading: false});
        else if (!prevState.isLoading && !this.state.isLoading) this.fetchDeclarationsData();
    }

    dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };


    render() {
        const locale = window.navigator.language;

        return <RectangularContainer
            title="Deklaracje">
            {this.state.isLoading ? <div className="declarationsComponentLoading"><Icon type="loading"/></div> :
                <table className="declarationsTable">
                    <tbody>
                    <tr className="declarationsTableHeader">
                        <th>Lp.</th>
                        <th>Numer listy</th>
                        <th>Ostateczna data wypełnienia</th>
                        <th>Wypełniono</th>
                    </tr>
                    {this.props.declarations
                        .map((declaration, i) => {
                                const classesDate = new Date(declaration.classesDate);

                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{declaration.lists.join(', ')}</td>
                                    <td>{classesDate.toLocaleString(locale, this.dateOptions)}</td>
                                    <td>{declaration.completionDate ?
                                        new Date(declaration.completionDate).toLocaleString(locale, this.dateOptions) : "-"}</td>
                                    <td className="declarationsTableTDButtons">
                                        {new Date() > classesDate ?
                                            <ButtonComponent title={declaration.completionDate ? "Wypełniono" : "Nie wypełniono"}
                                                             type={"buttonGray"}
                                                             fontsize="2vh"/>
                                            :
                                            <ButtonComponent
                                                title={declaration.completionDate ? "Edytuj" : "Wypełnij"}
                                                type={"buttonGradient"}
                                                onClick={() => this.props.history.push(`/declare/${declaration.classesId}`)}
                                                fontsize="2vh"/>
                                        }</td>
                                </tr>;
                            }
                        )}
                    </tbody>
                </table>
            }
        </RectangularContainer>
    }
};

export default withRouter(DeclarationsComponent);