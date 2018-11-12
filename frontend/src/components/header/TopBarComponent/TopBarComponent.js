import React from "react";
import ButtonComponent from '../../shared/ButtonComponent/ButtonComponent';
import './TopBarComponent.scss';

const TopBarComponent = props => {
  return (
      <div className={'topbar'}>
          <img src={"https://svgshare.com/i/9Ar.svg"} className={'topBarLogoImage'} alt="paradygmaty programowania"/>
          <ButtonComponent title={props.isLogged ? 'Wyloguj' : 'Zaloguj'} style="buttonWhite" fontsize="3vh"/>
      </div>
  );
};

export default TopBarComponent;