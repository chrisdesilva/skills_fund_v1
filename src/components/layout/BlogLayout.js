import React from "react"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { MDXProvider } from "@mdx-js/react"
import Button from "../blog/Button"
import Banner from "../blog/Banner"
import Embed from "../blog/Embed"
import Twitter from "../blog/Twitter"
import Header from "./Header"
import Footer from "./Footer"
import { theme } from "../../utils/theme"
import { breakpoint } from "../../utils/breakpoints"
import { GlobalStyle } from "../../utils/globals"
import "../../utils/globals"

const shortcodes = { Button, Embed, Twitter, Banner }

const BlogLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <GlobalStyle />
        <Header />
        <MDXProvider components={shortcodes}>
          <ChildContainer>{children}</ChildContainer>
        </MDXProvider>
        <Footer />
      </PageContainer>
    </ThemeProvider>
  )
}

export default BlogLayout

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f7f7f7;
  position: relative;
`

const ChildContainer = styled.div`
  flex-grow: 1;
  margin: 48px auto;
  overflow: hidden;

  img:first-of-type {
    margin-bottom: 5rem;
  }

  p {
    width: 100%;
    max-width: 1200px;
    margin: .5rem auto;
  }

  @media ${breakpoint.lg} {
    margin-top: 57px;
  }

  /* @media ${breakpoint.xl} {
    margin-top: 57px;
    width: 100%;
    max-width: 1200px;
  } */

  h1,
  h2 {
    text-align: center;
    margin: 2rem 0;
  }


  img {
    margin: 0 auto;
    display: block;
    max-width: none;
    width: 100%;
  }

  a:not(.btn) {
    text-decoration: none;
    color: black;
    transition: background-position 120ms;
    background-image: linear-gradient(
      transparent 0%,
      transparent calc(50% - 9px),
      rgba(255, 164, 161, 0.5) calc(50% - 9px),
      rgba(255, 164, 161, 0.5) 100%
    );
    background-size: 100% 225%;
    background-position: 0px 0px;

    :hover {
      background-image: linear-gradient(
        transparent 0%,
        transparent calc(50% - 9px),
        rgba(233, 105, 101, 1) calc(50% - 9px),
        rgba(233, 105, 101, 1) 100%
      );
      background-position: center center;
    }
  }

  .banner.gatsby-image-wrapper {
    position: absolute;
    width: 100vw;
    margin: 4rem 0;
  }

  .btn {
    background: ${({ theme }) => theme.primary};
    color: white;
    margin: 2rem auto;
    display: block;
    text-align: center;
    box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4;
  transform: translateX(-2px) translateY(-2px);
  }
`
