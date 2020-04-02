import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout/Layout"
import { breakpoint } from "../utils/breakpoints"

const BlogPost = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      blog: allContentfulBlog(
        sort: { fields: post___childMdx___frontmatter___date }
      ) {
        nodes {
          post {
            childMdx {
              excerpt
              frontmatter {
                date
              }
            }
          }
          title
          slug
          leadImage {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
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
        <FeaturedPost>
          <div className="card--image">
            <Link to={`resources/${data.blog.nodes[0].slug}`}>
              <Img
                fluid={data.blog.nodes[0].leadImage.fluid}
                alt={data.blog.nodes[0].title}
              />
              <p className="card--label">Featured Post</p>
            </Link>
          </div>
          <div className="card--info">
            <Link
              className="card--link"
              to={`resources/${data.blog.nodes[0].slug}`}
            >
              {data.blog.nodes[0].title}
            </Link>
            <p>
              {data.blog.nodes[0].post.childMdx.frontmatter.date} -{" "}
              {data.blog.nodes[0].post.childMdx.excerpt}
            </p>
          </div>
        </FeaturedPost>
        <PostsContainer>
          {data.blog.nodes.slice(1, data.blog.nodes.length).map(post => {
            return (
              <BlogPostCard>
                <div className="card--image">
                  <Link to={`resources/${post.slug}`}>
                    <Img fluid={post.leadImage.fluid} alt={post.title} />
                    <p className="card--label">Category</p>
                  </Link>
                </div>
                <div className="card--info">
                  <Link className="card--link" to={`resources/${post.slug}`}>
                    {post.title}
                  </Link>
                  <p>
                    {post.post.childMdx.frontmatter.date} -{" "}
                    {post.post.childMdx.excerpt}
                  </p>
                </div>
              </BlogPostCard>
            )
          })}
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
  padding: 0 1rem;

  h1 {
    margin-top: 3rem;
  }
`

const PostsContainer = styled.ul`
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

const FeaturedPost = styled.div`
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

const BlogPostCard = styled.div`
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
