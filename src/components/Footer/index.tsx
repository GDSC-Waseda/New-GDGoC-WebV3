import Image from "next/image";
import Link from "next/link";

import X from "assets/svg/X.svg";
import Instagram from "assets/svg/instagram.svg";
import LinkedIn from "assets/svg/linked-in.svg";
import Mail from "assets/svg/mail.svg";
import logo from "assets/svg/logo.svg";

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer__reserved">Contact</div>
      <div className="footer__logoContainer">
        <a
          href="https://x.com/gdsc_waseda"
          target="_blank"
          className="footer__pathItem"
          rel="noreferrer"
        >
          <Image src={X} layout="intrinsic" alt="X" />
        </a>
        <a
          href="https://www.instagram.com/gdgcampus_waseda/"
          className="footer__pathItem"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={Instagram} layout="intrinsic" alt="instagram" />
        </a>
        <a
          href="https://www.linkedin.com/company/google-dsc-waseda-university"
          className="footer__pathItem"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={LinkedIn} layout="intrinsic" alt="linkdin" />
        </a>
        <a
          href="https://www.linkedin.com/company/google-dsc-waseda-university"
          className="footer__pathItem"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={Mail} layout="intrinsic" alt="mail" />
        </a>
      </div>
      <div className="footer__reserved">@ GDGoC Waseda</div>
    </footer>
  );
};

export default Footer;
