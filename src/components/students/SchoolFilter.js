import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FaThLarge, FaThList } from "react-icons/fa"
import { breakpoint } from "../../utils/breakpoints"
import { useKeyPress } from "../../hooks/useKeyPress"

const ListItem = ({
  item,
  active,
  setTextFilter,
  setCursor,
  setHovered,
  setMatchingPrograms,
}) => (
  <li
    className={`item ${active ? "active" : ""}`}
    onClick={() => {
      setTextFilter(item)
      setMatchingPrograms([])
      setHovered(undefined)
      setCursor(0)
    }}
    onMouseEnter={() => setHovered(item)}
    onMouseLeave={() => setHovered(undefined)}
  >
    {item}
  </li>
)

const SchoolFilter = ({
  allSchools,
  setFilteredSchools,
  activeView,
  setActiveView,
}) => {
  let allLocations = allSchools // takes all locations from all schools, flattens into single array, then removes duplicates, then sorts alphabetically
    .flatMap(school => school.schoolInfo.basicInfo.locations)
    .reduce((acc, currVal) => {
      if (acc.indexOf(currVal) === -1) {
        acc.push(currVal)
      }
      return acc
    }, [])
    .sort()
  const [textFilter, setTextFilter] = useState("")
  const [matchingPrograms, setMatchingPrograms] = useState([])
  const downPress = useKeyPress("ArrowDown")
  const upPress = useKeyPress("ArrowUp")
  const enterPress = useKeyPress("Enter")
  const [cursor, setCursor] = useState(0)
  const [hovered, setHovered] = useState(undefined)
  const [showFilters, setShowFilters] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [scheduleFilter, setScheduleFilter] = useState("")
  const [lengthFilter, setLengthFilter] = useState("")
  const programCategories = [
    {
      name: "Web Development",
      value: "fullStack",
    },
    {
      name: "Mobile Development",
      value: "mobile",
    },
    {
      name: "Game Development",
      value: "gameDev",
    },
    {
      name: "Data Science",
      value: "dataScience",
    },
    {
      name: "UX/UI Design",
      value: "uxui",
    },
    {
      name: "Project Management",
      value: "projectManagement",
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
      name: "Other",
      value: "other",
    },
  ]

  const filterSchools = () => {
    let filteredList = allSchools

    if (textFilter) {
      filteredList = filteredList.filter(school =>
        school.schoolInfo.basicInfo.schoolname
          .toLowerCase()
          .trim()
          .includes(textFilter.toLowerCase().trim())
      )
    }
    if (categoryFilter) {
      filteredList = filteredList.filter(school =>
        school.schoolInfo.basicInfo.programTypes.includes(categoryFilter)
      )
    }
    if (locationFilter) {
      filteredList = filteredList.filter(school =>
        school.schoolInfo.basicInfo.locations.includes(locationFilter)
      )
    }
    setFilteredSchools(filteredList)
  }

  const resetFilters = () => {
    setTextFilter("")
    setCategoryFilter("")
    setLocationFilter("")
    setLengthFilter("")
    setScheduleFilter("")
    setFilteredSchools(allSchools)
  }

  const findMatches = program => {
    const matches = allSchools
      .filter(school => {
        const regex = new RegExp(program, "gi")
        return school.schoolInfo.basicInfo.schoolname.match(regex)
      })
      .map(program => program.schoolInfo.basicInfo.schoolname)
    setMatchingPrograms(matches)
  }

  useEffect(() => {
    filterSchools()
    findMatches(textFilter)
  }, [textFilter, categoryFilter, locationFilter, scheduleFilter, lengthFilter])

  useEffect(() => {
    if (matchingPrograms.length && downPress) {
      setCursor(prevState =>
        prevState < matchingPrograms.length - 1 ? prevState + 1 : prevState
      )
    }
  }, [downPress])
  useEffect(() => {
    if (matchingPrograms.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState))
    }
  }, [upPress])
  useEffect(() => {
    if (matchingPrograms.length && enterPress) {
      setTextFilter(matchingPrograms[cursor])
    }
  }, [cursor, enterPress])
  useEffect(() => {
    if (matchingPrograms.length && hovered) {
      setCursor(matchingPrograms.indexOf(hovered))
    }
  }, [hovered])

  return (
    <FilterContainer>
      <FilterCard>
        <h3>Find your perfect school</h3>
        <div className="filter--search">
          <label htmlFor="search">Search by school name</label>
          <input
            id="search"
            placeholder="Enter school name"
            type="text"
            autoComplete="off"
            value={textFilter}
            onChange={e => {
              setTextFilter(e.target.value)
              findMatches(textFilter)
            }}
          />
          {textFilter && (
            <ul>
              {matchingPrograms.map((program, i) => (
                <ListItem
                  key={program}
                  active={i === cursor}
                  item={program}
                  setMatchingPrograms={setMatchingPrograms}
                  setTextFilter={setTextFilter}
                  setHovered={setHovered}
                  setCursor={setCursor}
                />
              ))}
            </ul>
          )}
        </div>
        <button
          className="btn btn--filters"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <Filters showFilters={showFilters}>
          <FilterRow
            categoryFilter={categoryFilter}
            locationFilter={locationFilter}
            lengthFilter={lengthFilter}
            lengthFilter={lengthFilter}
            scheduleFilter={scheduleFilter}
          >
            <div className="filter--dropdown">
              <label htmlFor="program">PROGRAM </label>
              <select
                onChange={e => setCategoryFilter(e.target.value)}
                value={categoryFilter}
                id="program"
              >
                <option>Select program</option>
                {programCategories.map(program => (
                  <option key={program.value} value={program.value}>
                    {program.name}
                  </option>
                ))}
              </select>
              <p
                className="hoverUnderline clearFilter"
                id="categoryFilter"
                onClick={() => setCategoryFilter("")}
              >
                Clear
              </p>
            </div>
            <div className="filter--dropdown">
              <label htmlFor="location">CAMPUS/ONLINE</label>
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
              <p
                className="hoverUnderline clearFilter"
                id="locationFilter"
                onClick={() => setLocationFilter("")}
              >
                Clear
              </p>
            </div>
            <div className="filter--dropdown">
              <label htmlFor="length">LENGTH OF PROGRAM </label>
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
              <p
                className="hoverUnderline clearFilter"
                id="lengthFilter"
                onClick={() => setLengthFilter("")}
              >
                Clear
              </p>
            </div>
            <div className="filter--dropdown">
              <label htmlFor="schedule">WEEKLY TIME COMMITMENT </label>
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
              <p
                className="hoverUnderline clearFilter"
                id="scheduleFilter"
                onClick={() => setScheduleFilter("")}
              >
                Clear
              </p>
            </div>
          </FilterRow>
          <FilterRow activeView={activeView}>
            <p onClick={resetFilters} className="hoverUnderline">
              Clear All Filters
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
    padding: 0 0 1rem 0;
  }
