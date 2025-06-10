import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ArticlePage: NextPage = () => {
  const article = {
    title: "Mini Solution Challenge 2023",
    author: "Priya Srivastava & Irfan Nurhadi Satria",
    date: "Sep 5, 2023",
    // content: {},
    // image: "Image Path Here",
    tags: ["Solution Challenge", "Demo Day"],
    length: "2",
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="article">
      <h1 className="article__title">{article.title}</h1>
      <div className="article__author">
        <div className="article__author-image-left">
          <img src="/tempImg/leads/backend_lead.jpg" alt="author_image" />
        </div>
        <div className="article__author-image">
          <img src="/tempImg/events/irfan.png" alt="author_image" />
        </div>
        <div className="article__author-text">
          <p className="article__author-names">
            {article.author}・
            <a className="article__author-info" href="/404">
              View
            </a>
          </p>
          <p className="article__length">
            {article.length} min read ・ {article.date}
          </p>
        </div>
      </div>

      <hr />

      <div>
        <img className="article__image" src="/tempImg/events/mini-231.png" />
      </div>

      <div>
        <p>
          GDSC Waseda held our "Mini Solution Challenge 2023" on 14th July 2023
          at the Google Japan Office with over 50 participants. This event
          showcased the different teams that participated in the Solution
          Challenge 2023 from GDSC Waseda.
        </p>
        <p>
          The GDSC Solution Challenge is a competition held annually by Google,
          where students from GDSC Chapters all over the world form teams of 2-4
          developers to create a solution that solves or addresses at least one
          of{" "}
          <a
            className="article__link"
            target="_blank"
            href="https://developers.google.com/community/gdsc-solution-challenge/UN-goals"
          >
            {" "}
            the 17 United Nations Sustainable Development Goals
          </a>
          . The Mini Solution Challenge is a small-scale version of the Solution
          Challenge demo day, for the teams to present their unique projects.
        </p>
        <p>
          This year four teams participated in the events and presented their
          solutions for different SDGs.
        </p>
        <br />

        {/* Team Cheezu */}
        <h2 className="article__h2">Team Cheezu</h2>
        <p>
          Team Cheezu (Takumi Otsuka, Hosu Choi, Khaled Mohammed, Sien Peralta)
          focused on SDG 3 (Good Health and Wellbeing) by helping guardians
          watch over elderly dementia patients through shared Google Maps making
          it easy to track patients when they are outside. If they are lost,
          they will automatically be redirected to a safe space.
        </p>

        {/* Team Gaijin Recycle */}
        <h2 className="article__h2">Team Gaijin Recycle</h2>
        <p>
          Team Gaijin Recycle (Lahiru Udawatta, Haruki Oyama, Jimin Park, Kohta
          Kaneda) targeted SDG 12 (Responsible Consumption and Production) to
          ensure responsible consumption and production pattern by making sure
          that foreigners living in Japan can live responsibly and sort out
          trashes in their daily lives according to each city's rules.
        </p>

        {/* Team OPLAND */}
        <h2 className="article__h2">Team OPLAND</h2>
        <p>
          Team OPLAND (Irfan Satria, Haruka Takahira, Yao Chengxian) fulfilled
          SDG 8 (Decent Work and Economic Growth) by promoting sustained,
          inclusive, and sustainable economic growth through their app “Opland”
          which seeks to improve small business productivity through the help of
          an AI assistant with business thinking.
        </p>

        {/* Team myBasket */}
        <h2 className="article__h2">Team myBasket</h2>
        <p>
          Team myBasket (Gunjan Srivastava, Aditya Sundar, Priya Mukkundi,
          Cedric Purwanto) targeted SDG 12 (Responsible Consumption and
          Production) by creating an application that allowed for efficient
          tracking of expiry dates. The app had three distinct features to help
          users reduce their amount of food waste - shelf monitoring, creating
          shopping lists, and budget tracking.
        </p>
      </div>
      <br />

      <div className="article__image-container">
        <img src="/tempImg/events/mini-232.png" />
      </div>
      <div>
        <p>
          The Mini Solution Challenge proceeded with a networking and voting
          session during which the audience voted for the team with the best
          solution. The successful event was able to be held due to Reisa
          Matsuda san and the Google Japan Team. Because of this, we were able
          to hold the event at the Google Japan Office and graciously provided
          catering for our wonderful audience.
        </p>
        <p>
          Advaith, the lead of GDSC Waseda 2022-23, was delighted with the
          success of the event after months of planning and corresponding with
          the Google Japan Team. Googlers who attended also expressed that they
          were impressed with the quality of the presentations. Moreover, these
          events have promoted our chapter to students from various
          universities, fostering team expansion and collaboration with chapters
          across Japan.
        </p>
        <p>
          The Mini Solution Challenge 2023 concluded with the awarding of the
          winning team - Team Gaijin Recycle. This team was also one of the only
          two teams from Japan to be in the{" "}
          <a
            className="article__link"
            target="_blank"
            href="https://developers.google.com/community/gdsc-solution-challenge/winners"
          >
            {" "}
            Top 100 teams
          </a>{" "}
          that qualified for the Solution Challenge 2023.
        </p>
        <p>
          We look forward to hosting more large-scale events and showcasing
          unique solutions!
        </p>
      </div>

      <div className="article__footer">
        <div className="article__tags">
          {article.tags.map((tag, index) => (
            <div className="article__tag" key={index}>
              {tag}
            </div>
          ))}
        </div>
        <div>
          <Button
            variant="outline-dark"
            onClick={handleClick}
            className="article__return-button"
          >
            <img
              className="article__arrow-img"
              src="/tempImg/events/up-arrow.png"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
