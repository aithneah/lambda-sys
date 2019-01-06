import React, {Component} from 'react';
import './CommentOptionsComponent.css';
import {Select, Radio} from 'antd';
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import CircleComponent from "../../../shared/CircleContainer/CircleContainer";
import {withRouter} from "react-router-dom";

const Option = Select.Option;
const RadioGroup = Radio.Group;

class CommentOptionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenList: this.props.comment ? this.props.comment.list : null,
            chosenExercise: this.props.comment ? this.props.comment.exercise : null,
            chosenSubpoint: null,
            chosenLang: null
        }
    }

    render() {
    return <CircleComponent headerText={this.props.student.index + "\n" + this.props.student.name}>
        <div className="commentOptionsComponentForm">
            <div className="commentOptionsComponentFormSectionHorizontal"><span style={{marginRight: "2vw"}}>Wybierz listę:</span>
                <Select className="commentOptionsComponentSelect"
                        value={this.state.chosenList !== null ? this.state.chosenList : null}
                        onChange={(value) => this.setState({chosenList: value,
                            chosenExercise: null, chosenSubpoint: null, chosenLang: null})}>
                    {this.props.student.declarationStructure.structure.map((list, i) =>
                    <Option value={i} key={list.id}>{list.name}</Option>)}
                </Select>
            </div>
            <div className="commentOptionsComponentFormSectionHorizontal">
                <span style={{marginRight: "2vw"}}>Wybierz zadanie:</span>
                <Select className="commentOptionsComponentSelect"
                        disabled={this.state.chosenList === null}
                        value={this.state.chosenExercise !== null ? this.state.chosenExercise : null}
                        onChange={(value) => this.setState({chosenExercise: value,
                            chosenSubpoint: null, chosenLang: null})}>
                    {this.state.chosenList !== null &&
                    this.props.student.declarationStructure.structure[this.state.chosenList].children
                        .map((exercise, i) => <Option value={i}
                                                      key={exercise.id}>{exercise.name}</Option>)
                    }
                </Select>
            </div>
            {this.state.chosenExercise !== null &&
            this.props.student.declarationStructure.structure[this.state.chosenList]
                .children[this.state.chosenExercise].children.length > 0 &&
            (this.props.student.declarationStructure.structure[this.state.chosenList]
                .children[this.state.chosenExercise].children[0].type === "subpoint" ?
                    <div className="commentOptionsComponentFormSectionVertical">
                        Podpunkty:
                        <RadioGroup className="commentOptionsComponentFormSectionVerticalRadioGroup"
                                    value={this.state.chosenSubpoint !== null ? this.state.chosenSubpoint : null}
                                    onChange={(e) => this.setState({chosenSubpoint: e.target.value, chosenLang: null})}>
                            {this.props.student.declarationStructure.structure[this.state.chosenList]
                                .children[this.state.chosenExercise].children
                                .map((subpoint, i) => <Radio value={i} key={subpoint.id}>{subpoint.name}</Radio>)}
                        </RadioGroup>
                    </div> : <div className="commentOptionsComponentFormSectionVertical">
                        Języki:
                        <RadioGroup className="commentOptionsComponentFormSectionVerticalRadioGroup"
                                    value={this.state.chosenLang !== null ? this.state.chosenLang : null}
                                    onChange={(e) => this.setState({chosenLang: e.target.value})}>
                            {this.props.student.declarationStructure.structure[this.state.chosenList]
                                .children[this.state.chosenExercise].children
                                .map((lang, i) => <Radio value={i} key={lang.id}>{lang.name}</Radio>)}
                        </RadioGroup>
                    </div>
            )
            }
            {this.state.chosenSubpoint !== null &&
            this.props.student.declarationStructure.structure[this.state.chosenList]
                .children[this.state.chosenExercise]
                .children[this.state.chosenSubpoint]
                .children.length > 0 &&
            <div className="commentOptionsComponentFormSectionVertical">
                Języki:
                <RadioGroup className="commentOptionsComponentFormSectionVerticalRadioGroup"
                            value={this.state.chosenLang !== null ? this.state.chosenLang : null}
                            onChange={(e) => this.setState({chosenLang: e.target.value})}>
                    {this.props.student.declarationStructure.structure[this.state.chosenList]
                        .children[this.state.chosenExercise].children[this.state.chosenSubpoint].children
                        .map((lang, i) => <Radio value={i} key={lang.id}>{lang.name}</Radio>)}
                </RadioGroup>
            </div>}
            <div className="commentOptionsComponentButtons">
                <ButtonComponent title="Powrót" type="buttonGradient" fontsize="2.5vh"/>
                <ButtonComponent title="Oceń" type="buttonGradient" fontsize="2.5vh"
                                 onClick={() => {
                                    this.props.setCommentData(this.state.chosenList,
                                        this.state.chosenExercise, this.state.chosenSubpoint,
                                        this.state.chosenLang);
                                    this.props.history.push("/students/" + this.props.student.index + "/comment");
                                 }
                                 }/>
            </div>
        </div>
    </CircleComponent>;}
};

export default withRouter(CommentOptionsComponent);