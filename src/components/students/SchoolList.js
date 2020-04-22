import React, { useState } from "react"
import { Link } from "gatsby"
import { AnimatePresence } from "framer-motion"
import Image from "gatsby-image"
import { FaQuestionCircle } from "react-icons/fa"
import { useApplication } from "../../hooks/useApplication"
import { ListContainer, ListColumn, ListItem } from "./SchoolList.styled"

const SchoolList = ({ filteredSchools }) => {
  const [email, handleEmail] = useApplication()
  const [listIndex, setListIndex] = useState("")
  const [applyForm, setApplyForm] = useState([])
  const [loanUrl, setLoanUrl] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    window.open(loanUrl)
  }
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <ListContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {filteredSchools.map((school, i) => (
          <ListItem>
            <ListColumn>
              <div className="logo">
                <a
                  href={school.schoolInfo.basicInfo.schoolurl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    key={school.logo.fluid}
                    fluid={school.logo.fluid}
                    alt={school.schoolInfo.basicInfo.schoolname}
                  />
                </a>
              </div>
              <div>
                <Link className="hoverUnderline" to={`students/${school.slug}`}>
                  Calculate Paymehts
                </Link>
              </div>
            </ListColumn>
            <ListColumn>
              <h4>{school.schoolInfo.basicInfo.schoolname}</h4>
              {school.schoolInfo.basicInfo.locations
                .sort()
                .slice(
                  0,
                  listIndex === i
                    ? school.schoolInfo.basicInfo.locations.length
                    : 2
                )
                .map(location => (
                  <p>{location} </p>
                ))}
              {school.schoolInfo.basicInfo.locations.length > 2 && (
                <button
                  className="cursor-pointer font-bold textButton p-0 text-left"
                  onClick={() =>
                    listIndex === i ? setListIndex("") : setListIndex(i)
                  }
                >
                  {listIndex === i ? "Show Less" : "Show More"}
                </button>
              )}
            </ListColumn>
            <ListColumn>
              <div id="tooltip--parent">
                <h3>
                  Tuition Range <FaQuestionCircle className="text-xs" />
                </h3>
                <div id="tooltip--tip">
                  <p>
                    Range of tuition for programs financed by Skills Fund. You
                    can borrow from $2,000 in tuition up to the max for your
                    program.
                  </p>
                </div>
              </div>
              <p>{school.schoolInfo.basicInfo.tuitionRange}</p>
            </ListColumn>
            <ListColumn>
              <div id="tooltip--parent">
                <h3>
                  Living Expenses <FaQuestionCircle className="text-xs" />
                </h3>
                <div id="tooltip--tip">
                  <p>
                    Schools that offer living expenses financing allow you to
                    borrow money for living expenses in addition to tuition.
                  </p>
                </div>
              </div>
              <p>
                {school.schoolInfo.features.costOfLiving
                  ? "Available"
                  : "Not Available"}
              </p>
            </ListColumn>
            <ListColumn>
              <h3>Programs</h3>
              {school.schoolInfo.loanInfo
                .sort()
                .slice(
                  0,
                  listIndex === i
                    ? school.schoolInfo.basicInfo.locations.length
                    : 2
                )
                .map(program => (
                  <p>{program.name} </p>
                ))}
              {school.schoolInfo.loanInfo.length > 2 && (
                <button
                  className="cursor-pointer font-bold textButton p-0 text-left"
                  onClick={() =>
                    listIndex === i ? setListIndex("") : setListIndex(i)
                  }
                >
                  {listIndex === i ? "Show Less" : "Show More"}
                </button>
              )}
            </ListColumn>
            <ListColumn>
              {!applyForm.includes(i) && (
                <btn
                  className="btn"
                  onClick={() => {
                    setApplyForm([i])
                    setLoanUrl(school.schoolInfo.basicInfo.schoolcode)
                  }}
                >
                  Apply For Funding
                </btn>
              )}
              {applyForm.includes(i) && (
                <form className="input">
                  {/* <label htmlFor="email">
                                Enter your email to apply for financing
                              </label> */}
                  <div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      onChange={handleEmail}
                    />
                    <input
                      type="submit"
                      value="Next &rarr;"
                      onClick={handleSubmit}
                      className={
                        email ? "btn btn--submit" : "btn btn--disabled"
                      }
                      disabled={email ? false : true}
                    />
                  </div>
                </form>
              )}
            </ListColumn>
          </ListItem>
        ))}
      </ListContainer>
    </AnimatePresence>
  )
}

export default SchoolList
