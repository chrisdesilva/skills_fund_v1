import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { breakpoint } from "../../utils/breakpoints"

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
    box-shadow: ${({ border }) =>
      border
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        : "0"};

    li {
      list-style-type: none;
      margin-left: 1rem;
    }

    .btn--submit {
      width: 8rem;
    }

    #logo {
      width: 8rem;
      margin-left: -2rem;
      margin-right: 2rem;
    }
  }
`
export const Dropdown = styled.div`
  display: inline-block;
  margin-left: 1rem;
`

export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  z-index: 20;
  background: white;
  padding: 1rem 0.25rem;
  border-top: 2px solid #e96965;
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
        color: #e96965;
      }
    }
  }
`

export const DropdownLink = styled(props => <Link {...props} />)`
  display: flex;
  align-items: center;
  position: relative;
  padding: 1rem 0;
  text-decoration: none;
  list-style-type: none;
  color: black;
  transition: color 300ms;
  :hover {
    color: #e96965;
  }
  :hover + ${DropDownContent} {
    display: block;
  }
  img {
    width: 100%;
  }
`

export const DropDownMain = styled.a`
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
      color: #e96965;
    }
  }
`
