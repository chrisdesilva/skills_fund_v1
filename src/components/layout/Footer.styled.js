import { breakpoint } from "../../utils/breakpoints"
import styled from "styled-components"

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoint.lg} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  padding: 2rem;
  background: #f7f7f7;
`

export const FooterSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ul {
    margin: 0;
    padding: 0;
    li,
    a {
      list-style-type: none;
      text-align: left;
      margin-bottom: 0.5rem;
    }
  }
  &:nth-child(2) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    margin: 1rem 0;
    h3 {
      text-align: left;
    }
  }

  &:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
      width: 13rem;
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
