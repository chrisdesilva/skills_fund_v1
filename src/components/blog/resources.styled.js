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
  grid-template-areas:
    "feature"
    "sidebar"
    "posts";
  justify-items: center;
  grid-gap: 1rem;
  padding: 0;

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "feature feature feature"
      "posts posts sidebar";
  }
`

export const FeaturedPost = styled.div`
  grid-area: feature;
  border: 2px solid lightgray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  padding: 1rem;
  width: 100%;

  .card--info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 75%;
    background: rgba(245, 245, 245, 0.9);
    padding: 1rem;
    p {
      margin: 0.5rem 0 0 0;
    }

    @media ${breakpoint.lg} {
      width: 33%;
    }
  }

  .card--link {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
    font-size: 1.25rem;

    @media ${breakpoint.lg} {
      font-size: 1.5rem;
    }
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

export const SideBar = styled.aside`
  grid-area: sidebar;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  border: 2px solid #c4c4c4;
  padding: 1rem;
  width: 90%;

  h2 {
    text-transform: uppercase;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .btn {
    display: block;
    margin: 0.5rem auto 0 auto;
  }

  .socials {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    svg {
      margin: 0 1rem;
      transition: color 300ms;
      cursor: pointer;
      font-size: 1.25rem;

      :hover {
        color: ${({ theme }) => theme.secondary};
      }
    }
  }
`

export const PostCards = styled.div`
  display: grid;
  grid-area: posts;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap: 1rem;
  padding: 0;

  @media ${breakpoint.md} {
    grid-template-columns: repeat(2, 1fr);
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
    font-weight: bold;
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
