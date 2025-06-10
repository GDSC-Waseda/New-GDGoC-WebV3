import React, { useState } from "react";
import Image from "next/image";

import { ImageIconProps } from "~/types/index";

export const ImageIcon: React.FC<{
  children?: React.ReactNode;
  props: ImageIconProps;
}> = ({ children, props }) => {
  const [currentImage, setCurrentImage] = useState(props.image);

  const imageSize = () => {
    switch (props.size) {
      case "s":
        return 10;
      case "m":
        return 10;
      case "l":
        return 100;
    }
  };

  const handleSwapClick = () => {
    setCurrentImage((prevImage) =>
      prevImage === props.image ? props.image2 ?? "" : props.image ?? ""
    );
  };

  return (
    <div className={`image-icon ${props.size}`}>
      <div className={`image-icon__image-container ${props.size}`}>
        {props.image ? (
          props.multiple == true ? (
            <div className="image-icon__swap-container">
              <a href={`/teams/${props.link}`}>
                <img
                  className={`image-icon__image ${props.size} ${props.color}`}
                  src={`/tempImg/leads/${currentImage}`}
                  alt="image-icon"
                />
              </a>
              <button
                className="image-icon__swap-button"
                onClick={handleSwapClick}
              >
                <img
                  className="image-icon__swap"
                  src={`/tempImg/arrows-${props.color}.png`}
                  alt="arrows"
                />
              </button>
            </div>
          ) : (
            <a href={`/teams/${props.link}`}>
              <img
                className={`image-icon__image ${props.size} ${props.color}`}
                src={`/tempImg/leads/${currentImage}`}
                alt="image-icon"
              />
            </a>
          )
        ) : (
          <div className={`image-icon__image ${props.size} ${props.color}`} />
        )}
      </div>
      <div className="image-icon__detail-container">
        <a href={`/teams/${props.link}`}>
          {props.title !== undefined && (
            <div className="image-icon__title">{props.title}</div>
          )}
        </a>
        <div className="image-icon__other">
          {children !== undefined && children}
        </div>
      </div>
    </div>
  );
};

export default ImageIcon;
