import React from 'react';
import './CommentComponent.css';
import { Select, Radio } from 'antd';
import ButtonComponent from '../../shared/ButtonComponent/ButtonComponent';
import CircleComponent from '../../shared/CircleContainer/CircleContainer';

const Option = Select.Option;
const RadioGroup = Radio.Group;

const CommentComponent = (props) => {
    return <CircleComponent headerText={"229732\nBajcarzyk Michał"}>
        <div className="commentComponentForm">
            <div className="commentComponentFormSectionHorizontal">Wybierz listę:
            <Select className="commentComponentSelect">
                <Option value="lista1">Lista 1</Option>
                <Option value="lista2">Lista 2</Option>
                <Option value="lista3">Lista 3</Option>
                <Option value="lista4">Lista 4</Option>
            </Select>
            </div>
            <div className="commentComponentFormSectionHorizontal">
            Wybierz zadanie:
            <Select className="commentComponentSelect">
                <Option value="lista1">Zadanie 1</Option>
                <Option value="lista2">Zadanie 2</Option>
                <Option value="lista3">Zadanie 3</Option>
                <Option value="lista4">Zadanie 4</Option>
            </Select>
            </div>
            <div className="commentComponentFormSectionVertical">
            Podpunkty:
            <RadioGroup>
                <Radio value={"a"}>a</Radio>
                <Radio value={"b"}>b</Radio>
            </RadioGroup>
            </div>
            <div className="commentComponentFormSectionVertical">
            Języki:
            <RadioGroup>
                <Radio value={"scala"}>Scala</Radio>
                <Radio value={"ocaml"}>Ocaml</Radio>
            </RadioGroup>
            </div>
            <div className="commentComponentButtons">
                <ButtonComponent title="Powrót" style="buttonGradient" fontsize="3vh"/>
                <ButtonComponent title="Oceń" style="buttonGradient" fontsize="3vh"/>
            </div>
        </div>
    </CircleComponent>;
};

export default CommentComponent;