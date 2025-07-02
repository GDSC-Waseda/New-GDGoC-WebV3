import {
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { client } from "../../sanity";
import { HeaderCard, MediaCard } from "components/Cards/index";
import CommonMeta from "components/CommonMeta";
import { HeaderCardProps, MediaCardProps } from "~/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CalendarView from "src/components/Calendar/index";

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

  const blogPosts: MediaCardProps[] = blogPostsResponse.map(
    (post: {
      title: string;
      imageUrl: any;
      tags: string[];
      publishedAt: string;
      shortDesc: string;
      slug: { current: string };
    }) => ({
      size: "m",
      title: post.title,
      image: post.imageUrl,
      tags: post.tags,
      date: post.publishedAt, 
      description: post.shortDesc,
      link: `/events/details/${post.slug.current}`,
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<MediaCardProps[]>([]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    setSearchResults(filterPastEvents(input));
  };

  const filterPastEvents = (input: string) => {
    return blogPosts.filter(
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
          title: t("events:event_title"),
          content: t("events:event_message"),
        }}
      />

      {/* <div className="events__header">
        <button onClick={() => setShowCalendar((prev) => !prev)}>
          {showCalendar ? "Show List View" : "Show Calendar View"}
        </button>
      </div> */}

      <div className="events__body">
        {/* {showCalendar ? (
          <CalendarView/>
        ) : (
          <div className="events__body__past">
            {blogPosts.map((post, index) => (
              <a href={post.link} key={index}>
                <MediaCard props={post} />
              </a>
            ))}
          </div>
        )} */}
         <div className="events__body__past">
            {blogPosts.map((post, index) => (
              <a href={post.link} key={index}>
                <MediaCard props={post} />
              </a>
            ))}
          </div>
      </div>
    </>
  );
};

export default EventsPage;
