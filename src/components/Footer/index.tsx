import Image from "next/image";
import Link from "next/link";

import Google from "assets/svg/google.svg";
import Instagram from "assets/svg/instagram.svg";
import LinkedIn from "assets/svg/linked-in.svg";

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <hr />
      <div className="footer__logoContainer">
        <a
          href="https://gdg.community.dev/gdg-on-campus-waseda-university-tokyo-japan/"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={Google} layout="intrinsic" alt="google"/>
        </a>
        <a
          href="https://www.instagram.com/gdgcampus_waseda/"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={Instagram} layout="intrinsic" alt="instagram"/>
        </a>
        <a
          href="https://www.linkedin.com/company/gdg-on-campus-waseda-university/"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={LinkedIn} layout="intrinsic" alt="linkdin"/>
        </a>
      </div>
      <div className="footer__reserved">All Rights Reserved by GDGoC Waseda</div>
    </footer>
  );
};

export default Footer;
