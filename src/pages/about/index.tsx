import type { NextPage } from "next";
import Image from "next/image";
import { HeaderCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { HeaderCardProps, TextCardProps } from "~/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import { FaLinkedin, FaGithub } from "react-icons/fa";

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

  const currentLead: LeadInfo = {
    name: t("about:takumi"),
    image: "/tempImg/leads/lead.jpg",
    linkedin: "https://www.linkedin.com/in/takumi-otsuka/",
    github: "https://github.com/ronin207",
    graduationDate: t("about:september24"),
    major: t("about:mathematicalScience"),
    school: t("about:FSE"),
    period: "2023~ ",
  };
  const previousLeads: LeadInfo[] = [
    {
      name: "Advaith Sriram",
      image: "/tempImg/leads/advaith.jpg",
      linkedin: "https://www.linkedin.com/in/advaith-sriram/",
      graduationDate: t("about:september23"),
      major: t("about:mechanicalEngineering"),
      school: t("about:CSE"),
      period: "2022-2023",
    },
    {
      name: "Rose Niousha",
      image: "/tempImg/leads/rose.jpg",
      linkedin: "https://www.linkedin.com/in/rose-niousha/",
      graduationDate: t("about:april23"),
      major: t("about:computerScience"),
      school: t("about:FSE"),
      period: "2021-2022",
    },
  ];

  const card: HeaderCardProps = {
    headTitle: "",
    title: t("about:header"),
    content: "",
    button: true,
    buttonText: t("about:discButt"),
  };

  const whatWeDo: TextCardProps = {
    title: t("about:what"),
    content: t("about:motomesg"),
  };

  const leadsThoughtsContent = t("about:leadmesg");

  return (
    <div className="about-page">
      <CommonMeta
        pageTitle={card.title}
        pageDescription={card.content}
        pagePath="about"
        pageImgWidth={1280}
        pageImgHeight={630}
      />
      <HeaderCard props={card} />

      {/* What We Do Section */}
      <div className="textCard__section">
        <h2 className="textCard__section__title">{whatWeDo.title}</h2>
        <p className="textCard__section__content">{whatWeDo.content}</p>
      </div>

      {/* Current Lead Section */}
      <div className="current-lead-section">
        <h2 className="section-title">{t("about:currentLead")}</h2>
        <div className="lead-card">
          <div className="lead-image">
            <Image
              src={currentLead.image}
              alt={currentLead.name}
              width={200}
              height={200}
            />
          </div>
          <div className="lead-info">
            <h3 className="lead-name">{currentLead.name}</h3>
            <p className="lead-graduation">
              {t("about:graduationDate")}: {currentLead.graduationDate}
            </p>
            <p className="lead-major">
              {t("about:major")}: {currentLead.major}
            </p>
            <p className="lead-school">
              {t("about:school")}: {currentLead.school}
            </p>
            <div className="lead-links">
              <a
                href={currentLead.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href={currentLead.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Leads Section */}
      <div className="previous-leads-section">
        <h2 className="section-title">{t("about:previousLeads")}</h2>
        <div className="previous-leads-container">
          {previousLeads.map((lead, index) => (
            <div key={index} className="previous-lead-card">
              <div className="previous-lead-image">
                <Image
                  src={lead.image}
                  alt={lead.name}
                  width={150}
                  height={150}
                />
              </div>
              <div className="previous-lead-info">
                <h4 className="previous-lead-name">{lead.name}</h4>
                <p className="previous-lead-graduation">
                  {t("about:graduationDate")}: {lead.graduationDate}
                </p>
                <p className="previous-lead-major">
                  {t("about:major")}: {lead.major}
                </p>
                <p className="previous-lead-school">
                  {t("about:school")}: {lead.school}
                </p>
                <div className="previous-lead-links">
                  <a
                    href={lead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
