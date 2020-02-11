import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import background from "../images/mobile_bg.png"
import { breakpoint } from "../utils/breakpoints"

export const MenuBar = styled.header`
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

export const MenuIcon = styled.button`
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
    transition: all 300ms;
    border-radius: 10px;
    transform-origin: 2px;

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

export const MenuLinks = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${background});
  position: absolute;
  z-index: 5;
  top: 0;
  right: 0;
  transition: transform 300ms;
  height: 100vh;
  width: 100%;
  transform: ${({ menuOpen }) =>
    menuOpen ? "translateX(0)" : "translateX(100%)"};
`

export const MenuIconContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const MenuLogo = styled.div`
  width: 6rem;
  z-index: 11;
  margin-left: 1rem;
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
          <li>
            <Link to="students">Our Partner Schools</Link>
          </li>
        </ul>
      </MenuLinks>
    </MenuBar>
  )
}

export default MobileNavMenu
