import React from 'react';
import "./DeclarationsOverviewComponent.scss";
import DeclarationOverviewComponent from "./DeclarationOverviewComponent/DeclarationOverviewComponent";

const DeclarationsOverviewComponent = (props) =>
    <div className="declarationsOverviewContainer">
        <DeclarationOverviewComponent/>
        <DeclarationOverviewComponent/>
        <DeclarationOverviewComponent/>
        <DeclarationOverviewComponent/>
    </div>;

export default DeclarationsOverviewComponent;
