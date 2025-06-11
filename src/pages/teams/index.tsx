import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { HeaderCard, CategoryBar } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { HeaderCardProps } from "~/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import exteams from "./exteams.json";
import { FaLinkedin } from "react-icons/fa";

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
    headTitle: "",
    title: t("teams:team"),
    content: t("teams:team_mes"),
  };

  const teamLeaders: Array<{
    name: string;
    image: string;
    image2: string | null;
    multiple: boolean;
    link?: string;
    color: string;
    showLearnMore?: boolean;
    linkedInUrl?: string;
  }> = [
    {
      name: t("teams:project"),
      image: "project_lead.jpg",
      image2: null,
      multiple: false,
      link: "/project",
      color: "green",
      showLearnMore: true,
    },
    {
      name: t("teams:backend"),
      image: "backend_lead.jpg",
      image2: null,
      multiple: false,
      link: "/backend",
      color: "blue",
      showLearnMore: true,
    },
    {
      name: t("teams:frontend"),
      image: "frontend_lead.jpg",
      image2: null,
      multiple: false,
      link: "/frontend",
      color: "yellow",
      showLearnMore: true,
    },
    {
      name: t("teams:education"),
      image: "education_lead1.jpg",
      image2: "education_lead2.jpg",
      multiple: true,
      link: "/education",
      color: "red",
      showLearnMore: true,
    },
    {
      name: t("teams:agile"),
      image: "agile_lead.jpg",
      image2: null,
      multiple: false,
      link: "/agile",
      color: "blue",
      showLearnMore: true,
    },
    {
      name: t("teams:outreach"),
      image: "outreach_lead.jpg",
      image2: null,
      multiple: false,
      link: "/outreach",
      color: "red",
      showLearnMore: true,
    },
    {
      name: t("teams:marketing"),
      image: "marketing_lead.jpg",
      image2: null,
      multiple: false,
      link: "/marketing",
      color: "green",
      showLearnMore: true,
    },
    {
      name: t("teams:finance"),
      image: "finance_lead.jpg",
      image2: null,
      multiple: false,
      link: "/finance",
      color: "yellow",
      showLearnMore: true,
    },
  ];

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

  const teamLeadersByYear: Record<
    string,
    Array<{
      name: string;
      image: string;
      image2?: string | null;
      multiple?: boolean;
      link?: string;
      color: string;
      showLearnMore?: boolean;
      linkedInUrl?: string;
    }>
  > = {
    "GDSC 23/24": teamLeaders,
    "GDSC 22/23": exteams["GDSC 22/23"],
    "GDSC 21/22": exteams["GDSC 21/22"],
  };

  useEffect(() => {
    setTeamLeaderImages(
      teamLeadersByYear[selectedYear]?.map((leader) => leader.image)
    );
  }, [selectedYear]);

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

      <div className="bold-text">
        <a>
          {t("teams:team_second_mes")}
          <br></br>
        </a>
      </div>

      <CategoryBar
        categories={Object.keys(teamLeadersByYear)}
        selectedCategory={selectedYear}
        onCategoryChange={handleYearChange}
      />
      <div className="team-leaders-wrapper">
        <div className="team-leaders-container">
          {filteredTeamLeaders.map((teamCard, index) => (
            <div key={index} className="team-leader">
              {teamCard.multiple === true ? (
                <div className="team-leader-swap-container">
                  <a
                    className="team-leader-link"
                    href={`/teams/${teamCard.link}`}
                  >
                    <img
                      className={`team-leader-image ${teamCard.color}`}
                      src={`/tempImg/leads/${teamLeaderImages[index]}`}
                      alt="team leader"
                    />
                  </a>
                  <button
                    className="team-leader-swap-button"
                    onClick={() => handleSwapClick(index)}
                  >
                    <img
                      className="team-leader-swap"
                      src={`/tempImg/arrows-${teamCard.color}.png`}
                      alt="arrows"
                    />
                  </button>
                </div>
              ) : (
                <a
                  className="team-leader-link"
                  href={`/teams/${teamCard.link}`}
                >
                  <img
                    className={`team-leader-image ${teamCard.color}`}
                    src={`/tempImg/leads/${teamLeaderImages[index]}`}
                    alt="team leader"
                  />
                </a>
              )}
              <div className="team-leader-name">{teamCard.name}</div>
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
