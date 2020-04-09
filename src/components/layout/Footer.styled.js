import { breakpoint } from "../../utils/breakpoints"
import styled from "styled-components"

export const FooterWrapper = styled.footer`
  background: #f7f7f7;
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  @media ${breakpoint.lg} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  padding: 0 2rem;
  background: #f7f7f7;
`

export const FooterSection = styled.section`
  display: flex;
  flex-direction: column;
  ul {
    margin: 1rem auto;
    padding: 0;
    li,
    a {
      list-style-type: none;
      text-align: left;
      margin-bottom: 0.5rem;
    }
  }

  :first-child {
    align-items: flex-start;
  }

  :nth-child(2) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    margin: 1rem 0;
    h3 {
      text-align: left;
    }
  }

  :nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    a {
      width: 13rem;
    }

    @media ${breakpoint.lg} {
      ul {
        margin-right: calc((13rem / 2) - 40px);
      }
    }
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type="email"] {
    width: 16rem;
  }
`

export const FooterNotice = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 3;
`
