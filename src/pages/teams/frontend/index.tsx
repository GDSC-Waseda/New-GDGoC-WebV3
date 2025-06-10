import type { NextPage } from "next";
import { TeamCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { ImageCardProps, TeamCardProps, TeamHeaderCardProps } from "~/types";
import TeamHeaderCard from "~/components/Cards/TeamHeaderCard";
import { GetStaticProps } from "next";
import { client } from "../../../sanity";

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
  const card: TeamHeaderCardProps = {
    headTitle: "",
    title: "Frontend Team",
    content: "Waseda University's chapter of the Google Developer Student Club",
  };

  const imageCardProps: ImageCardProps = {
    title: "Haruki Oyama",
    content:
      "Hello there! 👋 My name is Haruki,  a second year student at Waseda University majoring in Computer Science and Communications Engineering. In this team, we craft user-centric interfaces and use code to develop lively websites and applications. I’m thrilled to craft projects in collaborations with other teams, expand my knowledge, and innovate remarkable experiences with all of you!",
    image:
      "/tempImg/leads/frontend_lead.jpg",
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
      <div className="header-padding">
        <TeamHeaderCard props={card} />
      </div>
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
