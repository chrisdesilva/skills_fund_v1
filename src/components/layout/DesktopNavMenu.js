import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import { FaCaretDown } from "react-icons/fa"
import logo from "../../images/skillsFund_logo.png"
import {
  StyledHeader,
  DropdownLink,
  DropDownContent,
  DropDownMain,
  Dropdown,
} from "./DesktopNavMenu.styled"

const DesktopNavMenu = () => {
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
            <DropdownLink to="/students">Our Partner Schools</DropdownLink>
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
          <Link id="btn--submit" className="btn btn--submit" to="/apply">
            Apply Now
          </Link>
        </ul>
      </nav>
    </StyledHeader>
  )
}

export default DesktopNavMenu
