import React, {Component} from 'react';
import './ExercisesComponent.scss';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {message} from "antd";

const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const el = result[startIndex];
    const step = Math.sign(endIndex - startIndex);

    for (let i = startIndex; i < endIndex; i += step)
        result[i] = result[i + step]

    result[endIndex] = el;
    let alertMessage = 'Zmieniono kolejność listy ' + (startIndex + 1);
    message.success(alertMessage);
    return result.map((e, i) => ({...e, id: i + 1}));
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#99C2EE' : 'white',
    borderRadius: '1vh',
    opacity: isDragging ? '40%' : '100%',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'white' : 'white',
    width: '100%',
});

class ExercisesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [{id: 311, title: "Zadanie 1"}, {id: 312, title: "Zadanie 2"}, {id: 313, title: "Zadanie 3"}]
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }


    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const exercises = reorder(
            this.state.exercises,
            result.source.index,
            result.destination.index
        );

        this.setState({
            exercises,
        });
    }

    render() {
        return <RectangularContainer  title={"Struktura listy zadań nr " + this.props.listId}
                                      icon="ordered-list"
                                      buttons={() => <>
                                          <ButtonComponent title="Dodaj nowe zadanie" type="buttonGradient" fontsize="2vh" />
                                      </>}>
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Droppable droppableId="list">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.state.exercises.map((list, index) => (
                                <Draggable key={list.id} draggableId={list.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <div className="exercisesComponentItemStyle">
                                                <div className="exercisesComponentItemStyleTitle">{list.title}</div>
                                                <div className="exercisesComponentItemStyleButtons">
                                                    <ButtonComponent title="Usuń zadanie" type="buttonRed" fontsize="2.5vh"/>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </RectangularContainer>
    }
}

export default ExercisesComponent;