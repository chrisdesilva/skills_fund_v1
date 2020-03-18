import React, { useState } from "react"
import { Link } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"
import Image from "gatsby-image"
import styled from "styled-components"
import { FaQuestionCircle } from "react-icons/fa"

const SchoolList = ({ filteredSchools }) => {
  const [listIndex, setListIndex] = useState("")
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
                  href={school.basicInfo.schoolurl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Image
                    key={school.logo.childImageSharp.fluid}
                    fluid={school.logo.childImageSharp.fluid}
                    alt={school.basicInfo.schoolname}
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
              <h3>Locations</h3>
              <h4>{school.basicInfo.schoolname}</h4>
              {school.basicInfo.locations
                .sort()
                .slice(
                  0,
                  listIndex === i ? school.basicInfo.locations.length : 2
                )
                .map(location => (
                  <p>{location} </p>
                ))}
              {school.basicInfo.locations.length > 2 && (
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
              <p>{school.basicInfo.tuitionRange}</p>
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
                {school.features.costOfLiving ? "Available" : "Not Available"}
              </p>
            </ListColumn>
            <ListColumn>
              <h3>Programs</h3>
              {school.loanInfo
                .sort()
                .slice(
                  0,
                  listIndex === i ? school.basicInfo.locations.length : 2
                )
                .map(program => (
                  <p>{program.name} </p>
                ))}
              {school.loanInfo.length > 2 && (
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
              <a
                className="btn"
                href={school.basicInfo.schoolcode}
                target="_blank"
                rel="noreferrer noopener"
              >
                Apply For Funding
              </a>
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
  box-shadow: 2px 2px 5px lightgray;
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
