import React, { Fragment } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import { breakpoint } from "../utils/breakpoints"
import Layout from "../components/Layout"

const Students = () => {
  const data = useStaticQuery(graphql`
    query {
      allSchoolsJson {
        edges {
          node {
            slug
            logo {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
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
              schoolname
              schoolurl
              selectAProgram
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
                apr36
                apr60
                maxCOL
                maxTuition
                type
              }
              defaultAmount
              hubspotValue
              metros {
                location
                maxCOL
                maxTuition
              }
              multiMetros
              name
              nonPaymentPeriod
              segment
            }
          }
        }
      }
    }
  `)
  const school = data.allSchoolsJson.edges

  return (
    <Layout>
      <CardContainer>
        {school.map(school => {
          const bootcamp = school.node
          return (
            <Card>
              <CardLogo>
                <Image
                  fluid={bootcamp.logo.childImageSharp.fluid}
                  alt={bootcamp.basicInfo.schoolname}
                />
              </CardLogo>
              <CardInfo>
                <Link to={`students/${bootcamp.slug}`}>More Info</Link>
                <p>Tuition: {bootcamp.loanInfo[0].aprAndType[0].maxTuition}</p>
                <p>
                  Locations:{" "}
                  {bootcamp.basicInfo.locations.map(location => (
                    <span>{location.toUpperCase()} </span>
                  ))}
                </p>
              </CardInfo>
            </Card>
          )
        })}
      </CardContainer>
    </Layout>
  )
}

export default Students

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;

  @media ${breakpoint.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(5, 1fr);
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  border: 1px solid black;
  height: 15rem;
`

const CardLogo = styled.div`
  height: 25%;
  padding: 1rem;
  border-bottom: 1px solid black;
`

const CardInfo = styled.div`
  height: 75%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
