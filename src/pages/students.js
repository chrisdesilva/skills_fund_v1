import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SchoolCards from "../components/students/SchoolCards"
import SchoolFilter from "../components/students/SchoolFilter"
import { breakpoint } from "../utils/breakpoints"
import SchoolList from "../components/students/SchoolList"

const Students = () => {
  const data = useStaticQuery(graphql`
    query {
      allSchoolsJson(sort: { fields: slug, order: ASC }) {
        edges {
          node {
            logo {
              childImageSharp {
                fluid(grayscale: true) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            basicInfo {
              APRRange36
              APRRange60
              applicationsLive
              disabledLoanAppFormID
              hubspotFormID
              interestRate36
              interestRate60
              locations
              nextCohortStartDate
              programTypes
              schoolcode
              schoolname
              schoolurl
              selectAProgram
              tuitionRange
            }
            paymentTable {
              data {
                program
                col
                max
                tuition
              }
              headers
              show
            }
            features {
              costOfLiving
              multiLoanLengths
              multiPrograms
              products
            }
            loanInfo {
              aprAndType {
                info {
                  apr36
                  apr60
                  maxCOL
                  maxTuition
                  type
                }
              }
              defaultAmount
              hubspotValue
              metros {
                location
                max
              }
              multiMetros
              name
              nonPaymentPeriod
              segment
              queryParams
            }
            id
            slug
          }
        }
      }
      student: file(relativePath: { eq: "brooke-cagle-unsplash.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  let allSchools = data.allSchoolsJson.edges.map(school => school.node)
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
        <SchoolCards filteredSchools={filteredSchools} />
      ) : (
        <SchoolList filteredSchools={filteredSchools} />
      )}
    </Layout>
  )
}

export default Students

const Banner = styled.section`
  display: none;

  @media ${breakpoint.lg} {
    height: 30vh;
    display: flex;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 1rem;
    text-align: center;

    :last-of-type {
      /* margin: -3rem 0; */
      z-index: -5;
      height: 100%;
      width: 50%;
    }
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    @media ${breakpoint.md} {
      font-size: 3rem;
    }
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;

    @media ${breakpoint.md} {
      font-size: 1.25rem;
    }
  }
`
