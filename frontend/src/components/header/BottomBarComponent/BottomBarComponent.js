import React from "react";
import './BottomBarComponent.scss';

const BottomBarComponent = props => {
    const supervisorMenu = <div className={'bottombarMenu'}>
        <div className={'bottombarText'}>Zarządzaj listami</div>
        <div className={'bottombarText'}>|</div>
        <div className={'bottombarText'}>Zarządzaj grupami</div>
        <div className={'bottombarText'}>|</div>
        <div className={'bottombarText'}>Zarządzaj terminami</div>
        <div className={'bottombarText'}>|</div>
        <div className={'bottombarText'}>Ustawienia wymagań</div>
    </div>;

    const studentMenu = <div>
        <div className={'bottombarText'}>Deklaracje</div>
        <div className={'bottombarText'}>|</div>
        <div className={'bottombarText'}>Ustawienia</div>
    </div>

  return (
      <div className={'bottombar'}>
          {props.isLogged ? supervisorMenu
              : <div className={'bottombarText'}>Zaloguj się, aby skorzystać z aplikacji</div>}
      </div>
  );
};

export default BottomBarComponent;