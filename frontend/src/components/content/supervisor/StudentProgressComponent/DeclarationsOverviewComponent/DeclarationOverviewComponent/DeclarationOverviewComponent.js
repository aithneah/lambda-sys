import React from 'react';
import "./DeclarationOverviewComponent.scss";
import ExerciseTileComponent from "../../../../../shared/ExerciseTileComponent/ExerciseTileComponent";

const DeclarationOverviewComponent = (props) => {
    let buildPartialData = (node, path) => {
        return node.note !== "" ?
            [...path, node.name].join(" / ") + ": " + node.note + (node.comment !== "" ? (" - " + node.comment) : "") + "\n"
            + node.children.map((child) => buildPartialData(child, [...path, node.name]))
            : node.children.map((child) => buildPartialData(child, [...path, node.name]));

    };

    return <div className="declarationOverviewContainer">
        <div className="declarationOverviewTitle">{props.listName}</div>
        <div className="declarationOverviewExerciseTiles">
            {props.exercises && props.exercises
                .map(exercise =>
                    <div className="declarationOverviewExercise" key={exercise.id}>
                        <ExerciseTileComponent type={"exercise-" + exercise.isDeclared}
                                               tick={exercise.isChecked}
                                               popover={exercise.isChecked}
                                               exerciseDetails={buildPartialData(exercise, [])}/>
                    </div>)}
        </div>
        {/*<div className="declarationOverviewSumary">*/}
        {/*Procent wykonania wszystkich zadań na liście: 55.6% <br/>*/}
        {/*Średnia ocena odpowiedzi: pozytywny*/}
        {/*</div>*/}
    </div>;
};


export default DeclarationOverviewComponent;