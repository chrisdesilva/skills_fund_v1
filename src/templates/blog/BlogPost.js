import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import BlogLayout from "../../components/layout/BlogLayout"

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
      <h1>{data.post.title}</h1>
      <p>
        {data.post.post.childMdx.frontmatter.date} -{" "}
        {data.post.post.childMdx.frontmatter.author}
      </p>
      <MDXRenderer>{data.post.post.childMdx.body}</MDXRenderer>
    </BlogLayout>
  )
}

export default BlogPost
