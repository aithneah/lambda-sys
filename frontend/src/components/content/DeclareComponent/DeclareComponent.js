import React from 'react';
import './DeclareComponent.scss';
import RectangularContainer from "../../shared/RectangularContainer/RectangularContainer";
import {Checkbox} from 'antd';

const DeclareComponent = (props) => {
  return <RectangularContainer title="Wypełnij deklaracje">
      <div className="declareComponentListBlock">
          <div className="declareComponentListTitle">Lista 7</div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 1 <br />
              <div className="declareComponentListSubpoint"><Checkbox/> podpunkt a)</div>
              <div className="declareComponentListSubpoint">
                  <Checkbox/> podpunkt b)
                  <div className="declareComponentListLang"><Checkbox/> Scala</div>
                  <div className="declareComponentListLang"><Checkbox/> Ocaml</div>
              </div>
          </div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 2 <br />
          </div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 3 <br />
          </div>
      </div>
      <div className="declareComponentListBlock">
          <div className="declareComponentListTitle">Lista 8</div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 1 <br />
          </div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 2 <br />
              <div className="declareComponentListSubpoint"><Checkbox/> podpunkt a)</div>
              <div className="declareComponentListSubpoint"><Checkbox/> podpunkt b)</div>
              <div className="declareComponentListSubpoint">
                  <Checkbox/> podpunkt b)
                  <div className="declareComponentListLang"><Checkbox/> Scala</div>
                  <div className="declareComponentListLang"><Checkbox/> Ocaml</div>
              </div>
          </div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 3 <br />
          </div>
      </div>
      <div className="declareComponentListBlock">
          <div className="declareComponentListTitle">Lista 8</div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 1 <br />
          </div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 2 <br />
              <div className="declareComponentListSubpoint"><Checkbox/> podpunkt a)</div>
              <div className="declareComponentListSubpoint"><Checkbox/> podpunkt b)</div>
              <div className="declareComponentListSubpoint">
                  <Checkbox/> podpunkt b)
                  <div className="declareComponentListLang"><Checkbox/> Scala</div>
                  <div className="declareComponentListLang"><Checkbox/> Ocaml</div>
              </div>
          </div>
          <div className="declareComponentListExercise">
              <Checkbox/> Zadanie 3 <br />
          </div>
      </div>
  </RectangularContainer>
};

export default DeclareComponent;