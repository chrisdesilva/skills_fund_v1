import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FaTimesCircle, FaThLarge, FaThList } from "react-icons/fa"
import { breakpoint } from "../../utils/breakpoints"

const SchoolFilter = ({
  allSchools,
  setFilteredSchools,
  activeView,
  setActiveView,
}) => {
  let allLocations = allSchools // takes all locations from all schools, flattens into single array, then removes duplicates, then sorts alphabetically
    .flatMap(school => school.basicInfo.locations)
    .reduce((acc, currVal) => {
      if (acc.indexOf(currVal) === -1) {
        acc.push(currVal)
      }
      return acc
    }, [])
    .sort()
  const [activeIndex, setActiveIndex] = useState("")
  const [textFilter, setTextFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [scheduleFilter, setScheduleFilter] = useState("")
  const [lengthFilter, setLengthFilter] = useState("")
  const filterButtons = [
    {
      name: "Software Development",
      value: "fullStack",
    },
    {
      name: "Game Development",
      value: "gameDev",
    },
    {
      name: "DevOps",
      value: "devOps",
    },
    {
      name: "UX/UI Design",
      value: "uxui",
    },
    {
      name: "Data Science",
      value: "dataScience",
    },
    {
      name: "Cybersecurity",
      value: "security",
    },
    {
      name: "Marketing",
      value: "marketing",
    },
    {
      name: "Healthcare",
      value: "healthcare",
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
    setLengthFilter("")
    setScheduleFilter("")
    setFilteredSchools(allSchools)
  }

  useEffect(() => {
    filterSchools()
  }, [textFilter, categoryFilter, locationFilter, scheduleFilter, lengthFilter])

  return (
    <FilterContainer>
      <FilterCard>
        <h3>Find your perfect school</h3>
        <label htmlFor="search">Search by school name</label>
        <input
          id="search"
          placeholder="Enter school name"
          type="text"
          value={textFilter}
          onChange={e => setTextFilter(e.target.value)}
        />
        <button
          className="btn btn--filters"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <Filters showFilters={showFilters}>
          <FilterRow>
            {filterButtons.map((button, i) => (
              <div className="filter--button">
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
              </div>
            ))}
          </FilterRow>
          <FilterRow locationFilter={locationFilter}>
            <div id="programFilter" className="filter--dropdown">
              <label htmlFor="program">
                PROGRAM{" "}
                <span
                  className={categoryFilter ? "opacity-100" : "opacity-0"}
                  onClick={() => setCategoryFilter("")}
                >
                  <FaTimesCircle />
                </span>
              </label>
              <select
                onChange={e => setCategoryFilter(e.target.value)}
                value={categoryFilter}
                id="program"
              >
                <option>Select program</option>
                {filterButtons.map(program => (
                  <option key={program.value} value={program.value}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter--dropdown">
              <label htmlFor="location">
                LOCATION
                <span
                  className={locationFilter ? "opacity-100" : "opacity-0"}
                  onClick={() => setLocationFilter("")}
                >
                  <FaTimesCircle />
                </span>
              </label>
              <select
                onChange={e => setLocationFilter(e.target.value)}
                id="location"
                value={locationFilter}
              >
                <option>Select location</option>
                <option key="online" value="Online">
                  Online
                </option>
                {allLocations.map(
                  location =>
                    location !== "Online" && (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="filter--dropdown">
              <label htmlFor="length">
                LENGTH{" "}
                <span
                  className={lengthFilter ? "opacity-100" : "opacity-0"}
                  onClick={() => setLengthFilter("")}
                >
                  <FaTimesCircle />
                </span>
              </label>
              <select
                id="length"
                onChange={e => setLengthFilter(e.target.value)}
                value={lengthFilter}
              >
                <option>Select length</option>
                <option>4-7 weeks</option>
                <option>8-12 weeks</option>
                <option>13+ weeks</option>
              </select>
            </div>
            <div className="filter--dropdown">
              <label htmlFor="schedule">
                SCHEDULE{" "}
                <span
                  className={scheduleFilter ? "opacity-100" : "opacity-0"}
                  onClick={() => setScheduleFilter("")}
                >
                  <FaTimesCircle />
                </span>
              </label>
              <select
                id="schedule"
                onChange={e => setScheduleFilter(e.target.value)}
                value={scheduleFilter}
              >
                <option>Select schedule</option>
                <option>Full-time (40+ hours/week)</option>
                <option>Part-time (20-39 hours/week)</option>
                <option>Self-paced</option>
              </select>
            </div>
          </FilterRow>
          <FilterRow activeView={activeView}>
            <p onClick={resetFilters} className="hoverUnderline">
              Clear filters
            </p>
            <div>
              <p>View:</p>
              <FaThLarge id="cards" onClick={() => setActiveView("cards")} />
              <FaThList id="list" onClick={() => setActiveView("list")} />
            </div>
          </FilterRow>
        </Filters>
      </FilterCard>
    </FilterContainer>
  )
}

export default SchoolFilter

const FilterContainer = styled.section`
  background: linear-gradient(white 55%, #fd6d5d 0);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  @media ${breakpoint.lg} {
    padding: 0 2rem 2rem 2rem;
  }
`

const FilterCard = styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 75%;
  background: white;
  padding: 1rem 1rem 1rem 1rem;
  box-shadow: 2px 2px 5px gray;

  h3 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;

    @media ${breakpoint.md} {
      font-size: 2rem;
    }
  }

  .btn--filters {
    width: 8rem;
    padding: 0.25rem 0.5rem;
    margin-top: 0.5rem;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right 0.3em top 55%, 0 0;
    background-size: 0.65em auto, 100%;

    @media ${breakpoint.lg} {
      display: none;
    }
  }

  .hoverUnderline {
    position: relative;
    cursor: pointer;
    display: inline;
    font-size: 0.75rem;

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
  flex-wrap: wrap;
  margin: 2rem 0 1rem 0;
  justify-content: space-around;

  :first-of-type {
    display: none;

    @media ${breakpoint.lg} {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.5rem;
    }

    @media ${breakpoint.xl} {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 0.5rem;
    }
  }

  :last-of-type {
    display: none;
    @media ${breakpoint.xl} {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      div {
        display: flex;
        width: 10rem;
        justify-content: space-evenly;
        align-items: center;

        p {
          font-size: 0.75rem;
        }

        svg {
          font-size: 1.5rem;
          cursor: pointer;
          transition: opacity 300ms;
        }

        #cards {
          opacity: ${({ activeView }) => (activeView === "cards" ? "1" : ".5")};
        }

        #list {
          opacity: ${({ activeView }) => (activeView === "list" ? "1" : ".5")};
        }
      }
    }
  }

  .filter--button {
    display: flex;
    justify-content: center;
  }

  .filter--dropdown {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 1rem;

    @media ${breakpoint.lg} {
      width: calc(33% - 2rem);
    }

    &#programFilter {
      @media ${breakpoint.lg} {
        display: none;
      }
    }
  }

  span {
    color: red;
    margin-left: 0.25rem;
    cursor: pointer;
  }

  label {
    display: flex;
  }
`

const Filters = styled.div`
  display: ${({ showFilters }) => (showFilters ? "block" : "none")};

  @media ${breakpoint.lg} {
    display: block;
  }
`
