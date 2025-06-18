import type { NextPage } from "next";
import { HeaderCard, TeamCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { ImageCardProps, TeamCardProps, SectionCardProps } from "~/types";
import { SectionCard } from "~/components/Cards/SectionCard";
import { GetStaticProps } from "next";
import { MemberType, memberAtributes } from "../../../types";
import { client } from "../../../sanity";
import sections from "../team/sections.json";
import leaders from "../team/leaders.json";

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "member" && team == "Finance"]{
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

interface FinanceTeamProps {
  dynamicTeamCards: TeamCardProps[];
}

export const FinanceTeam: NextPage<FinanceTeamProps> = ({
  dynamicTeamCards,
}) => {
  const card: SectionCardProps = {
    title: sections["Finance"].title,
    content: sections["Finance"].content,
  };

  const imageCardProps: ImageCardProps = {
    title: leaders["Finance"].title,
    content: leaders["Finance"].content,
    image: leaders["Finance"].image,
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
      {/* <h1 className="members-title">Meet Our Team</h1> */}
      <div className="team-cards-container">
        {dynamicTeamCards.map((teamCard, index) => (
          <TeamCard key={index} props={teamCard} />
        ))}
      </div>
    </div>
  );
};

export default FinanceTeam;
