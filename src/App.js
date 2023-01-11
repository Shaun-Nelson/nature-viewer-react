import React, { useState } from "react";
import Slider from "./components/Slider";
import MenuButton from "./components/MenuButton";

const API_KEY = "563492ad6f91700001000001e2f01e5688a94b13b884103cacf2626b";
const endpoint =
  "https://api.pexels.com/v1/search/?page=1&per_page=80&query=Nature";

const App = () => {
  const [altText, setAltText] = useState("");
  const [photographer, setPhotographer] = useState("");
  const [id, setId] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [photoLeft, setPhotoLeft] = useState("");
  const [photoRight, setPhotoRight] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isEndOfSliderRight, setIsEndOfSliderRight] = useState(false);
  const [isEndOfSliderLeft, setIsEndOfSliderLeft] = useState(false);

  const getPhotos = async (search, handler) => {
    await fetch(search, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then(
        (res) => res.json(),
        (rej) => console.log(rej)
      )
      .then((data) => {
        setPhotos(data.photos);
        if (!isUpdated) {
          setIsUpdated(true);
          displayRandomPhoto();
        }
        if (data.next_page && photos.length < 1000) {
          getPhotos(data.next_page, console.log);
        }
        console.log(photos);
      });
  };

  const displayRandomPhoto = () => {
    let index = Math.floor(Math.random() * photos.length);

    if (index === 0) index += 1;
    if (index === photos.length - 1) index -= 1;

    setCurrentIndex(index);
    let photoMid = photos[index];

    setPhotoLeft(photos[index - 1].src.tiny);
    setPhotoRight(photos[index + 1].src.tiny);
    setAltText(photoMid.alt);
    setPhotographer(photoMid.photographer);
    setPhotoURL(photoMid.src.tiny);
    setId(photoMid.id);
    displayBackgroundImage(photoMid);
  };

  const displayBackgroundImage = (photo) => {
    window.screen.orientation.type.startsWith("landscape")
      ? (document.body.style.backgroundImage = `url('${photo.src.landscape}')`)
      : (document.body.style.backgroundImage = `url('${photo.src.portrait}')`);
  };

  const moveSliderRight = (index) => {
    setIsEndOfSliderLeft(false);
    if (index === photos.length) return;

    let photoMid = photos[index];
    setCurrentIndex(index);

    if (index === photos.length - 1 && !isEndOfSliderRight) {
      setIsEndOfSliderRight(true);
      setPhotoLeft(photos[index - 1].src.tiny);
      setPhotoRight(null);
      setAltText(photoMid.alt);
      setPhotographer(photoMid.photographer);
      setPhotoURL(photoMid.src.tiny);
      setId(photoMid.id);
      displayBackgroundImage(photoMid);
      return;
    }

    setPhotoLeft(photos[index - 1].src.tiny);
    setPhotoRight(photos[index + 1].src.tiny);
    setAltText(photoMid.alt);
    setPhotographer(photoMid.photographer);
    setPhotoURL(photoMid.src.tiny);
    setId(photoMid.id);
    displayBackgroundImage(photoMid);
  };

  const moveSliderLeft = (index) => {
    setIsEndOfSliderRight(false);
    if (index === 0) return;

    let photoMid = photos[index];
    setCurrentIndex(index);

    if (index === 1 && !isEndOfSliderLeft) {
      setIsEndOfSliderLeft(true);
      setPhotoLeft(null);
      setPhotoRight(photos[index + 1].src.tiny);
      setAltText(photoMid.alt);
      setPhotographer(photoMid.photographer);
      setPhotoURL(photoMid.src.tiny);
      setId(photoMid.id);
      displayBackgroundImage(photoMid);
    }

    setPhotoLeft(photos[index - 1].src.tiny);
    setPhotoRight(photos[index + 1].src.tiny);
    setAltText(photoMid.alt);
    setPhotographer(photoMid.photographer);
    setPhotoURL(photoMid.src.tiny);
    setId(photoMid.id);
    displayBackgroundImage(photoMid);
  };

  if (!isUpdated) getPhotos(endpoint, displayRandomPhoto);

  return (
    <>
      {showSlider && (
        <div className='flex-container'>
          <button
            className='btn-left'
            onClick={() => moveSliderLeft(currentIndex - 1)}
          >
            &#8678;
          </button>

          <Slider
            altText={altText}
            photographer={photographer}
            src={photoURL}
            id={id}
            height={
              window.screen.orientation.type.startsWith("landscape") ? 200 : 100
            }
            width={
              window.screen.orientation.type.startsWith("landscape") ? 300 : 100
            }
            photoLeft={photoLeft}
            photoRight={photoRight}
            isEndOfSliderRight={isEndOfSliderRight}
            isEndOfSliderLeft={isEndOfSliderLeft}
            onRightPhotoClick={() => moveSliderRight(currentIndex + 1)}
            onLeftPhotoClick={() => moveSliderLeft(currentIndex - 1)}
          />

          <button
            className='btn-right'
            onClick={() => moveSliderRight(currentIndex + 1)}
          >
            &#8680;
          </button>
        </div>
      )}
      <div className='flex-column-container'>
        {showSlider && (
          <div className='flex-column-container'>
            <h2 className='photographer-name'>{`Photographer: ${photographer}`}</h2>
            <h3 className='desc'>
              {window.screen.orientation.type.startsWith("landscape")
                ? altText
                : "Use Landscape orientation."}
            </h3>
          </div>
        )}
        <MenuButton
          onClick={() => setShowSlider(!showSlider)}
          menuButtonText={showSlider ? "v Gallery" : "^ Gallery"}
        ></MenuButton>
      </div>
    </>
  );
};

export default App;
