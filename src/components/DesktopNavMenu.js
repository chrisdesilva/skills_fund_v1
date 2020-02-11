import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FaCaretDown } from "react-icons/fa"
import { breakpoint } from "../utils/breakpoints"
import logo from "../images/skillsFund_logo.png"

export const StyledHeader = styled.header`
  display: none;
  @media ${breakpoint.lg} {
    display: flex;
    position: fixed;
    align-items: center;
    width: 100%;
    top: 0;
    z-index: 10;
    padding: 0 0.5rem;
    background: white;
    font-size: 0.9rem;
    transition: border 300ms, box-shadow 300ms, font-size 300ms;
    border-bottom: ${({ border }) =>
      border ? "2px solid purple" : "2px solid transparent"};
    box-shadow: ${({ border }) =>
      border
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        : "0"};

    li {
      list-style-type: none;
      margin-left: 1rem;
    }

    #logo {
      width: 8rem;
      margin-left: -2rem;
      margin-right: 2rem;
    }

    a {
      text-decoration: none;
    }
  }
`

const DesktopNavMenu = () => {
  const Dropdown = styled.div`
    display: inline-block;
    margin-left: 1rem;
  `

  const DropDownContent = styled.div`
    display: none;
    position: absolute;
    z-index: 20;
    background: white;
    padding: 1rem 0.25rem;
    border-top: 2px solid purple;
    box-shadow: 2px 2px 5px lightgray;
    border-radius: 2px;
    width: 12rem;

    &:hover {
      display: block;
    }
    li {
      list-style-type: none;
      &:not(:first-of-type) {
        margin-top: 1rem;
      }
      a {
        text-decoration: none;
        color: black;
        transition: color 300ms;

        &:hover {
          color: purple;
        }
      }
    }
  `

  const DropdownLink = styled(props => <Link {...props} />)`
    display: flex;
    align-items: center;
    position: relative;
    padding: 1rem 0;
    text-decoration: none;
    list-style-type: none;
    color: black;
    transition: color 300ms;
    :hover {
      color: purple;
    }
    :hover + ${DropDownContent} {
      display: block;
    }
    img {
      width: 100%;
    }
  `

  const DropDownMain = styled.a`
    display: flex;
    align-items: center;
    position: relative;
    padding: 1rem 0;
    text-decoration: none;
    list-style-type: none;
    :hover + ${DropDownContent} {
      display: block;
    }
    :last-of-type {
      margin-right: 1rem;
      color: black;
      transition: color 300ms;

      :hover {
        color: purple;
      }
    }
  `

  // const [nav, toggleNav] = useState(false)
  const [border, setBorder] = useState(false)
  const navRef = useRef()

  navRef.current = border
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 20
      if (navRef.current !== show) {
        setBorder(show)
      }
    }
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <StyledHeader border={border}>
      <nav className="flex items-center w-2/3">
        <ul className="flex items-center my-0">
          <li id="logo">
            <DropdownLink to="/">
              <img src={logo} alt="Skills Fund logo" />
            </DropdownLink>
          </li>
          <li>
            <DropdownLink to="/schools">Our Partner Schools</DropdownLink>
          </li>
          <li>
            <DropdownLink to="/our-process">How It Works</DropdownLink>
          </li>
          <li>
            <DropdownLink to="/about">Our Team</DropdownLink>
          </li>
          <Dropdown>
            <DropdownLink to="/resources">
              Student Resources <FaCaretDown />
            </DropdownLink>
            <DropDownContent className="-ml-8">
              <li>
                <Link to="/resources">Blog</Link>
              </li>
              <li>
                <Link to="/frequently-asked-questions">FAQ</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
            </DropDownContent>
          </Dropdown>
        </ul>
      </nav>

      <nav className="flex items-center w-1/3 justify-end mr-8">
        <ul className="flex items-center my-0">
          <Dropdown>
            <DropDownMain href="https://my.skills.fund">
              My Loan <FaCaretDown />
            </DropDownMain>
            <DropDownContent className="-ml-20">
              <li>
                <a href="https://my.skills.fund">Check Loan Status</a>
              </li>
              <li>
                <Link to="/repay">Repay My Loan</Link>
              </li>
            </DropDownContent>
          </Dropdown>
          <li>
            <Link className="btn btn--submit" to="/schools/apply">
              Apply Now
            </Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  )
}

export default DesktopNavMenu
