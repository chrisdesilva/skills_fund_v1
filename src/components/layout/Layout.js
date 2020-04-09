import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { MDXProvider } from "@mdx-js/react"
import Header from "./Header"
import Footer from "./Footer"
import FAQ from "../faq/FAQ"
import { theme } from "../../utils/theme"
import { breakpoint } from "../../utils/breakpoints"
import { GlobalStyle } from "../../utils/globals"
import "../../utils/globals"

const shortcodes = { FAQ, Link }

const Layout = ({ children }) => {
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

export default Layout

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ChildContainer = styled.div`
  flex-grow: 1;
  margin-top: 48px;

  @media ${breakpoint.lg} {
    margin-top: 53px;
    padding: 0;
  }
`
