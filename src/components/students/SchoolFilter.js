import React, { useEffect, useState } from "react"
import { FaThLarge, FaThList } from "react-icons/fa"
import { useKeyPress } from "../../hooks/useKeyPress"
import TextInput from "../common/TextInput"
import SelectInput from "../common/SelectInput"
import {
  FilterCard,
  FilterContainer,
  FilterRow,
  Filters,
} from "./SchoolFilter.styled"

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
  const [locations, setLocations] = useState(allLocations)
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
      allLocations = filteredList // takes all locations from all schools, flattens into single array, then removes duplicates, then sorts alphabetically
        .flatMap(school => school.schoolInfo.basicInfo.locations)
        .reduce((acc, currVal) => {
          if (acc.indexOf(currVal) === -1) {
            acc.push(currVal)
          }
          return acc
        }, [])
        .sort()
      setLocations(allLocations)
    }
    if (locationFilter) {
      filteredList = filteredList.filter(school =>
        school.schoolInfo.basicInfo.locations.includes(locationFilter)
      )
    }

    if (lengthFilter) {
      filteredList = filteredList.filter(school =>
        school.schoolInfo.basicInfo.programLengths.includes(lengthFilter)
      )
    }

    if (scheduleFilter) {
      filteredList = filteredList.filter(school =>
        school.schoolInfo.basicInfo.weeklySchedules.includes(scheduleFilter)
      )
    }
    setLocations(allLocations)
    setFilteredSchools(filteredList)
  }

  const resetFilters = () => {
    setTextFilter("")
    setCategoryFilter("")
    setLocationFilter("")
    setLengthFilter("")
    setScheduleFilter("")
    setLocations(allLocations)
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

  let programOptions = (
    <>
      <option value="default">---</option>
      {programCategories.map(program => (
        <option key={program.value} value={program.value}>
          {program.name}
        </option>
      ))}
    </>
  )

  let locationOptions = (
    <>
      <option value="default">---</option>
      <option key="online" value="Online">
        Online
      </option>
      {locations.map(
        location =>
          location !== "Online" && (
            <option key={location} value={location}>
              {location}
            </option>
          )
      )}
    </>
  )

  let lengthOptions = (
    <>
      <option value="default">---</option>
      <option value="4-7">4-7 weeks</option>
      <option value="8-11">8-11 weeks</option>
      <option value="12-15">12-15 weeks</option>
      <option value="16+">16+ weeks</option>
    </>
  )

  let weeklyOptions = (
    <>
      <option value="default">---</option>
      <option value="full-time">Full-time (40+ hours/week)</option>
      <option value="part-time">Part-time (20-39 hours/week)</option>
      <option value="self-paced">Self-paced</option>
    </>
  )

  return (
    <FilterContainer>
      <FilterCard>
        <h3>Find your perfect school</h3>
        <div className="filter--search">
          <label htmlFor="search">Search by school name</label>
          <TextInput
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
              <SelectInput
                onChange={e => setCategoryFilter(e.target.value)}
                value={categoryFilter}
                id="program"
                defaultValue={"default"}
                options={programOptions}
              />
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
              <SelectInput
                onChange={e => setLocationFilter(e.target.value)}
                id="location"
                value={locationFilter}
                defaultValue={"default"}
                options={locationOptions}
              />
              <p
                className="hoverUnderline clearFilter"
                id="locationFilter"
                onClick={() => {
                  setLocationFilter("")
                  setLocations(allLocations)
                }}
              >
                Clear
              </p>
            </div>
            <div className="filter--dropdown">
              <label htmlFor="length">LENGTH OF PROGRAM </label>
              <SelectInput
                id="length"
                onChange={e => setLengthFilter(e.target.value)}
                value={lengthFilter}
                defaultValue={"default"}
                options={lengthOptions}
              />
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
              <SelectInput
                id="schedule"
                onChange={e => setScheduleFilter(e.target.value)}
                value={scheduleFilter}
                defaultValue={"default"}
                options={weeklyOptions}
              />
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
