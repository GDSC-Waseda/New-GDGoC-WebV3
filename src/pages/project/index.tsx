import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import CommonMeta from "components/CommonMeta";
import HeaderCard from "components/Cards/HeaderCard";
import ProjectCard from "components/Cards/ProjectCard";
import { HeaderCardProps, ProjectCardProps } from "~/types";

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
  const headerCardProps: HeaderCardProps = {
    title: t("project:project_title"),
    content: t("project:project_message"),
  };

  const sampleProjects: ProjectCardProps[] = [
    {
      title: "WasedaLine",
      description: "A queue tracking project for university",
      imageUrl: "/wasedaLine.jpg",
      repoUrl: "https://github.com/s3nmith/WasedaLineWeb",
      members: [{ name: "Lahiru Udawatta", role: "Developer" }],
    },
  ];

  const [projects, setProjects] = useState<ProjectCardProps[]>(sampleProjects);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] =
    useState<ProjectCardProps[]>(projects);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
    const filteredProjects = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(input) ||
        project.description.toLowerCase().includes(input)
    );
    setSearchResults(filteredProjects);
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
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
