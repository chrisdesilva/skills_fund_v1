import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import BlogLayout from "../../components/layout/BlogLayout"
import SEO from "../../components/layout/SEO"

export const data = graphql`
  query($slug: String!) {
    post: contentfulBlog(slug: { eq: $slug }) {
      slug
      title
      post {
        childMdx {
          body
          frontmatter {
            author
            date
            title
          }
        }
      }
    }
  }
`

const BlogPost = ({ data }) => {
  return (
    <BlogLayout>
      <SEO title={data.post.title} />
      <h1>{data.post.title}</h1>
      <MDXRenderer>{data.post.post.childMdx.body}</MDXRenderer>
    </BlogLayout>
  )
}

export default BlogPost
