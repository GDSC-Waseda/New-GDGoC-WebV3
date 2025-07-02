import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { useMemo, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import CommonMeta from "components/CommonMeta";
import HeaderCard from "components/Cards/HeaderCard";
import ProjectCard from "components/Cards/ProjectCard";
import { HeaderCardProps, ProjectCardProps } from "~/types";
import { CategoryBar, YearBox } from "~/components/Cards";
import React from "react";
import projectData from "./projects.json";

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "project",
        "common",
      ])),
    },
  };
};

const ProjectPage: NextPage = () => {
  const { t } = useTranslation();

  const [selectedYear, setSelectedYear] = useState("GDSC 23/24");
  const [selectedTeam, setSelectedTeam] = useState("Team 1");

  const projectsForYear = useMemo(() => {
    return (
      (projectData as Record<string, Record<string, ProjectCardProps>>)[
        selectedYear
      ] || {}
    );
  }, [selectedYear]);

  const allProjects = useMemo(() => {
    return Object.entries(projectsForYear).map(([team, project]) => ({
      team,
      project,
    }));
  }, [projectsForYear]);

  const teams = useMemo(() => Object.keys(projectsForYear), [projectsForYear]);

  const teamRefs: Record<
    string,
    React.RefObject<HTMLDivElement>
  > = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {};
    teams.forEach((team) => {
      refs[team] = React.createRef<HTMLDivElement>();
    });
    return refs;
  }, [teams]);

  const headerCardProps: HeaderCardProps = {
    title: t("project:project_title"),
    content: t("project:project_message"),
  };

  const handleYearChange = (year: string) => {
    const container = document.querySelector(".team-leaders-container");
    const width = (container as HTMLElement)?.offsetWidth || 0;
    const years = Object.keys(projectData);
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
    } else {
      setSelectedYear(year);
    }
  };

  return (
    <>
      <CommonMeta
        pageTitle={headerCardProps.title}
        pageDescription={headerCardProps.content}
        pagePath="projects"
        pageImgWidth={1280}
        pageImgHeight={630}
      />
      <HeaderCard props={headerCardProps} />
      <div className="project-filter">
        <YearBox
          years={Object.keys(projectData)}
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

      <div className="projectContainer">
        <div className="projectGrid">
          {allProjects.map(({ team, project }, index) => (
            <div key={index} ref={teamRefs[team]}>
              <h3 className="teamHeading">{team}</h3>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
