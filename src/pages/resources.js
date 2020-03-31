import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../components/layout/Layout"

const BlogPost = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <ul>
        {data.allMdx.nodes.map(post => {
          return (
            <Link to={`resources/${post.frontmatter.slug}`}>
              {post.frontmatter.title}
            </Link>
          )
        })}
      </ul>
    </Layout>
  )
}

export default BlogPost
