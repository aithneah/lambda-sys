import React, {Component} from 'react';
import './ExercisesComponent.scss';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";

class ExercisesComponent extends Component {
    render() {
        return <RectangularContainer  title={"Struktura listy zadań nr " + this.props.listId}
                                      icon="ordered-list"
                                      buttons={() => <>
                                          <ButtonComponent title="Dodaj nowe zadanie" type="buttonGradient" fontsize="2vh" />
                                      </>}>
            Zadania
        </RectangularContainer>
    }
}

export default ExercisesComponent;