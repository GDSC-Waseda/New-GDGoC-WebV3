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
  const query = `*[_type == "member" && team == "agile"]{
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

interface AgileTeamProps {
  dynamicTeamCards: TeamCardProps[];
}

export const AgileTeam: NextPage<AgileTeamProps> = ({ dynamicTeamCards }) => {
  const card: TeamHeaderCardProps = {
    headTitle: "",
    title: "Agile Team",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  const imageCardProps: ImageCardProps = {
    title: "Lahiru Udawatta",
    content:
      "Hoi everyone 🙌, my name's Lahiru, and I'm honored to be the lead of the Agile team for GDSC Waseda. Our dynamic team uses the Agile methodology, infusing industry-oriented practices into our web development projects. The sleek website you're currently browsing is brought to you by my team ;). Excited to see what we can build this year with all of you!",
    image:
      "/tempImg/leads/agile_lead.jpg",
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

export default AgileTeam;
