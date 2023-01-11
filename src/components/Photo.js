import React from "react";

const Photo = (props) => {
  return (
    <img
      className={props.className}
      width={props.width}
      height={props.height}
      alt={props.alt}
      photographer={props.photographer}
      src={props.src}
      id={props.id}
      onClick={props.onClick}
    />
  );
};

export default Photo;
