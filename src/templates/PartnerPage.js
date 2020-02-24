import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/Layout"

export const query = graphql`
  query($slug: String!) {
    schoolsJson(slug: { eq: $slug }) {
      basicInfo {
        schoolname
      }
      logo {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`

const PartnerPage = ({ data }) => {
  const school = data.schoolsJson
  return (
    <Layout>
      <h1>{school.basicInfo.schoolname}</h1>
      <Image
        className="w-64"
        fluid={school.logo.childImageSharp.fluid}
        alt="school logo"
      />
    </Layout>
  )
}

export default PartnerPage
