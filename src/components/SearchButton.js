import React from "react";

const SearchButton = (props) => {
  return (
    <button className='btn-search' onClick={props.onClick}>
      {props.name}
    </button>
  );
};

export default SearchButton;
