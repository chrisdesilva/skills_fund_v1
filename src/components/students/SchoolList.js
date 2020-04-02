import React, { useState } from "react"
import { Link } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"
import Image from "gatsby-image"
import styled from "styled-components"
import { FaQuestionCircle } from "react-icons/fa"
import { useApplication } from "../../hooks/useApplication"

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
                <p
                  className="cursor-pointer font-bold"
                  onClick={() =>
                    listIndex === i ? setListIndex("") : setListIndex(i)
                  }
                >
                  {listIndex === i ? "Show Less" : "Show More"}
                </p>
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
                <p
                  className="cursor-pointer font-bold"
                  onClick={() =>
                    listIndex === i ? setListIndex("") : setListIndex(i)
                  }
                >
                  {listIndex === i ? "Show Less" : "Show More"}
                </p>
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

const ListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem 0;
  background: white;
`

const ListItem = styled.div`
  padding: 1rem 0;
  border-top: 1px solid lightgray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  display: flex;
  background: white;
  margin: 0.25rem 1rem;

  :last-of-type {
    border-bottom: 1px solid lightgray;
  }

  .btn {
    width: 15rem;
    text-align: center;
    margin: 1rem;
    align-self: center;
    background: black;
    color: white;

    :hover {
      color: black;
      background: white;
      border: 2px solid black;
    }
  }

  a {
    text-align: center;
    text-decoration: none;
    color: black;
  }

  p {
    font-size: 0.8rem;
    margin: 0 0 0.25rem 0;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: normal;
  }

  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
`

const ListColumn = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;

  :first-of-type {
    display: block;

    div {
      :last-of-type {
        display: flex;
        flex-direction: column;
      }
    }
  }

  :last-of-type {
    justify-content: center;
  }

  img {
    filter: grayscale(100%);
  }

  form {
    margin-bottom: 1rem;
    text-align: center;
    background: white;
    padding-right: 1rem;

    label {
      font-weight: normal;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn {
      width: 6rem;
      margin: 0;
    }
  }

  .logo {
    width: 150px;
    margin: auto;
  }

  .hoverUnderline {
    :after {
      width: 30%;
      transition: width 300ms;
    }

    :hover:after {
      width: 35%;
    }
  }
`
