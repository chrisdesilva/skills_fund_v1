import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout/Layout"
import {
  BlogContainer,
  PostsContainer,
  FeaturedPost,
  BlogPostCard,
} from "../components/blog/resources.styled"
import SEO from "../components/layout/SEO"

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
      <SEO title="Blog" />
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
