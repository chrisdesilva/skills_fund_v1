import React, { useState } from "react"
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
                fluid(grayscale: true) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            basicInfo {
              APRRange36
              APRRange60
              tuitionRange
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
  let school = data.allSchoolsJson.edges
  let allLocations = school // takes all locations from all schools, flattens into single array, then removes duplicates, then sorts alphabetically
    .flatMap(school => school.node.basicInfo.locations)
    .reduce((acc, currVal) => {
      if (acc.indexOf(currVal) === -1) {
        acc.push(currVal)
      }
      return acc
    }, [])
    .sort()
  let allSchools = school.map(school => school.node)

  console.log("all schools ", allSchools)

  return (
    <Layout>
      <CardContainer>
        {school.map(school => {
          const bootcamp = school.node
          return (
            <Card locationList>
              <CardLogo>
                <Image
                  fluid={bootcamp.logo.childImageSharp.fluid}
                  alt={bootcamp.basicInfo.schoolname}
                />
              </CardLogo>
              <CardInfo>
                <Link
                  className="btn text-black bg-white"
                  to={`students/${bootcamp.slug}`}
                >
                  {bootcamp.basicInfo.schoolname} Financing Page
                </Link>
                <div>
                  <CardColumn>
                    <p>Tuition Range</p>
                  </CardColumn>
                  <CardColumn>
                    <p>{bootcamp.basicInfo.tuitionRange}</p>
                  </CardColumn>
                </div>
                <div>
                  <CardColumn>
                    <p>Cost of Living Financing</p>
                  </CardColumn>
                  <CardColumn>
                    <p>
                      {bootcamp.features.costOfLiving
                        ? "Available"
                        : "Not Available"}
                    </p>
                  </CardColumn>
                </div>
                {/* <div>
                  <CardColumn>
                    <p>Locations</p>
                  </CardColumn>
                  <CardColumn>
                    {bootcamp.basicInfo.locations
                      .slice(0, locationList)
                      .map(location => (
                        <p>{location} </p>
                      ))}
                    {bootcamp.basicInfo.locations.length > 3 && (
                      <p
                        className="cursor-pointer text-purple"
                        onClick={() => {
                          if (locationList === 3) {
                            setLocationList(bootcamp.basicInfo.locations.length)
                          } else {
                            setLocationList(3)
                          }
                        }}
                      >
                        {locationList === 3 ? "See More" : "See Less"}
                      </p>
                    )}
                  </CardColumn>
                </div> */}
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Card = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid gray;
  border-radius: 5px;
  box-shadow: 2px 2px 10px lightgray;
`

const CardLogo = styled.div`
  height: 92px;
  width: 150px;
`

const CardInfo = styled.div`
  height: 75%;
  width: 100%;
  border-top: 1px solid gray;
  display: flex;
  flex-direction: column;

  a {
    width: 15rem;
    text-align: center;
    margin: 1rem;
    align-self: center;
    border: 2px solid black;

    :hover {
      color: white;
      background: black;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.25rem;
    font-size: 0.8rem;
  }
`

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`
