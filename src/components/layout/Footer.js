import React from "react"
import { FaTwitter, FaFacebookF } from "react-icons/fa"
import { Link } from "gatsby"
import { FooterContainer, FooterSection, Form } from "./Footer.styled"

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <ul className="flex lg:hidden justify-center">
          <li>
            <a
              className="hoverLink mr-2"
              href="https://twitter.com/skills_fund"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaTwitter className="text-2xl hoverLink" />
            </a>
          </li>
          <li>
            <a
              className="hoverLink ml-2"
              href="https://www.facebook.com/SkillsFundEd/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaFacebookF className="text-2xl hoverLink" />
            </a>
          </li>
        </ul>
        <Form>
          <label htmlFor="email">Subscribe to our newsletter</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
          />
          <input
            type="submit"
            value="Let's Go"
            className="btn btn--secondary mt-2 text-base"
          />
        </Form>
        <p className="mb-1 text-center">Questions? Please email:</p>
        <a
          className="hoverLink text-center"
          href="mailto:customertrust@skills.fund"
        >
          CustomerTrust@skills.fund
        </a>
      </FooterSection>
      <FooterSection>
        <section>
          <h3 className="mb-2">Resources</h3>
          <ul>
            <li>
              <Link className="hoverLink" to="/schools">
                Our Partner Schools
              </Link>
            </li>
            <li>
              <Link className="hoverLink" to="/our-process">
                How It Works
              </Link>
            </li>
            <li>
              <Link className="hoverLink" to="/resources">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hoverLink" to="/frequently-asked-questions">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hoverLink" to="/reviews">
                Reviews
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <h3 className="mb-2">Company</h3>
          <ul>
            <li>
              <Link className="hoverLink" to="/about">
                Our Team
              </Link>
            </li>
            <li>
              <Link className="hoverLink" to="/careers">
                Careers
              </Link>
            </li>
            <li>
              <a
                className="hoverLink"
                href="https://skills.fund/privacy-policy"
                target="_blank"
                rel="noreferrer noopener"
              >
                Privacy Notice
              </a>
            </li>
            <li>
              <a
                className="hoverLink"
                href="https://skills.fund/terms-of-use"
                target="_blank"
                rel="noreferrer noopener"
              >
                Terms of Use
              </a>
            </li>
          </ul>
        </section>
      </FooterSection>
      <FooterSection>
        <ul className="lg:flex justify-center hidden">
          <li>
            <a
              className="hoverLink mr-2"
              href="https://twitter.com/skills_fund"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaTwitter className="text-2xl hoverLink" />
            </a>
          </li>
          <li>
            <a
              className="hoverLink ml-2"
              href="https://www.facebook.com/SkillsFundEd/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaFacebookF className="text-2xl hoverLink" />
            </a>
          </li>
        </ul>
        <Link to="/partner" className="btn btn--secondary mb-2 text-center">
          Become a Partner School
        </Link>
        <p className="text-center">
          © 2015-{new Date().getFullYear()}, Skills Fund, LLC
        </p>
      </FooterSection>
    </FooterContainer>
  )
}

export default Footer
