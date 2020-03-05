import React, { useEffect, useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import { FaTimesCircle } from "react-icons/fa"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

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
  let allLocations = allSchools // takes all locations from all schools, flattens into single array, then removes duplicates, then sorts alphabetically
    .flatMap(school => school.basicInfo.locations)
    .reduce((acc, currVal) => {
      if (acc.indexOf(currVal) === -1) {
        acc.push(currVal)
      }
      return acc
    }, [])
    .sort()
  const [filteredSchools, setFilteredSchools] = useState(allSchools)
  const [activeIndex, setActiveIndex] = useState("")
  const [textFilter, setTextFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const filterButtons = [
    {
      name: "All Schools",
      value: "",
    },
    {
      name: "Technology",
      value: "technology",
    },
    {
      name: "Professional Training",
      value: "professionalTraining",
    },
    {
      name: "Licensure Training",
      value: "licensureTraining",
    },
  ]

  const filterSchools = () => {
    let filteredList = allSchools

    if (textFilter) {
      filteredList = filteredList.filter(school =>
        school.basicInfo.schoolname
          .toLowerCase()
          .trim()
          .includes(textFilter.toLowerCase().trim())
      )
    }
    if (categoryFilter) {
      filteredList = filteredList.filter(school =>
        school.basicInfo.programTypes.includes(categoryFilter)
      )
    }
    if (locationFilter) {
      filteredList = filteredList.filter(school =>
        school.basicInfo.locations.includes(locationFilter)
      )
    }
    setFilteredSchools(filteredList)
  }

  const resetFilters = () => {
    setActiveIndex("")
    setTextFilter("")
    setCategoryFilter("")
    setLocationFilter("")
    setFilteredSchools(allSchools)
  }

  useEffect(() => {
    filterSchools()
  }, [textFilter, categoryFilter, locationFilter])

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
      <FilterContainer>
        <FilterCard>
          <h3>Find your perfect school</h3>
          <label htmlFor="search">Search by school name</label>
          <input
            id="search"
            placeholder="Enter school name"
            value={textFilter}
            onChange={e => setTextFilter(e.target.value)}
          />
          <FilterRow>
            {filterButtons.map((button, i) => (
              <button
                key={i}
                value={button.value}
                className={activeIndex === i ? "btn active" : "btn inactive"}
                onClick={e => {
                  if (activeIndex === i) {
                    setActiveIndex("")
                    setCategoryFilter("")
                  } else {
                    setActiveIndex(i)
                    setCategoryFilter(e.target.value)
                  }
                }}
              >
                {button.name}
              </button>
            ))}
          </FilterRow>
          <FilterRow locationFilter={locationFilter}>
            <div>
              <label htmlFor="program">PROGRAM</label>
              <select id="program">
                <option>Select program</option>
                <option>Full Stack Web Development</option>
                <option>UX/UI</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label htmlFor="location">
                LOCATION{" "}
                <span onClick={() => setLocationFilter("")}>
                  <FaTimesCircle />
                </span>
              </label>
              <select
                onChange={e => setLocationFilter(e.target.value)}
                id="location"
                value={locationFilter}
              >
                <option>Select location</option>
                {allLocations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="length">LENGTH</label>
              <select id="length">
                <option>Select length</option>
                <option>4-7 weeks</option>
                <option>8-12 weeks</option>
                <option>13+ weeks</option>
              </select>
            </div>
            <div>
              <label htmlFor="schedule">SCHEDULE</label>
              <select id="schedule">
                <option>Select schedule</option>
                <option>Full-time (40+ hours/week)</option>
                <option>Part-time (20-39 hours/week)</option>
                <option>Self-paced</option>
              </select>
            </div>
          </FilterRow>
          <p onClick={resetFilters} className="hoverUnderline">
            Clear filters
          </p>
        </FilterCard>
      </FilterContainer>
      <CardContainer>
        {filteredSchools.map(school => {
          return (
            <Card locationList>
              <CardLogo>
                <Image
                  key={school.logo.childImageSharp.fluid}
                  fluid={school.logo.childImageSharp.fluid}
                  alt={school.basicInfo.schoolname}
                />
              </CardLogo>
              <CardInfo>
                <Link
                  className="btn text-black bg-white"
                  to={`students/${school.slug}`}
                >
                  {school.basicInfo.schoolname} Financing Page
                </Link>
                <div>
                  <CardColumn>
                    <p>Tuition Range</p>
                  </CardColumn>
                  <CardColumn>
                    <p>{school.basicInfo.tuitionRange}</p>
                  </CardColumn>
                </div>
                <div>
                  <CardColumn>
                    <p>Cost of Living Financing</p>
                  </CardColumn>
                  <CardColumn>
                    <p>
                      {school.features.costOfLiving
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

const Banner = styled.section`
  display: flex;
  height: 40vh;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;

    :last-of-type {
      /* margin: -3rem 0; */
      z-index: -5;
      height: 100%;
    }
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: normal;
  }
`

const FilterContainer = styled.section`
  background: linear-gradient(white 55%, #fd6d5d 0);
  width: 100%;
  min-height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 2rem 2rem;
`

const FilterCard = styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 75%;
  background: white;
  padding: 4rem 2rem;
  box-shadow: 2px 2px 5px gray;

  h3 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  p {
    position: relative;
    cursor: pointer;
    display: inline;

    :after {
      position: absolute;
      bottom: -25%;
      left: 0;
      right: 0;
      margin: auto;
      width: 85%;
      content: ".";
      color: transparent;
      background: black;
      height: 1px;
      transition: width 300ms;
    }
    :hover:after {
      width: 95%;
    }
  }

  .inactive {
    border: 1px solid black;
    background: transparent;
  }

  .active {
    border: 1px solid transparent;
    background: black;
    color: white;
  }
`

const FilterRow = styled.div`
  display: flex;
  margin: 4rem 0;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    :not(:last-of-type) {
      margin-right: 2rem;
    }
  }
  span {
    opacity: ${({ locationFilter }) => (locationFilter ? "1" : "0")};
    color: red;
    margin-left: 0.25rem;
    cursor: pointer;
  }
  label {
    display: flex;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
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
