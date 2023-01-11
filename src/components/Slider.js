import React from "react";
import Photo from "./Photo";

const Slider = (props) => {
  return (
    <>
      <div className='flex-container'>
        {!props.isEndOfSliderLeft && (
          <Photo
            className={"photo-left"}
            width={props.width}
            height={props.height}
            src={props.photoLeft}
          />
        )}
        <Photo
          className='photo'
          width={props.width}
          height={props.height}
          alt={props.altText}
          photographer={props.photographer}
          src={props.src}
          id={props.id}
        />
        {!props.isEndOfSliderRight && (
          <Photo
            className={"photo-right"}
            width={props.width}
            height={props.height}
            src={props.photoRight}
          />
        )}
      </div>
    </>
  );
};

export default Slider;
