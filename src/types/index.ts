/* Cards */
export interface MemberType {
  firstName: string;
  lastName?: string;
  photo_link?: string;
}

export interface ProjectMember {
  name: string;
  role?: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  repoUrl: string;
  members: ProjectMember[];
}
export interface CarouselCardProps {
  image: string;
  subtitle: string;
  title: string;
  old: boolean;
  link: string;
}

export type YearBarProps = {
  years: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
};

export interface MembersCardProps {
  teamName: string;
  leader: MemberType;
  member: Array<MemberType>;
}

export interface HeaderCardProps {
  headTitle?: string;
  title: string;
  content?: string;
  button?: boolean;
  buttonText?: string;
}
export interface TeamHeaderCardProps {
  headTitle?: string;
  title?: string;
  content?: string;
  featureList?: string[];
}

export interface ImageCardProps {
  title: string;
  content?: string;
  image: string;
  imagePosition: "left" | "right";
}

export interface TeamCardProps {
  image: string;
  title: string;
  major?: string;
  school?: string;
  year?: string;
}

export interface MediaCardProps {
  size: "s" | "m" | "l";
  title: string;
  image?: string;
  tags: string[];
  date: string;
  description: string;
  link: string;
  open: boolean;
  canOpen: boolean;
}

export interface ImageIconProps {
  size: "s" | "m" | "l";
  title?: string;
  color: "yellow" | "green" | "blue" | "red";
  image?: string;
  image2: string | null;
  multiple: boolean;
  link: string;
}

export interface TextCardProps {
  title: string;
  content: string;
}

/* Pages */

export interface ErrorPageProps {
  detail: string | "error" | "dev";
}

/* SEO */

export interface MetaData {
  pageTitle?: string;
  pageDescription?: string;
  pagePath?: string;
  pageKeywords?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
}

/* article type */

export interface ContentBlock {
  type: string;
  children: { text: string }[];
}

interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

interface MediaAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    thumbnail?: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any; // adjust this based on actual data structure
  createdAt: string;
  updatedAt: string;
}

interface MediaData {
  id: number;
  attributes: MediaAttributes;
}

interface Media {
  data: MediaData | null;
}

export interface ArticleAttributes {
  Title: string;
  publicationDate: string;
  content: ContentBlock[]; // Assuming you have already defined ContentBlock based on your rich text structure
  media: Media[];
  author1: Media;
  author2: Media;
  coverimg: Media;
  length: string;
  author1Name: string;
  author2Name: string;
  eventDate: string;
  location: string;
  eventDescription: string;
  tagOne: string;
  tagTwo: string;
  tagThree: string;
}

export interface Article {
  id: number;
  attributes: ArticleAttributes;
}

export interface ArticlesResponse {
  data: Article[];
}

export interface memberAtributes {
  name: string;
  year: string;
  major: string;
  team: string;
  school: string;
  memImage: Media;
}

export interface MemberType {
  id: number;
  attributes: memberAtributes;
}
