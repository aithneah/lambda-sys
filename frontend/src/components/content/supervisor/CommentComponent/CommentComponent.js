import React, {Component} from 'react';
import "./CommentComponent.scss";
import CircleContainer from "../../../shared/CircleContainer/CircleContainer";
import {Input, Select} from 'antd';
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import {withRouter} from "react-router-dom";

class CommentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentContent: null,
            note: null
        }
    }


    render() {
        const {TextArea} = Input;
        const Option = Select.Option;

        let list = this.props.student.declarationStructure.structure[this.props.comment.list].name;
        let exercise = "- " + this.props.student.declarationStructure.structure[this.props.comment.list]
            .children[this.props.comment.exercise].name;

        let subpoint = this.props.comment.subpoint !== null ? "- " + this.props.student.declarationStructure
            .structure[this.props.comment.list]
            .children[this.props.comment.exercise]
            .children[this.props.comment.subpoint].name : "";

        let lang = this.props.comment.lang !== null ?
            (this.props.comment.subpoint !== null ? "- " + this.props.student.declarationStructure
                .structure[this.props.comment.list]
                .children[this.props.comment.exercise]
                .children[this.props.comment.subpoint]
                .children[this.props.comment.lang].name
                : "- " + this.props.student.declarationStructure
                .structure[this.props.comment.list]
                .children[this.props.comment.exercise]
                .children[this.props.comment.lang].name) : "";

        let exerciseId = (() => {
            if (this.props.comment.lang !== null) {
                if (this.props.comment.subpoint !== null) {
                    return this.props.student.declarationStructure
                        .structure[this.props.comment.list]
                        .children[this.props.comment.exercise]
                        .children[this.props.comment.subpoint]
                        .children[this.props.comment.lang].id
                } else return this.props.student.declarationStructure
                    .structure[this.props.comment.list]
                    .children[this.props.comment.exercise]
                    .children[this.props.comment.lang].id
            } else if (this.props.comment.subpoint !== null) {
                return this.props.student.declarationStructure
                    .structure[this.props.comment.list]
                    .children[this.props.comment.exercise]
                    .children[this.props.comment.subpoint].id
            } else return this.props.student.declarationStructure.structure[this.props.comment.list]
                .children[this.props.comment.exercise].id
        })();

        return <CircleContainer headerText={this.props.student.index + "\n" + this.props.student.name}>
            <div className="commentComponentContainer">
                <div className="commentComponentSubtitle">
                    {list + " " + exercise + " " + subpoint + " " + lang}</div>
                <div className="commentComponentText">Komentarz do odpowiedzi:</div>
                <TextArea rows={4} onChange={(e) => this.setState({commentContent: e.target.value})}/>
                <div className="commentComponentResponse">
                    <div className="commentComponentResponseText">Ocena:</div>
                    <Select placeholder="Wybierz ocenę:"
                            onChange={(value) => this.setState({note: value})}
                            style={{width: '20vw'}}>
                        <Option value="positive">Pozytywna</Option>
                        <Option value="neutral">Neutralna</Option>
                        <Option value="negative">Negatywna</Option>
                    </Select>
                </div>
                <div className="commentComponentButtons">
                    <ButtonComponent title="Powrót" type="buttonGradient" fontsize="2.5vh"/>
                    <ButtonComponent title="Oceń" type="buttonGradient" fontsize="2.5vh"
                                     onClick={() => this.props.applyComment(exerciseId,
                                         this.state.commentContent === "" ? null : this.state.commentContent,
                                         this.state.note)}/>
                </div>
            </div>
        </CircleContainer>;
    }
};

export default withRouter(CommentComponent);