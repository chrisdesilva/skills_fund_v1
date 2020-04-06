import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"
import SchoolCards from "../components/students/SchoolCards"
import SchoolFilter from "../components/students/SchoolFilter"
import SchoolList from "../components/students/SchoolList"
import { useSchoolData } from "../hooks/useSchoolData"
import { Banner } from "../components/students/Students.styles"

const Students = () => {
  const data = useStaticQuery(graphql`
    query {
      student: file(relativePath: { eq: "brooke-cagle-unsplash.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      skfLogo: file(relativePath: { eq: "skillsFund_logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const { edges } = useSchoolData()
  let allSchools = edges.map(school => school.node)
  const [filteredSchools, setFilteredSchools] = useState(allSchools)
  const [activeView, setActiveView] = useState("cards")

  return (
    <Layout>
      <SEO title="Students" />
      <Banner>
        <div>
          <h1>Schools worthy of your future</h1>
          <h2>
            Our vetted partner schools put you on a path towards a better
            career.
          </h2>
        </div>
        <div>
          <Image
            fluid={data.student.childImageSharp.fluid}
            alt="Person working on laptop - photo by Brooke Cagle"
          />
        </div>
      </Banner>
      <SchoolFilter
        allSchools={allSchools}
        setFilteredSchools={setFilteredSchools}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {activeView === "cards" ? (
        <SchoolCards
          filteredSchools={filteredSchools}
          skfLogo={data.skfLogo.childImageSharp.fluid}
        />
      ) : (
        <SchoolList
          filteredSchools={filteredSchools}
          skfLogo={data.skfLogo.childImageSharp.fluid}
        />
      )}
    </Layout>
  )
}

export default Students
