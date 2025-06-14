import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { client } from "../../sanity";
import { HeaderCard, MediaCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { HeaderCardProps, MediaCardProps } from "~/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
      ...(await serverSideTranslations(locale as string, ["events", "common"])),
      blogPosts,
    },
  };
};

const EventsPage: NextPage<{ blogPosts: MediaCardProps[] }> = ({
  blogPosts,
}) => {
  const { t } = useTranslation();
  const [blogPost, setBlogPosts] = useState<MediaCardProps[]>(blogPosts);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<MediaCardProps[]>([]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    setSearchResults(filterPastEvents(input));
  };

  const filterPastEvents = (input: string) => {
    return blogPost.filter(
      (event) =>
        event.title.toLowerCase().includes(input.toLowerCase()) ||
        event.description.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <>
      <CommonMeta
        pageTitle={t("events:event_title")}
        pageDescription={t("events:event_message")}
        pagePath="events"
        pageImgWidth={1280}
        pageImgHeight={630}
      />
      <HeaderCard
        props={{
          headTitle: "",
          title: t("events:event_title"),
          content: t("events:event_message"),
        }}
      />
      <div className="events__body">
        <div className="events__header">
          {/* <span className="events__header__title">
            {t("events:event_past")}
          </span> */}
          <div className="events__search-bar">
            <img
              src="/tempImg/events/magnefying-glass.png"
              alt=""
              className="events__search-icon"
              width={20}
              height={22}
            />
            <input
              className="events__search"
              type="text"
              placeholder="search event"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <div className="events__body__past">
          {blogPost.map((post, index) => (
            <a href={post.link} key={index}>
              <MediaCard props={post} />
            </a>
          ))}

          {searchResults.length === 0 && searchInput !== "" && (
            <p>No results found.</p>
          )}
          {searchResults.length > 0 && (
            <>
              {searchResults.map((eventCard, index) => (
                <Link href={eventCard.link} key={index}>

                  <MediaCard props={eventCard} />

                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
