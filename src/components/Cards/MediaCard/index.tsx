import Image from "next/image";
import React, { useState } from "react";

import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";

import { MediaCardProps } from "~/types/index";

export const MediaCard: React.FC<{
  children?: React.ReactNode;
  props: MediaCardProps;
}> = ({ children, props }) => {
  const [open, setOpen] = useState(props.open);
  const handleOnClick = () => setOpen(!open);

  return (
    <div className={`media-card ${props.size}`}>
      <div className="media-card__title">{props.title}</div>
      <div className="media-card__body">
        {props.image ? (
          <div className="media-card__image-container">
            <Image
              className="media-card__image"
              src={props.image}
              alt="media-card"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : (
          <div className={`media-card__image-container none`} />
        )}

        <div className="media-card__detail-container" onClick={handleOnClick}>
          <div className="media-card__tags">
            {props.tags.map((tag, index) => (
              <div className="media-card__tag" key={index}>
                {tag}
              </div>
            ))}
          </div>

          <div className="media-card__date">{props.date}</div>
          <div className="media-card__details">{props.description}</div>

          {props.canOpen && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <div className="media-card__other">{children}</div>
            </Collapse>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;