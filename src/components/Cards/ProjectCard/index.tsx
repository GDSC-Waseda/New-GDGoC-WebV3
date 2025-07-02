import Link from "next/link";
import Image from "next/image";
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

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  repoUrl,
  team,
  projectId,
  members = [],
}) => {
  return (
    <Link
      href={{
        pathname: "/project/projects_details",
        query: { id: projectId },
      }}
      passHref
    >
      <div className="projectCardWrapper cursor-pointer">
        <div className="projectCard">
          {imageUrl && (
            <div className="imageContainer">
              <Image
                src={imageUrl}
                alt={`${title} image`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="cardBody">
            <h5 className="title">{title}</h5>
            <p className="description">{description}</p>
            <span className="githubLink">View on GitHub</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
