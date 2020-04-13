import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Layout from "../../components/layout/Layout"
import SEO from "../../components/layout/SEO"

export const data = graphql`
  query($slug: String!) {
    contentfulLegal(slug: { eq: $slug }) {
      slug
      title
      content {
        childMdx {
          body
        }
      }
    }
  }
`

const LegalDoc = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.contentfulLegal.title} />
      <Container>
        <MDXRenderer>{data.contentfulLegal.content.childMdx.body}</MDXRenderer>
      </Container>
    </Layout>
  )
}

export default LegalDoc

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  h1 {
    margin: 3rem 0;
    text-align: center;
  }

  a:not(.btn) {
    text-decoration: none;
    color: black;
    transition: background-position 120ms;
    background-image: linear-gradient(
      transparent 0%,
      transparent calc(50% - 9px),
      rgba(255, 164, 161, 0.5) calc(50% - 9px),
      rgba(255, 164, 161, 0.5) 100%
    );
    background-size: 100% 225%;
    background-position: 0px 0px;

    :hover {
      background-image: linear-gradient(
        transparent 0%,
        transparent calc(50% - 9px),
        rgba(233, 105, 101, 1) calc(50% - 9px),
        rgba(233, 105, 101, 1) 100%
      );
      background-position: center center;
    }
  }
`
