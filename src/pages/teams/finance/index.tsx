import type { NextPage } from "next";
import { HeaderCard, TeamCard, ImageCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { ImageCardProps, TeamCardProps, TeamHeaderCardProps } from "~/types";
import TeamHeaderCard from "~/components/Cards/TeamHeaderCard";
import { GetStaticProps } from "next";
import { MemberType, memberAtributes } from "../../../types";
import { client } from "../../../sanity";

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
  const card: TeamHeaderCardProps = {
    headTitle: "",
    title: "Finance Team",
    content: "Waseda University's chapter of the Google Developer Student Club",
  };

  const imageCardProps: ImageCardProps = {
    title: "Hyonjoon PARK",
    content: "Hey there! 😊 I'm Hyonjoon, a junior at Waseda University's School of International Liberal Studies (SILS). I'm thrilled to serve as the team lead for GDSC Waseda's Finance Team this year. Our team plays a vital role in managing and optimizing project finances, ensuring the success of our tech initiatives. I'm looking forward to a fantastic year ahead and can't wait to collaborate with you and our GDSC community to achieve great things together!",
    image: "/tempImg/leads/finance_lead.jpg",
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
