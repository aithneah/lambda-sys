import React from "react";
import './BottomBarComponent.scss';
import {withRouter} from "react-router-dom";

const BottomBarComponent = props => {
    const supervisorMenu = <div className={'bottombarMenu'}>
        <div className={'bottombarText'}>Zarządzaj listami</div>
        <div className={'bottombarText'}>|</div>
        <div className={'bottombarText'} onClick={() => props.history.push("/groups")}>Zarządzaj grupami</div>
        <div className={'bottombarText'}>|</div>
        <div className={'bottombarText'}>Zarządzaj terminami</div>
        <div className={'bottombarText'}>|</div>
        <div className={'bottombarText'}>Ustawienia wymagań</div>
    </div>;

    const studentMenu = <div className={'bottombarMenu'}>
        <div className={'bottombarText'} onClick={() => props.history.push("/declarations")}>Deklaracje</div>
        <div className={'bottombarText'}>|</div>
        <div className={'bottombarText'} onClick={() => props.history.push("/settings")}>Ustawienia</div>
    </div>;

  return (
      <div className={'bottombar'}>
          {props.isLogged ? (props.account.index ? studentMenu : supervisorMenu)
              : <div className={'bottombarText'}>Zaloguj się, aby skorzystać z aplikacji</div>}
      </div>
  );
};

export default withRouter(BottomBarComponent);