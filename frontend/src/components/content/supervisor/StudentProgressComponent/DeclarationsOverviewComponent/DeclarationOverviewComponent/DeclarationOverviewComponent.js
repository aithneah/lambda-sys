import React from 'react';
import "./DeclarationOverviewComponent.scss";
import ExerciseTileComponent from "../../../../../shared/ExerciseTileComponent/ExerciseTileComponent";

const DeclarationOverviewComponent = (props) =>
    <div className="declarationOverviewContainer">
        <div className="declarationOverviewTitle">Lista 1</div>
        <div className="declarationOverviewExerciseTiles">
            <div className="declarationOverviewExercise"><ExerciseTileComponent type="exerciseDone"/></div>
            <div className="declarationOverviewExercise"><ExerciseTileComponent type="exerciseUndone"/></div>
            <div className="declarationOverviewExercise"><ExerciseTileComponent type="exerciseHalfDone"/></div>
            <div className="declarationOverviewExercise"><ExerciseTileComponent type="exerciseHalfDone"/></div>
            <div className="declarationOverviewExercise"><ExerciseTileComponent type="exerciseDone"/></div>
            <div className="declarationOverviewExercise"><ExerciseTileComponent type="exerciseDone"/></div>
            <div className="declarationOverviewExercise"><ExerciseTileComponent type="exerciseUndone"/></div>
        </div>
        <div className="declarationOverviewSumary">
            Procent wykonania wszystkich zadań na liście: 55.6% <br/>
            Średnia ocena odpowiedzi: pozytywny
        </div>
    </div>;

export default DeclarationOverviewComponent;