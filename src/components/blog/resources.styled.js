import { breakpoint } from "../../utils/breakpoints"
import styled from "styled-components"

export const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;

  h1 {
    margin-top: 3rem;
  }
`

export const PostsContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap: 1rem;
  padding: 0;
  max-width: 1200px;

  @media ${breakpoint.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const FeaturedPost = styled.div`
  grid-column: 2/4;
  border: 2px solid lightgray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  padding: 2rem 1rem;
  max-width: 1200px;

  .gatsby-image-wrapper {
    margin-bottom: 1rem;
  }

  .card--info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      margin: 0.5rem 0 0 0;
    }
  }

  .card--link {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
  }

  .card--image {
    position: relative;
  }

  .card--label {
    position: absolute;
    right: 0.5rem;
    bottom: -0.25rem;
    background: ${({ theme }) => theme.primaryLight};
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 9999px;
    text-transform: uppercase;
    font-size: 0.75rem;
  }
`

export const BlogPostCard = styled.div`
  border: 2px solid lightgray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  padding: 2rem 1rem;

  .gatsby-image-wrapper {
    margin-bottom: 1rem;
    height: 300px;
  }

  .card--info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      margin: 0.5rem 0 0 0;
    }
  }

  .card--link {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
  }

  .card--image {
    position: relative;
  }

  .card--label {
    position: absolute;
    right: 0.5rem;
    bottom: -0.25rem;
    background: ${({ theme }) => theme.primaryLight};
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 9999px;
    text-transform: uppercase;
    font-size: 0.75rem;
  }
`
