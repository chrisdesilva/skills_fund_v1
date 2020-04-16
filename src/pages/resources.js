import React, { useState } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout/Layout"
import {
  BlogContainer,
  PostsContainer,
  FeaturedPost,
  BlogPostCard,
  PostCards,
  SideBar,
} from "../components/blog/resources.styled"
import { FaTwitter, FaFacebookF } from "react-icons/fa"
import SEO from "../components/layout/SEO"
import TextInput from "../components/common/TextInput"

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
          category
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

  const [email, setEmail] = useState("")
  const handleSubmit = e => {
    e.preventDefault()
  }

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
        <PostsContainer>
          <FeaturedPost>
            <div className="card--image">
              <Link to={`resources/${data.blog.nodes[0].slug}`}>
                <Img
                  fluid={data.blog.nodes[0].leadImage.fluid}
                  alt={data.blog.nodes[0].title}
                />
                <p className="card--label">Featured Post</p>
              </Link>
              <div className="card--info">
                <Link
                  className="card--link"
                  to={`resources/${data.blog.nodes[0].slug}`}
                >
                  {data.blog.nodes[0].title}
                </Link>
                <p>{data.blog.nodes[0].post.childMdx.excerpt}</p>
              </div>
            </div>
          </FeaturedPost>
          <SideBar>
            <div className="sidebar__connected">
              <h2>Stay Connected</h2>
              <div className="sidebar__connected--socials">
                <FaFacebookF />
                <FaTwitter />
              </div>
            </div>
            <div className="sidebar__filters">
              <h2>Filter By Category</h2>
              <div className="sidebar__filters--buttons">
                <button className="btn btn--secondary">Financial Tips</button>
                <button className="btn btn--secondary">Student Journey</button>
                <button className="btn btn--secondary">Higher Ed</button>
                <button className="btn btn--secondary">Career Advice</button>
              </div>
            </div>
            <div className="sidebar__subscribe">
              <h2>Subscribe to our newsletter</h2>
              <form onSubmit={handleSubmit}>
                <TextInput
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  name="email"
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
                <TextInput
                  name="submit"
                  id="submit"
                  type="submit"
                  value="Submit"
                  className="btn btn--secondary"
                />
              </form>
            </div>
          </SideBar>
          <PostCards>
            {data.blog.nodes.slice(1, data.blog.nodes.length).map(post => {
              return (
                <BlogPostCard>
                  <div className="card--image">
                    <Link to={`resources/${post.slug}`}>
                      <Img fluid={post.leadImage.fluid} alt={post.title} />
                      <p className="card--label">{post.category}</p>
                    </Link>
                  </div>
                  <div className="card--info">
                    <Link className="card--link" to={`resources/${post.slug}`}>
                      {post.title}
                    </Link>
                    <p>{post.post.childMdx.excerpt}</p>
                  </div>
                </BlogPostCard>
              )
            })}
          </PostCards>
        </PostsContainer>
      </BlogContainer>
    </Layout>
  )
}

export default BlogPost
