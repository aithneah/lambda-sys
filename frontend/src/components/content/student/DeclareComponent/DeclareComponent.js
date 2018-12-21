import React, {Component} from 'react';
import './DeclareComponent.scss';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import {Checkbox} from 'antd';
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import {withRouter} from "react-router-dom";

class DeclareComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            structure: this.props.structure
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
        if (!this.state.structure && this.props.structure) this.setState({structure: this.props.structure});
        if (prevState.isLoading && this.state.isLoading) this.setState({isLoading: false});
        else if (!prevState.isLoading && !this.state.isLoading) this.fetchDeclarationStructureData();
    }

    calculateDeclaredState = children =>
        children.map(c => c.isDeclared).reduce((d0, d1) => {
            if ([d0, d1].includes("partially")) return "partially";
            if (![d0, d1].includes("fully")) return "not";
            if (![d0, d1].includes("not")) return "fully";
            return "partially";
        });

    setChildrenDeclaredState = (children, isDeclared) =>
        children.map(node => {
            const children = this.setChildrenDeclaredState(node.children, isDeclared);

            return { ...node, children, isDeclared };
        });

    toggleDeclaredState(structure, [head, ...tail]) {
        return structure.map(node => {
            if (node.name !== head) return node;
            if (tail.length > 0) {
                const children = this.toggleDeclaredState(node.children, tail);
                const isDeclared = this.calculateDeclaredState(children);

                return { ...node, isDeclared, children };
            }
            const isDeclared = node.isDeclared === "fully" ? "not" : "fully";
            const children = this.setChildrenDeclaredState(node.children, isDeclared)

            return {...node, children, isDeclared};
        });
    }

    onToggleCheckbox(path) {
        const structure = this.toggleDeclaredState(this.state.structure, path);

        this.setState({ structure })
    }

    renderStructureNode(node, path = []) {
        return <div className={`declarationNodeContent-${node.type}`} key={node.name}>
            <div className={`declarationNodeTitle-${node.type}`}>
                {node.type !== "list" &&
                <Checkbox checked={node.isDeclared === 'fully'}
                          onChange={() => this.onToggleCheckbox([...path, node.name])}/>}
                          {" " + node.name}</div>
            {node.children.map(childNode => this.renderStructureNode(childNode, [...path, node.name]))}
        </div>
    }

    render() {
        return <RectangularContainer title="Wypełnij deklaracje">
            {this.state.structure && this.state.structure.map(list => this.renderStructureNode(list))}

            <div className="declareComponentButtons">
                <ButtonComponent title="Wypełnij"
                                 type="buttonGradient"
                                 fontsize="2.5vh"
                                 onClick={() => this.props.updateDeclaration(this.props.classesId, this.state.structure)}/>
            </div>
        </RectangularContainer>
    }
};

export default withRouter(DeclareComponent);