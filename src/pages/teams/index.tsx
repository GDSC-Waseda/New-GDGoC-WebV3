import type { NextPage } from "next";
import React, { useEffect, useState, useMemo } from "react";
import { HeaderCard, CategoryBar, YearBox } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { HeaderCardProps } from "~/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import exteams from "./exteams.json";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["teams", "common"])),
    },
  };
};

export const TeamsPage: NextPage = () => {
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
    <div className="team-page">
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
              {teamCard.multiple === true ? (
                <div className="team-leader-swap-container">
                  <a
                    className="team-leader-link"
                    href={`/teams/${teamCard.link}`}
                  >
                    <Image
                      className={`team-leader-image ${teamCard.color}`}
                      src={`/tempImg/leads/${teamLeaderImages[index]}`}
                      width={220}
                      height={220}
                      alt="team leader"
                    />
                  </a>
                  <button
                    className="team-leader-swap-button"
                    onClick={() => handleSwapClick(index)}
                  >
                    <Image
                      className="team-leader-swap"
                      src={`/tempImg/arrows-${teamCard.color}.png`}
                      width={220}
                      height={220}
                      alt="arrows"
                    />
                  </button>
                </div>
              ) : (
                <a
                  className="team-leader-link"
                  href={`/teams/${teamCard.link}`}
                >
                  <Image
                    className={`team-leader-image ${teamCard.color}`}
                    src={`/tempImg/leads/${teamLeaderImages[index]}`}
                    width={220}
                    height={220}
                    alt="team leader"
                  />
                </a>
              )}
              <div className="team-leader-name">{teamCard.team}</div>
              {teamCard.showLearnMore === true ? (
                <a
                  className="team-leader-link"
                  href={`/teams/${teamCard.link}`}
                >
                  {t("teams:learn_more")}
                </a>
              ) : teamCard.linkedInUrl ? (
                <a
                  className="team-leader-linkedin"
                  href={teamCard.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
