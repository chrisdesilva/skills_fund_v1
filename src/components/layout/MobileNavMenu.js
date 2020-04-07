import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import {
  MenuBar,
  MenuLogo,
  MenuIconContainer,
  MenuApplyButton,
  MenuIcon,
  MenuLinks,
  ListItem,
} from "./MobileNavMenu.styled"

const MobileNavMenu = ({ menuOpen, setMenuOpen }) => {
  const data = useStaticQuery(graphql`
    query {
      skflogo: file(relativePath: { eq: "skillsFund_logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      skflogoWhite: file(relativePath: { eq: "skf_logo_white.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <MenuBar>
      <MenuLogo to="/" onClick={() => setMenuOpen(false)}>
        <Img
          alt="Skills Fund logo"
          fluid={
            menuOpen
              ? data.skflogoWhite.childImageSharp.fluid
              : data.skflogo.childImageSharp.fluid
          }
        />
      </MenuLogo>
      <MenuIconContainer>
        <MenuApplyButton to="/apply">Apply Now</MenuApplyButton>
        <MenuIcon menuOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <div />
          <div />
          <div />
        </MenuIcon>
      </MenuIconContainer>
      <MenuLinks menuOpen={menuOpen}>
        <ul>
          <ListItem>
            <Link to="/students">Our Partner Schools</Link>
          </ListItem>

          <ListItem>
            <Link to="/our-process">How It Works</Link>
          </ListItem>

          <ListItem>
            <Link to="/about">Our Team</Link>
          </ListItem>

          <ListItem>
            <Link to="/resources">Blog</Link>
          </ListItem>

          <ListItem>
            <Link to="/frequently-asked-questions">FAQ</Link>
          </ListItem>

          <ListItem>
            <Link to="/reviews">Reviews</Link>
          </ListItem>

          <ListItem>
            <a href="https://my.skills.fund">Check Loan Status</a>
          </ListItem>

          <ListItem>
            <Link to="/repay">Repay My Loan</Link>
          </ListItem>

          <ListItem>
            <Link className="btn text-black z-10 w-32 bg-white" to="/apply">
              Apply Now
            </Link>
          </ListItem>
        </ul>
      </MenuLinks>
    </MenuBar>
  )
}

export default MobileNavMenu
