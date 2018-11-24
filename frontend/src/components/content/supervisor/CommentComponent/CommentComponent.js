import React from 'react';
import "./CommentComponent.scss";
import CircleContainer from "../../../shared/CircleContainer/CircleContainer";
import { Input, Select } from 'antd';
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";

const CommentComponent = (props) => {
    const { TextArea } = Input;
    const Option = Select.Option;

    return <CircleContainer headerText={"229732\nBajcarzyk Michał"}>
        <div className="commentComponentContainer">
            <div className="commentComponentSubtitle">Lista 4, zadanie 4, podpunkt a, Scala</div>
            <div className="commentComponentText">Komentarz do odpowiedzi:</div>
            <TextArea rows={4} />
            <div className="commentComponentResponse">
                <div className="commentComponentResponseText">Ocena: </div>
                <Select placeholder="Wybierz ocenę:" style={{ width: '20vw' }}>
                    <Option value="positive">Pozytywna</Option>
                    <Option value="neutral">Neutralna</Option>
                    <Option value="negative">Negatywna</Option>
                </Select>
            </div>
            <div className="commentComponentButtons">
                <ButtonComponent title="Powrót" type="buttonGradient" fontsize="2.5vh"/>
                <ButtonComponent title="Oceń" type="buttonGradient" fontsize="2.5vh"/>
            </div>
        </div>
    </CircleContainer>;
};

export default CommentComponent;