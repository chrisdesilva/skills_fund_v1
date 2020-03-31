import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import BlogLayout from "../components/layout/BlogLayout"

export const data = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        date
      }
      body
    }
  }
`

const BlogPost = ({ data }) => {
  return (
    <BlogLayout>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </BlogLayout>
  )
}

export default BlogPost
