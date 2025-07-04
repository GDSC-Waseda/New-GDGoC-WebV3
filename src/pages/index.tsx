import type { NextPage } from "next";
import CommonMeta from "components/CommonMeta";
import Loading from "components/Loading";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HomeMediaCard } from "components/Cards/HomeMediaCard";
import HomeProjectCard from "components/Cards/HomeProjectCard";
import Link from "next/link";
import { client } from "../sanity";
import { MediaCardProps, ProjectCardProps } from "~/types";

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;
  const query = `*[_type == "blogPost"]{
    title,
    "imageUrl": mainImage.asset->url,
    tags,
    publishedAt,
    shortDesc,
    slug
  }`;
  const blogPostsResponse = await client.fetch(query);
  const blogPosts = blogPostsResponse.map(
    (post: {
      title: string;
      imageUrl: any;
      tags: string[];
      publishedAt: string;
      shortDesc: string;
      slug: {
        current: string;
      };
    }) => ({
      size: "m",
      title: post.title,
      image: post.imageUrl,
      tags: post.tags,
      date: new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      description: post.shortDesc,
      // to do fix link
      link: "/events/details/mini-solution-challenge-2023/",
      open: true,
      canOpen: false,
    })
  );

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["home", "common", "events"])),
      blogPosts
    },
  };
};

const Home: NextPage<{ blogPosts: MediaCardProps[] }> = ({
  blogPosts,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPosts] = useState<MediaCardProps[]>(blogPosts);

  const filterPastEvents = (input: string) => {
    return blogPost.filter(
      (event) =>
        event.title.toLowerCase().includes(input.toLowerCase()) ||
        event.description.toLowerCase().includes(input.toLowerCase())
    );
  };

  const sampleProjects: ProjectCardProps[] = [
    {
      title: "WasedaLine1",
      description: "A queue tracking project for university",
      imageUrl: "/wasedaLine.jpg",
      repoUrl: "https://github.com/s3nmith/WasedaLineWeb",
      team: "Team 1",
      projectId: "wasedaline01",
      members: ["Lahiru Udawatta"],
    },
    {
      title: "WasedaLine2",
      description: "A queue tracking project for university",
      imageUrl: "/wasedaLine.jpg",
      repoUrl: "https://github.com/s3nmith/WasedaLineWeb",
      team: "Team 3",
      projectId: "wasedaline03",
      members: ["Lahiru Udawatta"],
    },
    {
      title: "WasedaLine3",
      description: "A queue tracking project for university",
      imageUrl: "/wasedaLine.jpg",
      repoUrl: "https://github.com/s3nmith/WasedaLineWeb",
      team: "Team 3",
      projectId: "wasedaline03",
      members: ["Lahiru Udawatta"],
    },
  ];

  const [projects, setProjects] = useState<ProjectCardProps[]>(sampleProjects);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <CommonMeta pageTitle="Home" />
      <div className="home-section section-1">
        <div className="title-container">
          <div className="page-title">
            Google Developer <br /> Groups <br /> on Campus
          </div>
        </div>
        <div className="subtitle-container">
          <div className="subtitle">
            Waseda University
          </div>
        </div>
      </div>
      <div className="home-section section-2">
        <div className="description-container">
          <div className="header">
            {t("home:about_us")}
          </div>
          <div className="separator" />
          <div className="description-text">
            {t("home:about_us_text")}
          </div>
          <Link href="/about" className="learn-more-button">
            {t("home:learn_more")}
          </Link>
        </div>
      </div>
      <div className="home-section section-3">
        <div className="description-container">
          <div className="header">
            {t("home:teams")}
          </div>
          <div className="separator" />
          <div className="description-text">
            {t("home:teams_text")}
          </div>
          <Link href="/teams" className="learn-more-button">
            {t("home:learn_more")}
          </Link>
        </div>
      </div>
      <div className="home-section section-4">
        <div className="page-container">
          <div className="top-container">
            <div className="header">
              {t("home:projects")}
            </div>
            <div className="separator" />
            <div className="brief-text">
              {t("home:projects_text")}
            </div>
          </div>

          <div className="project-cards-container">
            {projects.map((project, index) => (
              <HomeProjectCard key={index} {...project} />
            ))}
          </div>

          <Link href="/project" className="learn-more-button">
            {t("home:learn_more")}
          </Link>
        </div>
      </div>
      <div className="home-section section-5">
        <div className="page-container">
          <div className="top-container">
            <div className="header">
              {t("home:events")}
            </div>
            <div className="separator" />
            <div className="brief-text">
              {t("home:events_text")}
            </div>
          </div>

          <div className="cards-container">
            {blogPost.map((post, index) => (
              <a href={post.link} key={index}>
                <HomeMediaCard props={post} />
              </a>
            ))}
          </div>

          <Link href="/events" className="learn-more-button">
            {t("home:learn_more")}
          </Link>
        </div>
      </div>
    </>
  )
};

export default Home;
