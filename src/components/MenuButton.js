import React from "react";

const MenuButton = (props) => {
  return (
    <button className='btn-menu' onClick={props.onClick}>
      {props.menuButtonText}
    </button>
  );
};

export default MenuButton;
