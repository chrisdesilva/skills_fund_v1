import React from "react"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import Header from "./Header"
import Footer from "./Footer"
import { theme } from "../utils/theme"
import { breakpoint } from "../utils/breakpoints"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ChildContainer = styled.div`
  flex-grow: 1;
  margin-top: 48px;

  @media ${breakpoint.lg} {
    margin-top: 58px;
  }
`

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <Header />
        <ChildContainer>{children}</ChildContainer>
        <Footer />
      </PageContainer>
    </ThemeProvider>
  )
}

export default Layout
