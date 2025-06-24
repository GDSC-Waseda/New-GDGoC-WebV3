import Image from "next/image";
import Link from "next/link";
import X from "assets/svg/X.svg";
import Instagram from "assets/svg/instagram.svg";
import LinkedIn from "assets/svg/linked-in.svg";
import Mail from "assets/svg/mail.svg";
import logo from "assets/svg/logo.svg";
import { FaLinkedin, FaInstagram, FaEnvelope, FaXTwitter } from "react-icons/fa6";

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer__reserved">Contact</div>
      <div className="footer__logoContainer">
        <a href="https://x.com/gdsc_waseda" target="_blank" rel="noreferrer">
          <FaXTwitter size={48} />
        </a>
        <a
          href="https://www.instagram.com/gdgcampus_waseda/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram size={48} />
        </a>
        <a
          href="https://www.linkedin.com/company/google-dsc-waseda-university"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={48} />
        </a>
        <a
          href="https://www.linkedin.com/company/google-dsc-waseda-university"
          target="_blank"
          rel="noreferrer"
        >
          <FaEnvelope size={48} />
        </a>
      </div>
      <div className="footer__reserved">@ GDGoC Waseda</div>
    </footer>
  );
};

export default Footer;
