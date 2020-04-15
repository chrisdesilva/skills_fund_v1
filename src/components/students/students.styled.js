import styled from "styled-components"
import { breakpoint } from "../../utils/breakpoints"

export const Banner = styled.section`
  display: none;
  background: white;
  margin: 0 auto;

  @media ${breakpoint.lg} {
    height: 30vh;
    display: flex;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;

    @media ${breakpoint.lg} {
      :first-of-type {
        width: 100%;
      }

      :last-of-type {
        z-index: 1;
        width: 100%;

        .gatsby-image-wrapper {
          max-width: 100%;
        }
      }
    }

    @media ${breakpoint.xl} {
      :last-of-type {
        .gatsby-image-wrapper {
          max-width: 75%;
          margin: 0 auto;
        }
      }
    }
  }

  h1 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    @media ${breakpoint.md} {
      font-size: 1.5rem;
    }
    @media ${breakpoint.lg} {
      font-size: 1.75rem;
    }
    @media ${breakpoint.xl} {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;

    @media ${breakpoint.xl} {
      font-size: 1.25rem;
    }
  }
`
