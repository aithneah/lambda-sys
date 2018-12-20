import React from "react";
import ButtonComponent from '../../shared/ButtonComponent/ButtonComponent';
import './TopBarComponent.scss';
import {withRouter} from "react-router-dom";

const TopBarComponent = props => {
  return (
      <div className={'topbar'}>
          <img src={"https://svgshare.com/i/9Ar.svg"}
               className={'topBarLogoImage'}
               alt="paradygmaty programowania"
               onClick={() => props.history.push("/home")}/>
          <ButtonComponent title={props.isLogged ? 'Wyloguj' : 'Zaloguj'}
                           type="buttonWhite"
                           fontsize="2.5vh"
                           onClick={() => {
                               props.isLogged ? props.logOut() :
                               props.history.push("/login");
                           }}/>
      </div>
  );
};

export default withRouter(TopBarComponent);