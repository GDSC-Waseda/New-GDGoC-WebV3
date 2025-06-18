import type { NextPage } from "next";
import { HeaderCard, TeamCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import {
  HeaderCardProps,
  ImageCardProps,
  TeamCardProps,
  SectionCardProps,
} from "~/types";
import { SectionCard } from "~/components/Cards/SectionCard";
import { GetStaticProps } from "next";
import { MemberType, memberAtributes } from "../../../types";
import { client } from "../../../sanity";
import sections from "../team/sections.json";

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "member" && team == "project"]{
    name,
    program,
    school,
    grade,
    "imageUrl": image.asset->url
  }`;

  const members = await client.fetch(query);

  const dynamicTeamCards: TeamCardProps[] = members.map(
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
  dynamicTeamCards: TeamCardProps[];
}

export const FrontendTeam: NextPage<FrontendTeamProps> = ({
  dynamicTeamCards,
}) => {
  const card: SectionCardProps = {
    title: sections["Project"].title,
    content: sections["Project"].content,
  };

  const imageCardProps: ImageCardProps = {
    title: "Priya Mukkundi",
    content:
      "Hi! I’m Priya, a third year student majoring in Economics at Waseda University. Project Team’s main goals are to foster innovation, efficiently deliver projects, and bridge technical and non-technical teams through effective communication and collaboration. No matter your tech background, we're thrilled to collaborate with you on your unique ideas and bring practical projects to life.😄",
    image: "/tempImg/leads/project_lead.jpg",
    imagePosition: "left",
  };

  return (
    <div className="team-page">
      <CommonMeta
        pageTitle={card.title}
        pageDescription={card.content}
        pagePath="team"
        pageImgWidth={1280}
        pageImgHeight={630}
      />
      <SectionCard props={card} />
      <ImageCard props={imageCardProps} />
      <h1 className="members-title">Meet Our Team</h1>
      <div className="team-cards-container">
        {dynamicTeamCards.map((teamCard, index) => (
          <TeamCard key={index} props={teamCard} />
        ))}
      </div>
    </div>
  );
};

export default FrontendTeam;
