import Link from "next/link";
import { SectionCard } from "components/Cards/SectionCard";
import { ImageCard } from "components/Cards/ImageCard";
import CommonMeta from "components/CommonMeta";
import { SectionCardProps, ImageCardProps } from "~/types";

import rawSections from "./sections.json";
import rawLeaders from "./leaders.json";

const sections: { [key: string]: SectionCardProps } = rawSections;
const leaders: { [key: string]: ImageCardProps } = rawLeaders;

const TeamsIndexPage = () => {
  const teamKeys = Object.keys(sections); // ["project", "backend", ...]

  return (
    <div className="teams-index-page">
      <CommonMeta
        pageTitle="Our Teams"
        pageDescription="Meet all our amazing teams"
        pagePath="/teams"
        pageImgWidth={1280}
        pageImgHeight={630}
      />

      <h1 className="text-3xl font-bold mb-6">All Teams</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamKeys.map((team) => (
          <Link href={`/teams/${team}`} key={team} className="block">
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{sections[team].title}</h2>
              <p className="text-gray-600 mb-2">{sections[team].content}</p>
              {leaders[team]?.image && (
                <img
                  src={leaders[team].image}
                  alt={`${team} leader`}
                  className="w-full h-40 object-cover rounded-md"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamsIndexPage;
