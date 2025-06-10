import Head from "next/head";

import * as env from "config";
import { MetaData } from "~/types";

export default function CommonMeta({
  pageTitle,
  pageDescription,
  pageKeywords,
  pagePath,
  pageImgWidth,
  pageImgHeight,
}: MetaData) {
  const defaultTitle = "Google Developers Student Clubs Waseda";
  const defaultDescription =
    "GDSC Waseda is a student society supported by Google Developers based in Waseda Univ., Tokyo";
  const defaultUrl = env.PUBLIC_URL;
  const defaultKeywords = "GDSC Waseda";
  const siteName = "GDSC Waseda Official Website";

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = pageDescription
    ? `${pageDescription} | ${defaultDescription}`
    : defaultDescription;
  const url = pagePath ? `${defaultUrl}/${pagePath}` : defaultUrl;

  const image = pagePath
    ? `https://${defaultUrl}/pages/${pagePath}.png`
    : `https://${defaultUrl}/logo.svg`;
  const keywords = pageKeywords ? pageKeywords : defaultKeywords;
  const imgWidth = pageImgWidth ? pageImgWidth : 1280;
  const imgHeight = pageImgHeight ? pageImgHeight : 640;

  console.log(url);
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="apple-touch-icon" href="logo.svg" />
      <link rel="icon" href="logo.svg" />
    </Head>
  );
}
