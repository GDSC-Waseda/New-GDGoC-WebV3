import type { NextPage } from "next";
import React, { useState } from "react";
import {
  CategoryBar,
  HeaderCard,
  ImageCard,
  SectionCard,
} from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import {
  HeaderCardProps,
  TextCardProps,
  ImageCardProps,
  SectionCardProps,
} from "~/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import rawLeads from "../../../src/pages/about/leads.json";
import rawSections from "../../../src/pages/about/sections.json";

const sections: { [key: string]: SectionCardProps } = rawSections;
const leads: { [year: string]: ImageCardProps } = rawLeads;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["about", "common"])),
    },
  };
};

interface LeadInfo {
  name: string;
  image: string;
  linkedin: string;
  github?: string;
  graduationDate: string;
  major: string;
  school: string;
  period: string;
}

export const AboutPage: NextPage = () => {
  const { t } = useTranslation();

  const card: HeaderCardProps = {
    title: t("about:header"),
    content: t("about:motomesg"),
  };

  const years: string[] = Array.from(Object.keys(leads));
  const [selectedYear, setSelectedYear] = useState("GDSC 23/24");

  const teamRefs: Record<string, React.RefObject<HTMLDivElement>> = {};
  Object.keys(leads).forEach((year) => {
    teamRefs[year] = React.createRef<HTMLDivElement>();
  });

  return (
    <div className="container about">
      <CommonMeta
        pageTitle={card.title}
        pageDescription={card.content}
        pagePath="about"
        pageImgWidth={1280}
        pageImgHeight={630}
      />
      <HeaderCard props={card} />

      <div className="team-filter">
        <CategoryBar
          categories={years}
          selectedCategory={selectedYear}
          onCategoryChange={(year) => {
            console.log("innner year: ", year);
            setSelectedYear(year);
            teamRefs[year]?.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        />
      </div>

      <div className="team-leaders-wrapper">
        <div className="team-leaders-container">
          {Object.entries(leads).map(([year, lead], index) => (
            <div key={index} ref={teamRefs[year]} className="team-leader">
              <SectionCard props={sections[year]} />
              <ImageCard props={lead} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
