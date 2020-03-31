import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Banner = () => {
  const data = useStaticQuery(graphql`
    query {
      banner: file(relativePath: { eq: "bluebanner.png" }) {
        childImageSharp {
          fluid(maxWidth: 3000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <div>
      <Img fluid={data.banner.childImageSharp.fluid} alt="Banner" />
    </div>
  )
}

export default Banner
