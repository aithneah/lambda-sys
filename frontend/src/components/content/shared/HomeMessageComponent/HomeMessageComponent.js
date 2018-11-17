import React from 'react';
import './HomeMessageComponent.css';

const HomeMessageComponent = (props) => {
    return <div className={"homeContainer"} style={{cursor: props.isLogged ? 'default' : 'pointer'}} onClick={props.onClick}>
        <div className={"homeMessageTitle"}>
            Paradygmaty programowania
        </div>
        <div className={"homeMessageContent"}>
            {props.isLogged ? 'Wybierz jedną z opcji menu, aby kontynuować' : 'Zaloguj się, aby skorzystać z serwisu'}
        </div>
    </div>
};

export default HomeMessageComponent;