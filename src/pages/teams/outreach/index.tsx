import type { NextPage } from "next";
import { MemberCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { ImageCardProps, MemberCardProps, SectionCardProps } from "~/types";
import { SectionCard } from "~/components/Cards/SectionCard";
import { GetStaticProps } from "next";
import { MemberType, memberAtributes } from "../../../types";
import { client } from "../../../sanity";
import rawSections from "../team/sections.json";
import rawLeaders from "../team/leaders.json";
const sections: { [key: string]: SectionCardProps } = rawSections;
const leaders: { [key: string]: ImageCardProps } = rawLeaders;

const team = "Outreach";

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "member" && team == "${team.toLowerCase()}"]{
    name,
    program,
    school,
    grade,
    "imageUrl": image.asset->url
  }`;

  const members = await client.fetch(query);

  const dynamicTeamCards: MemberCardProps[] = members.map(
    (member: {
      name: any;
      imageUrl: any;
      program: any;
      school: any;
      grade: any;
    }) => ({
      title: member.name || "No Name",
      image: member.imageUrl || "/default-image-path.jpg",
      major: member.program || "No Program",
      school: member.school || "No School",
      year: member.grade || "No Year",
    })
  );

  return { props: { dynamicTeamCards } };
};

interface FrontendTeamProps {
  dynamicTeamCards: MemberCardProps[];
}

export const FrontendTeam: NextPage<FrontendTeamProps> = ({
  dynamicTeamCards,
}) => {
  const section: SectionCardProps = sections[team];
  const leader = leaders[team];
  return (
    <div className="team-page">
      <CommonMeta
        pageTitle={section.title}
        pageDescription={section.content}
        pagePath="team"
        pageImgWidth={1280}
        pageImgHeight={630}
      />
      <SectionCard props={section} />
      <ImageCard props={leader} />
      <h1 className="members-title">Meet Our {team} Team</h1>
      <div className="team-cards-container">
        {dynamicTeamCards.map((teamCard, index) => (
          <MemberCard key={index} props={teamCard} />
        ))}
      </div>
    </div>
  );
};

export default FrontendTeam;
