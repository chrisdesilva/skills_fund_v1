import React from "react"
import styled from "styled-components"
import background from "../../images/mobile_bg.png"
import { breakpoint } from "../../utils/breakpoints"
import { Link } from "gatsby"

export const MenuBar = styled.header`
  @media ${breakpoint.lg} {
    display: none;
  }
  height: 3rem;
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0 3px 8px -3px rgba(0, 0, 0, 0.1), 0 2px 3px -2px rgba(0, 0, 0, 0.05);
  /* border-bottom: ${props => `2px solid ${props.theme.secondary}`}; */
  z-index: 2;
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

export const MenuLinks = styled.header`
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

export const MenuIconContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const MenuLogo = styled(props => <Link {...props} />)`
  width: 6rem;
  z-index: 11;
  margin-left: 1rem;
`

export const ListItem = styled.li`
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

export const MenuApplyButton = styled(props => <Link {...props} />)`
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
