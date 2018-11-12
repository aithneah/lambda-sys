import React from 'react';
import './CommentComponent.css';
import ButtonComponent from '../../../shared/ButtonComponent/ButtonComponent';

const CommentComponent = (props) => {
    return <div className="commentComponent">
        <div className="commentComponentHeader">
            229732 <br />
            Bajcarzyk Michał
        </div>
        <form className="commentComponentForm">
            <label className="commentComponentFormSection">Wybierz listę: <select className="select">
                <option value="lista1">Lista 1</option>
                <option value="lista2">Lista 2</option>
                <option selected value="lista3">Lista 3</option>
                <option value="lista4">Lista 4</option>
            </select></label>
            <label className="commentComponentFormSection">Wybierz zadanie: <select className="select">
                <option selected value="grapefruit">Zadanie 1</option>
                <option value="lime">Zadanie 2</option>
                <option value="coconut">Zadanie3</option>
                <option value="mango">Zadanie 4</option>
            </select></label>
            <label className={"commentComponentFormSection"}>Podpunkty:
                <label><input type="radio" value="option1" /> a</label>
                <label><input type="radio" value="option2" /> b</label>
            </label>
            <label className={"commentComponentFormSection"}>Języki:
                <label><input type="radio" value="option1"  /> Scala</label>
                <label><input type="radio" value="option2"/> Ocaml</label>
            </label>
            <div className="commentComponentButtons">
            <ButtonComponent title="Powrót" style="buttonGradient" fontsize="1.2em"/>
            <input className="submit" type="submit" value="Oceń"/>
            </div>
        </form>

    </div>;
};

export default CommentComponent;