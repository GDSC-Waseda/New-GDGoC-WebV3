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
      {props.image !== undefined ? (
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
        <div className={`media-card__image-container ${props.size} none`} />
      )}
      <div className="media-card__detail-container" onClick={handleOnClick}>
        {props.title !== undefined && (
          <>
            {props.canOpen && (
              <div className="media-card__collapse">
                <div className="media-card__collapse-container">
                  {children !== undefined && open ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )}
                </div>
              </div>
            )}
            <div className="media-card__title">{props.title}</div>
            <div className="media-card__tags">
              <div className="media-card__tags">
                {props.tags.map((tag, index) => (
                  <div className="media-card__tag" key={index}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="media-card__date">{props.date}</div>
            <div className="media-card__details">{props.description}</div>
          </>
        )}
        {
          props.canOpen ? (
            <Collapse in={props.canOpen && open} timeout="auto" unmountOnExit>
              <div className={`media-card__other`}>
                {children !== undefined && children}
              </div>
            </Collapse>
          ) : null
          // <div className={`media-card__other`}>
          //   {children !== undefined && children}
          // </div>
        }
      </div>
    </div>
  );
};

export default MediaCard;
