import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  repoUrl: string;
  team: string;
  projectId: string;
  members?: string[];
}

const HomeProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  repoUrl,
  members,
}) => {
  return (
    <div className="homeProjectCard">
      {imageUrl && (
        <div className="imageContainer">
          <Image
            src={imageUrl}
            alt={`${title} image`}
            layout="fill"
            objectFit="cover"
            className="image"
          />
        </div>
      )}
      <div className="cardBody">
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
        {members && (
          <div className="contributors">
            <strong>Contributors:</strong>
            <ul>
              {members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        )}
        <Link href={repoUrl} className="githubLink">
          View on GitHub
        </Link>
      </div>
    </div>
  );
};

export default HomeProjectCard;
