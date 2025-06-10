import type { NextPage } from "next";
import CommonMeta from "components/CommonMeta";
import Loading from "components/Loading";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["home", "common"])),
    },
  };
};

const Home: NextPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

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
      <div className="home-page">
        <div className="home-page__top">
          <div className="home-page__top__container">
            <div className="content-with-image">
              <div className="text-section">
                <div className="home-page__top__title">
                  {t("home:welcome_mes")}
                </div>
              </div>
              <div className="image-section">
                <Image
                  src="/gdsc-top.jpg"
                  alt="women-tech"
                  width={650}
                  height={400}
                  layout="intrinsic"
                  className="animated-image"
                />
              </div>
            </div>
          </div>
          <p className="trusted-message">{t("home:trusted_by")}</p>
          <div className="trusted-companies">
            <Image
              src="/women_tech.jpg"
              alt="women-tech"
              width={100}
              height={100}
              className="animated-image"
              layout="intrinsic"
            />
            <Image
              src="/google.jpg"
              alt="google"
              width={100}
              height={100}
              className="animated-image"
              layout="intrinsic"
            />
            <Image
              src="/fingate.jpg"
              alt="fingate"
              width={100}
              height={100}
              className="animated-image"
              layout="intrinsic"
            />
            <Image
              src="/fincatch.jpg"
              alt="fincatch"
              width={100}
              height={100}
              className="animated-image"
              layout="intrinsic"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
