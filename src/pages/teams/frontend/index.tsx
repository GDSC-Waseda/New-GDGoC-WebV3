import type { NextPage } from "next";
import { TeamCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { ImageCardProps, TeamCardProps, SectionCardProps } from "~/types";
import { SectionCard } from "~/components/Cards/SectionCard";
import { GetStaticProps } from "next";
import { client } from "../../../sanity";
import sections from "../team/sections.json";

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "member" && team == "frontend"]{
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
    title: sections["Frontend"].title,
    content: sections["Frontend"].content,
  };

  const imageCardProps: ImageCardProps = {
    title: "Haruki Oyama",
    content:
      "Hello there! 👋 My name is Haruki,  a second year student at Waseda University majoring in Computer Science and Communications Engineering. In this team, we craft user-centric interfaces and use code to develop lively websites and applications. I’m thrilled to craft projects in collaborations with other teams, expand my knowledge, and innovate remarkable experiences with all of you!",
    image: "/tempImg/leads/frontend_lead.jpg",
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
