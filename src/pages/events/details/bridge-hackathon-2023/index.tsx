import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ArticlePage: NextPage = () => {
  const article = {
    title: "The Bridge Hackathon 2023",
    author: "Gunjan Srivastava & Hyonjoon Park",
    date: "Sep 5, 2023",
    // content: {},
    // image: "Image Path Here",
    tags: ["Hackathon", "International", "Demo Day"],
    length: "3",
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
          <img src="/tempImg/leads/finance_lead.jpg" alt="author_image" />
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
        <img
          className="article__image"
          src="/tempImg/events/bridgehack-1.png"
        />
      </div>

      <div>
        <p>
          In an initiative to foster innovation, GDSC Waseda collaborated with
          other GDSC chapters across Japan and Korea in the “2023 East Asia GDSC
          Global Hackathon: The Bridge” (“The Bridge Hackathon”). The event was
          hosted as a 24-hour hackathon on 11th and 12th February 2023 at
          FinGATE KAYABA.
        </p>
        <p>
          The Bridge Hackathon saw participation of over fifty students from
          Seoul Women’s University, Korea University, Waseda University, Senshu
          University, Tokyo University of Agriculture and Technology, Nihon
          University, and Keio University. There were eight teams in total, and
          the main aim for this Hackathon was to develop a solution for at least
          one of the United Nations Sustainable Development Goals.
        </p>
        <p>Participants were grouped up into eight teams:</p>
        <br />

        {/* Team Couch Coders */}
        <h2 className="article__h2">Team "Couch Coders"</h2>
        <p>
          Team "Couch Coders" (Gunjan Srivastava, Shiori Yoshida, Inoue Ibuki,
          Subin Kim, Hyejeong Park, Byeongwoo Jeon, Yusun Choi) targeted SDG 3:
          Good Health and Well-Being, through their app “Barrier Free", to
          resolve the problem of illegal e-scooter parking in South Korea.
          Utilizing image detection technology to locate the scooters, users are
          encouraged to check for improperly parked scooters.
        </p>

        {/* Team "Blue Bull" */}
        <h2 className="article__h2">Team "Blue Bull"</h2>
        <p>
          Team "Blue Bull" (Issei Mori, Cedric Purwanto, Sakamoto Risa, Jihye
          Lee, Jaegun Cho, Dahye Jeong, Hyojeong Choi) devised "Padge" to
          achieve a number of SDGs, including SDG 1: No Poverty, SDG 3: Good
          Health and Well-being, SGD 5: Gender Equality, and SGD 10: Reduced
          Inequalities. “Padge” aims to satiate the demands for affordable,
          high-quality sanitary napkins by bridging together sanitary napkin
          donors and recipients, giving them a platform to communicate.
        </p>

        {/* Team "Stack_Underflow" */}
        <h2 className="article__h2">Team "Stack_Underflow"</h2>
        <p>
          Team "Stack_Underflow" (Jiyun Bae, Aditya Sundar, Minsuh Cho, Jeongah
          Mok, Yein Kang, Hyonjoon Park, Ashyrgeldi Atayev) with its app MedicGo
          accomplishes SDG 3: Good Health and Well-being and SGD 10: Reduced
          Inequalities. The app streamlines the diagnosis process and helps
          translate medical prescriptions for immigrant families in a foreign
          country.
        </p>

        {/* Team "Data Ninjas" */}
        <h2 className="article__h2">Team "Data Ninjas"</h2>
        <p>
          Team "Data Ninjas'' (Junbin Park, Jihun Park, Hyerim Ahn, Chaeeun Han,
          Seonghu Jeon, Minyoung Kim) made an online software "Culture Finder,"
          solving SDG 3, Good Health and Well-Being, to encourage local
          residents to lead healthier lives and increase active participation in
          diverse cultural events by allowing them to search for activities like
          physical exercise, library clubs, museum tours, etc.
        </p>

        {/* Team "Exceptorii" */}
        <h2 className="article__h2">Team "Exceptorii"</h2>
        <p>
          Team "Exceptorii" (Jaewon, Shuhei, Seohyun, Wookyung, Irfan Nurhadi
          Satria, Jeongeun) made an application "Eldy" in a hope to realize the
          SDG 10: Reduced Inequalities. The app helps elderly populations
          familiarize themselves with modern technology working adults
          frequently use. Focusing on personal finance and day-to-day knowledge,
          Eldy educates its elderly users via an easy-to-follow tutorial and an
          adaptable testing to measure their abilities to tell fake news or
          disinformation.
        </p>

        {/* Team "We Could Not Think of a Name" */}
        <h2 className="article__h2">Team "We Could Not Think of a Name"</h2>
        <p>
          Team "We Could Not Think of a Name" (Khaled Mohammad, Daeun Ko,
          Wonwoo, Seongmin, Kaede Saito, Nayeon) sought to figure out a solution
          for SDG 11: Sustainable Cities and Communities and SDG 13: Climate
          Action. Named "I'm Not Garbage!", the app eases the recycling
          procedure by using an automated image classifier. The app first
          targets Japanese nationals, but also the whole team projects its entry
          into the overseas market as the app hits big within Japan.
        </p>

        {/* Team "Giddy Begin" */}
        <h2 className="article__h2">Team "Giddy Begin"</h2>
        <p>
          Team "Giddy Begin'' (Kyungmin Park, Wu Yunqi, Yusei Shiozaki, Jeongin
          Lee, Jiwon Jeong, Seunghei Song, Hyelim Choi) decided to target the
          SDG 12: Responsible Consumption and Production and SDG 13: Climate
          Action through the app “Clothes Bridge”. The primary motive of the app
          is to reduce clothing waste produced by overconsumption of fast
          fashion and handle it better.
        </p>

        {/* Team "Hello World" */}
        <h2 className="article__h2">Team "Hello World"</h2>
        <p>
          Team "Hello World" (Sean, Jimin, Ryusuke, Chaeyoung, Seoyeon, Bokyung,
          Ye-eun) laid out a solution “Veginner” to solve the SDG 13: Climate
          Action and SDG 15: Life On Land. The team promotes a vegan lifestyle
          while protecting the wildlife. The app provides users with a platform
          to post vegan recipes and share their knowledge with novice vegans.
        </p>
        <br />

        <div className="article__image-container">
          <img src="/tempImg/events/bridgehack-2.png" />
        </div>
        <p>
          We would like to extend our thanks to our sponsors for the event,
          FinGATE Kayaba and Heiwa Real Estate Co. Ltd., as well as Google Japan
          representative, Reisa Matsuda.
        </p>

        <p>
          We look forward to more collaborations with GDSC chapters around the
          world!
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
