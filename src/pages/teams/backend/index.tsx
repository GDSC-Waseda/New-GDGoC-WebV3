import type { NextPage } from "next";
import { HeaderCard, TeamCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import {
  HeaderCardProps,
  ImageCardProps,
  TeamCardProps,
  TeamHeaderCardProps,
} from "~/types";
import TeamHeaderCard from "~/components/Cards/TeamHeaderCard";
import { GetStaticProps } from "next";
import { MemberType, memberAtributes } from "../../../types";
import { client } from "../../../sanity";

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "member" && team == "backend"]{
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

interface BackendTeamProps {
  dynamicTeamCards: TeamCardProps[];
}

export const BackendTeam: NextPage<BackendTeamProps> = ({
  dynamicTeamCards,
}) => {
  const card: TeamHeaderCardProps = {
    headTitle: "",
    title: "Backend Team",
    content: "Waseda University's chapter of the Google Developer Student Club",
    featureList: [
      "Benifit of feature",
      "Benifit of feature",
      "Benifit of feature",
    ],
  };

  const imageCardProps: ImageCardProps = {
    title: "Gunjan Srivastava",
    content: "Hello everyone! I’m Gunjan, a third year student at Waseda University studying Computer Science and Communications Engineering. In my team, I hope to drive development through implementation of creative solutions (and a little bit of ChatGPT). Together, let's push boundaries and unlock new possibilities, one step at a time!",
    image: "/tempImg/leads/backend_lead.jpg",
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

export default BackendTeam;
