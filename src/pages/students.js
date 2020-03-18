import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"
import SchoolCards from "../components/students/SchoolCards"
import SchoolFilter from "../components/students/SchoolFilter"
import { breakpoint } from "../utils/breakpoints"
import SchoolList from "../components/students/SchoolList"
import { useSchoolData } from "../hooks/useSchoolData"

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

const Banner = styled.section`
  display: none;
  padding: 0 7.5rem;
  background: white;

  @media ${breakpoint.lg} {
    height: 30vh;
    display: flex;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    :first-of-type {
      width: 45%;
    }

    :last-of-type {
      z-index: -5;
      height: 100%;
      width: 55%;
      align-items: flex-end;

      .gatsby-image-wrapper {
        width: 100%;
      }
    }

    @media ${breakpoint.xl} {
      margin: 0 2rem;
      :first-of-type {
        width: 50%;
      }

      :last-of-type {
        z-index: -5;
        height: 100%;
        width: 50%;
      }
    }
  }

  h1 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    @media ${breakpoint.md} {
      font-size: 1.5rem;
    }
    @media ${breakpoint.lg} {
      font-size: 1.75rem;
    }
    @media ${breakpoint.xl} {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;

    @media ${breakpoint.xl} {
      font-size: 1.25rem;
    }
  }
`
