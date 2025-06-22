"use client";

import React, { useEffect, useState } from "react";
import { MemberCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { ImageCardProps, MemberCardProps, SectionCardProps } from "~/types";
import { SectionCard } from "~/components/Cards/SectionCard";
import { MemberType } from "../../../types";
import { client } from "../../../sanity";
import rawSections from "../../../../src/pages/teams/team/sections.json";
import rawLeaders from "../../../../src/pages/teams/team/leaders.json";

const sections: { [key: string]: SectionCardProps } = rawSections;
const leaders: { [key: string]: ImageCardProps } = rawLeaders;

interface TeamCardProps {
  team: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const [dynamicTeamCards, setDynamicTeamCards] = useState<MemberCardProps[]>([]);
console.log("チームだよ: ", team)
  useEffect(() => {
    const fetchMembers = async () => {
      const query = `*[_type == "member" && team == "${team}"]{
        name,
        program,
        school,
        grade,
        "imageUrl": image.asset->url
      }`;
      const members = await client.fetch(query);
      const cards: MemberCardProps[] = members.map((member: any) => ({
        title: member.name || "No Name",
        image: member.imageUrl || "/default-image-path.jpg",
        major: member.program || "No Program",
        school: member.school || "No School",
        year: member.grade || "No Year",
      }));
      setDynamicTeamCards(cards);
    };

    fetchMembers();
  }, [team]);

  const section = sections[team];
  const leader = leaders[team];

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
      <ImageCard props={{ ...leader, imagePosition: "left" }} />
      <h1 className="members-title">Meet Our {team} Team</h1>
      <div className="team-cards-container">
        {dynamicTeamCards.map((card, index) => (
          <MemberCard key={index} props={card} />
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
