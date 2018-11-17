import React from 'react';
import './CommentOptionsComponent.css';
import {Select, Radio} from 'antd';
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import CircleComponent from "../../../shared/CircleContainer/CircleContainer";

const Option = Select.Option;
const RadioGroup = Radio.Group;

const CommentOptionsComponent = (props) => {
    return <CircleComponent headerText={"229732\nBajcarzyk Michał"}>
        <div className="commentOptionsComponentForm">
            <div className="commentOptionsComponentFormSectionHorizontal">Wybierz listę:
                <Select className="commentOptionsComponentSelect">
                    <Option value="lista1">Lista 1</Option>
                    <Option value="lista2">Lista 2</Option>
                    <Option value="lista3">Lista 3</Option>
                    <Option value="lista4">Lista 4</Option>
                </Select>
            </div>
            <div className="commentOptionsComponentFormSectionHorizontal">
                Wybierz zadanie:
                <Select className="commentOptionsComponentSelect">
                    <Option value="lista1">Zadanie 1</Option>
                    <Option value="lista2">Zadanie 2</Option>
                    <Option value="lista3">Zadanie 3</Option>
                    <Option value="lista4">Zadanie 4</Option>
                </Select>
            </div>
            <div className="commentOptionsComponentFormSectionVertical">
                Podpunkty:
                <RadioGroup>
                    <Radio value={"a"}>a</Radio>
                    <Radio value={"b"}>b</Radio>
                </RadioGroup>
            </div>
            <div className="commentOptionsComponentFormSectionVertical">
                Języki:
                <RadioGroup>
                    <Radio value={"scala"}>Scala</Radio>
                    <Radio value={"ocaml"}>Ocaml</Radio>
                </RadioGroup>
            </div>
            <div className="commentOptionsComponentButtons">
                <ButtonComponent title="Powrót" style="buttonGradient" fontsize="2.5vh"/>
                <ButtonComponent title="Oceń" style="buttonGradient" fontsize="2.5vh"/>
            </div>
        </div>
    </CircleComponent>;
};

export default CommentOptionsComponent;