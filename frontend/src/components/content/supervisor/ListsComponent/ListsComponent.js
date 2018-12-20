import React, {Component} from 'react';
import './ListsComponent.scss';
import {message} from 'antd';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from '../../../shared/ButtonComponent/ButtonComponent';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {withRouter} from "react-router-dom";

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

class ListsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: Array.from({ length: 10 }, (v, k) => k).map(k => ({
                id: k + 1}
            ))
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const lists = reorder(
            this.state.lists,
            result.source.index,
            result.destination.index
        );

        this.setState({
            lists,
        });
    }

    render() {
        console.log('render');
        console.log(this.state.lists);
        return <RectangularContainer title="Zarządzaj listami zadań"
                                     icon="ordered-list"
                                     buttons={() => <>
                                         <ButtonComponent title="Dodaj nową listę zadań" type="buttonGradient"
                                                          fontsize="2vh"/>
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
                            {this.state.lists.map((list, index) => (
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
                                            <div className="listsComponentItemStyle">
                                                <div className="listsComponentItemStyleTitle">Lista {list.id}</div>
                                                <div className="listsComponentItemStyleButtons">
                                                    <ButtonComponent title="Edytuj listę" type="buttonGreen" fontsize="2.5vh" onClick={() => this.props.history.push("/lists/" + list.id)}/>
                                                    <ButtonComponent title="Usuń listę" type="buttonRed" fontsize="2.5vh"/>
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
        </RectangularContainer>;
    }
}

export default withRouter(ListsComponent);