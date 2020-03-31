import React from "react"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import Header from "./Header"
import Footer from "./Footer"
import { theme } from "../../utils/theme"
import { breakpoint } from "../../utils/breakpoints"
import { GlobalStyle } from "../../utils/globals"
import "../../utils/globals"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f7f7f7;
`

const ChildContainer = styled.div`
  flex-grow: 1;
  max-width: 90vw;
  margin: 48px auto;

  @media ${breakpoint.lg} {
    margin-top: 57px;
  }

  @media ${breakpoint.xl} {
    margin-top: 57px;
    max-width: 1200px;
  }

  h1,
  h2 {
    text-align: center;
  }

  h1 {
    margin: 2rem 0;
  }

  .btn {
    background: ${({ theme }) => theme.primary};
    color: white;
    margin: 0 auto;
    display: block;
    text-align: center;
  }
`

const BlogLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <GlobalStyle />
        <Header />
        <ChildContainer>{children}</ChildContainer>
        <Footer />
      </PageContainer>
    </ThemeProvider>
  )
}

export default BlogLayout
