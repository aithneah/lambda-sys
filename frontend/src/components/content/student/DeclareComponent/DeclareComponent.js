import React, {Component} from 'react';
import './DeclareComponent.scss';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import {Checkbox} from 'antd';
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";

class DeclareComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    fetchDeclarationStructureData() {
        if (!this.state.isLoading) this.setState({isLoading: true});
        this.props.getDeclarationStructureData(this.props.classesId);
    }

    componentDidMount() {
        this.fetchDeclarationStructureData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading && this.state.isLoading) this.setState({isLoading: false});
        else if (!prevState.isLoading && !this.state.isLoading) this.fetchDeclarationStructureData();
    }

    renderStructureNode(node) {
        return <div className={`declarationNodeContent-${node.type}`} key={node.name}>
            <div className={`declarationNodeTitle-${node.type}`}>{node.type !== "list" && <Checkbox/>} {node.name}</div>
            {node.children.map(childNode => this.renderStructureNode(childNode))}
        </div>
    }

    render() {
        return <RectangularContainer title="Wypełnij deklaracje">
            {this.props.structure && this.props.structure.map(list => this.renderStructureNode(list))}

            <div className="declareComponentButtons">
                <ButtonComponent title="Wypełnij" type="buttonGradient" fontsize="2.5vh"/>
            </div>
        </RectangularContainer>
    }
};

export default DeclareComponent;