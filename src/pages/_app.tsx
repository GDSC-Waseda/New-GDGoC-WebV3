import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Head from "next/head";
import { Footer } from "components/Footer";
import { NavigationBar } from "components/NavigationBar";
import Loading from "../components/Loading"; // Import the Loading component
import "styles/globals.scss";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading && <Loading />} <NavigationBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
