import React, { useEffect, useState } from "react";
import { MemberCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { ImageCardProps, MemberCardProps, SectionCardProps } from "~/types";
import { SectionCard } from "~/components/Cards/SectionCard";
import rawSections from "../../../../src/pages/teams/sections.json";
import rawLeaders from "../../../../src/pages/teams/leaders.json";

const sections: { [key: string]: SectionCardProps } = rawSections;
const leaders: { [year: string]: { [key: string]: ImageCardProps } } =
  rawLeaders;

interface TeamCardProps {
  year: string;
  team: string;
  members: MemberCardProps[];
}

export const TeamCard: React.FC<TeamCardProps> = ({ year, team, members }) => {
  const section = sections[team];
  const leader = leaders[year][team];

  if (!section || !leader) return <div>Invalid Team Name</div>;
  return (
    <div className="team-page">
      <CommonMeta
        pageTitle={section.title}
        pageDescription={section.content}
        pagePath={`teams/${team}`}
        pageImgWidth={1280}
        pageImgHeight={630}
      />
      <SectionCard props={section} />
      <ImageCard props={leader} />
      {(year === "GDSC 23/24" || year === "GDGoC 24/25") &&
        members &&
        members.length > 0 && (
          <div>
            <h1 className="members-title">Meet Our {team} Team</h1>
            <div className="team-cards-container">
              {members.map((card, index) => (
                <MemberCard key={index} props={card} />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default TeamCard;
