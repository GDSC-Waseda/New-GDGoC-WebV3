import type { NextPage } from "next";
import React, { useEffect, useState, useMemo } from "react";
import {
  HeaderCard,
  CategoryBar,
  YearBox,
  TeamCard,
} from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { HeaderCardProps, MemberCardProps } from "~/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import exteams from "./exteams.json";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { client } from "../../sanity";

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;

  const query = `*[_type == "member"]{
    team,
    name,
    program,
    school,
    grade,
    "imageUrl": image.asset->url
  }`;

  const members = await client.fetch(query);
  const groupedMembers: Record<string, MemberCardProps[]> = {};

  members.forEach((member: any) => {
    const card: MemberCardProps = {
      team: member.team || "No Team",
      title: member.name || "No Name",
      image: member.imageUrl || "/default-image-path.jpg",
      major: member.program || "No Program",
      school: member.school || "No School",
      year: member.grade || "No Year",
    };

    if (!groupedMembers[member.team]) {
      groupedMembers[member.team] = [];
    }
    groupedMembers[member.team].push(card);
  });
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["teams", "common"])),
      teamMemberData: groupedMembers,
    },
  };
};

export const TeamsPage: NextPage<{
  teamMemberData: Record<string, MemberCardProps[]>;
}> = ({ teamMemberData }) => {
  const { t } = useTranslation();

  const card: HeaderCardProps = {
    title: t("teams:team"),
    content: t("teams:team_mes"),
  };

  const teamLeaders: Array<{
    team: string;
    name?: string | null;
    image: string;
    image2: string | null;
    multiple: boolean;
    link?: string;
    color: string;
    showLearnMore?: boolean;
    linkedInUrl?: string;
  }> = useMemo(
    () => [
      {
        team: "Project",
        image: "project_lead.jpg",
        image2: null,
        multiple: false,
        link: "/project",
        color: "green",
        showLearnMore: true,
      },
      {
        team: "Backend",
        image: "backend_lead.jpg",
        image2: null,
        multiple: false,
        link: "/backend",
        color: "blue",
        showLearnMore: true,
      },
      {
        team: "Frontend",
        image: "frontend_lead.jpg",
        image2: null,
        multiple: false,
        link: "/frontend",
        color: "yellow",
        showLearnMore: true,
      },
      {
        team: "Education",
        image: "education_lead1.jpg",
        image2: "education_lead2.jpg",
        multiple: true,
        link: "/education",
        color: "red",
        showLearnMore: true,
      },
      {
        team: "Agile",
        image: "agile_lead.jpg",
        image2: null,
        multiple: false,
        link: "/agile",
        color: "blue",
        showLearnMore: true,
      },
      {
        team: "Outreach",
        image: "outreach_lead.jpg",
        image2: null,
        multiple: false,
        link: "/outreach",
        color: "red",
        showLearnMore: true,
      },
      {
        team: "Marketing",
        image: "marketing_lead.jpg",
        image2: null,
        multiple: false,
        link: "/marketing",
        color: "green",
        showLearnMore: true,
      },
      {
        team: "Finance",
        image: "finance_lead.jpg",
        image2: null,
        multiple: false,
        link: "/finance",
        color: "yellow",
        showLearnMore: true,
      },
    ],
    []
  );

  const [teamLeaderImages, setTeamLeaderImages] = useState(
    teamLeaders.map((leader) => leader.image)
  );

  const handleSwapClick = (index: number) => {
    setTeamLeaderImages((prevImages) => {
      const newImages = [...prevImages];
      const teamLeader = teamLeaders[index];

      if (teamLeader.multiple && teamLeader.image2) {
        newImages[index] =
          newImages[index] === teamLeader.image
            ? teamLeader.image2
            : teamLeader.image;
      }

      return newImages;
    });
  };

  const [selectedYear, setSelectedYear] = useState("GDSC 23/24");
  const [selectedTeam, setSelectedTeam] = useState("Project");

  const teamLeadersByYear: Record<
    string,
    Array<{
      team: string;
      name?: string | null;
      image: string;
      image2?: string | null;
      multiple?: boolean;
      link?: string;
      color: string;
      showLearnMore?: boolean;
      linkedInUrl?: string;
    }>
  > = useMemo(
    () => ({
      "GDSC 23/24": teamLeaders,
      "GDSC 22/23": exteams["GDSC 22/23"],
      "GDSC 21/22": exteams["GDSC 21/22"],
    }),
    [teamLeaders]
  );

  useEffect(() => {
    setTeamLeaderImages(
      teamLeadersByYear[selectedYear]?.map((leader) => leader.image)
    );
  }, [selectedYear, teamLeadersByYear]);

  const handleYearChange = (year: string) => {
    const container = document.querySelector(".team-leaders-container");
    const width = (container as HTMLElement)?.offsetWidth || 0;
    const years = Object.keys(teamLeadersByYear);
    const currentIndex = years.indexOf(selectedYear);
    const newIndex = years.indexOf(year);
    const direction = newIndex > currentIndex ? 1 : -1;

    if (container instanceof HTMLElement) {
      container.style.transform = `translateX(${direction * -width}px)`;

      setTimeout(() => {
        setSelectedYear(year);
        container.style.transition = "none";
        container.style.transform = `translateX(${direction * width}px)`;

        setTimeout(() => {
          container.style.transition = "transform 0.5s ease-in-out";
          container.style.transform = "translateX(0)";
        });
      }, 500);
    }
  };
  const filteredTeamLeaders = teamLeadersByYear[selectedYear] || [];

  const teams: string[] = Array.from(
    new Set(
      Object.values(teamLeadersByYear)
        .flat()
        .map((member) => member.team)
    )
  );
  const teamRefs: Record<string, React.RefObject<HTMLDivElement>> = {};
  teams.forEach((team) => {
    teamRefs[team] = React.createRef<HTMLDivElement>();
  });

  return (
    <div className="container team-page">
      <CommonMeta
        pageTitle={card.title}
        pageDescription={card.content}
        pagePath="team"
        pageImgWidth={1280}
        pageImgHeight={630}
      />
      <HeaderCard props={card} />

      <div className="team-filter">
        <YearBox
          years={Object.keys(teamLeadersByYear)}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
        <CategoryBar
          categories={teams}
          selectedCategory={selectedTeam}
          onCategoryChange={(team) => {
            setSelectedTeam(team);
            teamRefs[team]?.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        />
      </div>

      <div className="team-leaders-wrapper">
        <div className="team-leaders-container">
          {filteredTeamLeaders.map((teamCard, index) => (
            <div
              key={index}
              ref={teamRefs[teamCard.team]}
              className="team-leader"
            >
              <TeamCard
                year={selectedYear}
                team={teamCard.team}
                members={teamMemberData[teamCard.team.toLowerCase()] || []}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
