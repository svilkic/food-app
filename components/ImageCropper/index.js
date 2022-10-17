import React, { useCallback, useState, useEffect } from "react";
// LIBS
import { getCroppedImg } from "./CanvasUtils";
import Cropper from "react-easy-crop";
// ICONS
// import {MdOutlineFileUpload} from 'react-icons/md'
// import { useEffect } from "react/cjs/react.development";
import { useAuth } from "/util/AuthContext";
// CONSTANTS

import classes from "./imgCropper.module.css";
import Image from "next/image";
function ImageCropper({ id, onCrop, cropped, className }) {
  const { currentUser } = useAuth();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (!imageSrc) setCroppedImage(cropped);
  }, [cropped]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { croppedImage, base64 } = await getCroppedImg(
          imageSrc,
          croppedAreaPixels
        );
        setCroppedImage(URL.createObjectURL(croppedImage));
        // RETURN OBJECT SUTABLE FOR MUTATION
        onCrop({ target: { id, value: base64 } });
      } catch (error) {
        console.error(error);
      }
      setImageSrc(null);
    },
    [imageSrc, croppedAreaPixels]
  );

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
      setZoom(1);
    }
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className={className}>
      {imageSrc ? (
        <div className={classes.cropBackdrop}>
          <div style={{ width: "100%", position: "relative" }}>
            <div className={classes.cropContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className={classes.cropTools}>
              <input
                className={classes.cropBtn}
                type='range'
                min={1}
                max={3}
                value={zoom}
                step={0.1}
                onChange={(e) => setZoom(e.target.value)}
              />
              <button
                onClick={showCroppedImage}
                variant='contained'
                className={classes.cropBtn}
              >
                Crop
              </button>
            </div>
          </div>
        </div>
      ) : undefined}
      {currentUser ? (
        <label
          className={` ${classes.previewImage} ${classes.editable} `}
          htmlFor='img'
        >
          <input
            type='file'
            id='img'
            name='img'
            onChange={onFileChange}
            accept='image/*'
            style={{ display: "none" }}
          />
          <i className={` ${classes.imgPencil} bx bx-pencil`}></i>
          <Image
            src={croppedImage ? croppedImage : "/img/dummy.jpg"}
            alt=''
            width='127px'
            height='127px'
          />
        </label>
      ) : (
        <div className={classes.previewImage}>
          <Image
            src={croppedImage ? croppedImage : "/img/dummy.jpg"}
            alt=''
            width='127px'
            height='127px'
          />
        </div>
      )}
    </div>
  );
}

ImageCropper.defaultProps = {
  onCrop: () => {},
};

export default ImageCropper;