`

const FilterCard = styled.div`
  border: 1px solid lightgray;
  width: 75%;
  background: white;
  padding: 1rem 1rem 1rem 1rem;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;

  h3 {
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 1rem;

    @media ${breakpoint.md} {
      font-size: 1.5rem;
    }
  }

  .btn--filters {
    width: 8rem;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0 0 1rem;
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

  .filter--search {
    margin: 0 1rem;
    position: relative;

    #search {
      position: relative;
    }

    ul {
      position: absolute;
      padding: 0;
      margin: 0;
      font-size: 0.75rem;
      width: 100%;
      top: 3.25rem;
      z-index: 5;
      li {
        list-style-type: none;
        padding: 0.75rem;
        background: #f7f7f7;
        border-bottom: 1px solid #d9d9d9;
        cursor: pointer;

        &.active {
          background: ${props => props.theme.secondary};
        }
      }
    }
  }
`

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0 1rem 0;
  justify-content: space-around;

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
    align-items: flex-start;
    margin: 0 1rem;
    width: 100%;

    select {
      margin-bottom: 0;
    }

    @media ${breakpoint.lg} {
      width: calc(25% - 2rem);
    }
  }

  .clearFilter {
    margin: 0.25rem 0.75rem;
    font-size: 0.6rem;
    display: inline;
    transition: opacity 300ms;
  }

  #categoryFilter {
    opacity: ${({ categoryFilter }) => (categoryFilter ? "1" : "0")};
  }

  #locationFilter {
    opacity: ${({ locationFilter }) => (locationFilter ? "1" : "0")};
  }

  #lengthFilter {
    opacity: ${({ lengthFilter }) => (lengthFilter ? "1" : "0")};
  }

  #scheduleFilter {
    opacity: ${({ scheduleFilter }) => (scheduleFilter ? "1" : "0")};
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
