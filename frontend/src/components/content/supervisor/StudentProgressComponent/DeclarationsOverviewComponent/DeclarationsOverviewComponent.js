import React from 'react';
import "./DeclarationsOverviewComponent.scss";
import DeclarationOverviewComponent from "./DeclarationOverviewComponent/DeclarationOverviewComponent";

const DeclarationsOverviewComponent = (props) =>
    <div className="declarationsOverviewContainer">
        {props.lists && props.lists.map(list => <DeclarationOverviewComponent key={list.id} exercises={list.children} listName={list.name}/>)}
    </div>;

export default DeclarationsOverviewComponent;
