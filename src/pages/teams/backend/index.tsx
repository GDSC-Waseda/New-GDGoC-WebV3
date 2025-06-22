import type { NextPage } from "next";
import { HeaderCard, MemberCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import {
  HeaderCardProps,
  ImageCardProps,
  MemberCardProps,
  SectionCardProps,
} from "~/types";
import { SectionCard } from "~/components/Cards/SectionCard";
import { GetStaticProps } from "next";
import { MemberType, memberAtributes } from "../../../types";
import { client } from "../../../sanity";
import sections from "../team/sections.json";
import leaders from "../team/leaders.json";

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "member" && team == "backend"]{
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

interface BackendTeamProps {
  dynamicTeamCards: MemberCardProps[];
}

export const BackendTeam: NextPage<BackendTeamProps> = ({
  dynamicTeamCards,
}) => {
  const card: SectionCardProps = {
    title: sections["backend"].title,
    content: sections["backend"].content,
  };

  const imageCardProps: ImageCardProps = {
    title: leaders["backend"].title,
    content: leaders["backend"].content,
    image: leaders["backend"].image,
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
          <MemberCard key={index} props={teamCard} />
        ))}
      </div>
    </div>
  );
};

export default BackendTeam;
