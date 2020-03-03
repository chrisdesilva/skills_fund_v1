import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import background from "../images/mobile_bg.png"
import { breakpoint } from "../utils/breakpoints"

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
      <MenuLogo onClick={() => setMenuOpen(!menuOpen)}>
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
            <Link to="/resources">Student Journey</Link>
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

const MenuBar = styled.header`
  @media ${breakpoint.lg} {
    display: none;
  }
  height: 3rem;
  position: fixed;
  width: 100%;
  background: white;
  border-bottom: ${props => `2px solid ${props.theme.secondary}`};
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MenuIcon = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  transition: all 300ms;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2rem;
  outline: thin dotted;
  z-index: 10;

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ menuOpen }) => (menuOpen ? "white" : "black")};
    transition: transform 300ms, opacity 300ms;
    border-radius: 10px;
    transform-origin: 1px;

    :first-child {
      transform: ${({ menuOpen }) =>
        menuOpen ? "rotate(45deg)" : "rotate(0)"};
    }
    :nth-child(2) {
      opacity: ${({ menuOpen }) => (menuOpen ? "0" : "1")};
      transform: ${({ menuOpen }) =>
        menuOpen ? "translateX(-20px)" : "translateX(0)"};
    }
    :nth-child(3) {
      transform: ${({ menuOpen }) =>
        menuOpen ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`

const MenuLinks = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 5;
  top: 0;
  right: 0;
  transition: transform 300ms;
  height: 100vh;
  width: 100%;
  transform: ${({ menuOpen }) =>
    menuOpen ? "translateX(0)" : "translateX(100%)"};

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`

const MenuIconContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MenuLogo = styled.div`
  width: 6rem;
  z-index: 11;
  margin-left: 1rem;
`

const ListItem = styled.li`
  margin-bottom: 1rem;
  list-style-type: none;
  a {
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    color: white;
  }
  .btn {
    color: black;
  }
  :last-of-type {
    margin-top: 1rem;
  }
`

const MenuApplyButton = styled(props => <Link {...props} />)`
  width: 8rem;
  background: ${props => props.theme.secondary};
  color: white;
  text-align: center;
  height: 2rem;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`
