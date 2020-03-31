import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout/Layout"
import { breakpoint } from "../utils/breakpoints"

const BlogPost = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
            title
            author
            featuredImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            date
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <BlogContainer>
        <h1>Sharing Knowledge Is How We All Grow</h1>
        <p>
          Whether you’re a student, educator or reformer, we’re in this
          together. Browse by category or check out our latest featured articles
          below.
        </p>
        <PostsContainer>
          <ul>
            {data.allMdx.nodes.map(post => {
              return (
                <BlogPostCard>
                  <Link to={`resources/${post.frontmatter.slug}`}>
                    <Img
                      fluid={
                        post.frontmatter.featuredImage.childImageSharp.fluid
                      }
                      alt={post.frontmatter.title}
                    />
                  </Link>
                  <Link
                    className="textLink"
                    to={`resources/${post.frontmatter.slug}`}
                  >
                    {post.frontmatter.title}
                    <br />
                    <span className="text-xs">{post.frontmatter.date}</span>
                  </Link>
                </BlogPostCard>
              )
            })}
          </ul>
        </PostsContainer>
      </BlogContainer>
    </Layout>
  )
}

export default BlogPost

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-top: 3rem;
  }
`

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media ${breakpoint.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const BlogPostCard = styled.div`
  border: 2px solid lightgray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  padding: 2rem 1rem;

  .gatsby-image-wrapper {
    margin-bottom: 1rem;
  }

  .textLink {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
  }
`