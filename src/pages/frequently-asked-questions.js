import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"
import { Container } from "../components/faq/frequently-asked-questions.styled"

const FAQs = () => {
  const data = useStaticQuery(graphql`
    {
      faq: allContentfulFaq {
        nodes {
          faq {
            childMdx {
              body
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Frequently Asked Questions" />
      <Container>
        <MDXRenderer>{data.faq.nodes[0].faq.childMdx.body}</MDXRenderer>
      </Container>
    </Layout>
  )
}

export default FAQs
