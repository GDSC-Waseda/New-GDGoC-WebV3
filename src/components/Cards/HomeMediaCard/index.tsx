import Image from "next/image";
import React, { useState } from "react";

import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";

import { MediaCardProps } from "~/types/index";

export const HomeMediaCard: React.FC<{
  children?: React.ReactNode;
  props: MediaCardProps;
}> = ({ children, props }) => {
  const [open, setOpen] = useState(props.open);

  const handleOnClick = () => setOpen(!open);

  return (
    <div className={`home-media-card ${props.size}`}>
      {props.image !== undefined ? (
        <div className="home-media-card__image-container">
          <Image
            className="home-media-card__image"
            src={props.image}
            alt="home-media-card"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <div className={`home-media-card__image-container ${props.size} none`} />
      )}
      <div className="home-media-card__detail-container" onClick={handleOnClick}>
        {props.title !== undefined && (
          <>
            {props.canOpen && (
              <div className="home-media-card__collapse">
                <div className="home-media-card__collapse-container">
                  {children !== undefined && open ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )}
                </div>
              </div>
            )}
            <div className="home-media-card__title">{props.title}</div>
            <div className="home-media-card__tags">
              <div className="home-media-card__tags">
                {props.tags.map((tag, index) => (
                  <div className="home-media-card__tag" key={index}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="home-media-card__date">{props.date}</div>
            <div className="home-media-card__details">{props.description}</div>
          </>
        )}
        {
          props.canOpen ? (
            <Collapse in={props.canOpen && open} timeout="auto" unmountOnExit>
              <div className={`home-media-card__other`}>
                {children !== undefined && children}
              </div>
            </Collapse>
          ) : null
          // <div className={`home-media-card__other`}>
          //   {children !== undefined && children}
          // </div>
        }
      </div>
    </div>
  );
};

export default HomeMediaCard;
