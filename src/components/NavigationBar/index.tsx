import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { Container, Nav, Button, Navbar } from "react-bootstrap";

import logo from "assets/svg/logo.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export const NavigationBar = (): JSX.Element => {
  const { t } = useTranslation("common");

  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <Navbar expand="sm" className="header__container">
        <Container fluid>
          <Navbar.Brand>
            <Link href="/" legacyBehavior>
              <div className="logo">
                <Image alt="" src={logo} layout="intrinsic" />
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <div
              className={`nav-text-title ${isClient ? "start-animation" : ""}`}
            >
              <Link href="/">GDSC Waseda</Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={handleMenuToggle}
            aria-controls="basic-navbar-nav"
            className={menuOpen ? "open" : ""}
          >
            <span
              className={`navbar-toggler-icon ${menuOpen ? "open" : ""}`}
            ></span>
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`navbarCollaps ${menuOpen ? "show" : ""}`}
          >
            <Nav className="ms-auto gradient-container">
              <Nav.Item className="navItem">
                <Link href="/about" legacyBehavior>{t("about")}</Link>
              </Nav.Item>
              <Nav.Item className="navItem">
                <Link href="/teams" legacyBehavior>{t("team")}</Link>
              </Nav.Item>
              <Nav.Item className="navItem">
                <Link href="/events" legacyBehavior>{t("event")}</Link>
              </Nav.Item>
              <Nav.Item className="navItem">
                <Link href="/project" legacyBehavior>{t("project")}</Link>
              </Nav.Item>
              <Nav.Item className="navItem">
                <LanguageToggle />
              </Nav.Item>
              <Nav.Item className="navItem">
                <Link href="https://forms.gle/uewfWU2QZjpHmSqc9" target="_blank" legacyBehavior>
                  <Button variant="outline-dark" className="butto">
                    <small>{t("more")}</small>
                  </Button>
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;

const LanguageToggle = () => {
  const router = useRouter();
  return (
    <select
      className="select"
      id="language-picker-select"
      onChange={(e) => {
        router.push(router.pathname, router.pathname, {
          locale: e.target.value,
        });
      }}
      value={router.locale}
    >
      <option lang="ja" value="ja">
        日本語
      </option>
      <option lang="en" value="en">
        English
      </option>
    </select>
  );
};
