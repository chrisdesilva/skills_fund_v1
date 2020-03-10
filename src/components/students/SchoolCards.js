import React, { useState } from "react"
import styled, { css } from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { FaQuestionCircle } from "react-icons/fa"
import { breakpoint } from "../../utils/breakpoints"

const SchoolCards = ({ filteredSchools }) => {
  const [cardIndex, setCardIndex] = useState("")
  return (
    <CardContainer>
      <AnimatePresence>
        {filteredSchools.map((school, i) => {
          return (
            <Card
              positionTransition={spring}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              whileHover={{ y: -5 }}
            >
              <CardInner className={cardIndex === i ? "flipped" : ""}>
                <CardFront>
                  <CardLogo>
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
                  </CardLogo>
                  <CardInfo>
                    <p className="schoolname">{school.basicInfo.schoolname}</p>
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
                        <div className="tooltip--parent">
                          <p className="flex items-center">
                            Cost of Living Financing{" "}
                            <FaQuestionCircle className="ml-1 text-xs tooltip--icon" />
                          </p>
                          <span className="tooltip--tip">
                            Schools that offer cost of living financing allow
                            students to borrow money for living expenses in
                            addition to the program's tuition.
                          </span>
                        </div>
                      </CardColumn>
                      <CardColumn>
                        <p>
                          {school.features.costOfLiving
                            ? "Available"
                            : "Not Available"}
                        </p>
                      </CardColumn>
                    </div>
                    <div>
                      <CardColumn>
                        <p>Locations</p>
                      </CardColumn>
                      <CardColumn>
                        {school.basicInfo.locations
                          .slice(0, 2)
                          .sort()
                          .map(location => (
                            <p>{location} </p>
                          ))}
                        {school.basicInfo.locations.length > 2 && (
                          <p
                            className="cursor-pointer text-purple"
                            onClick={() => setCardIndex(i)}
                          >
                            See More
                          </p>
                        )}
                      </CardColumn>
                    </div>
                    <div>
                      <CardColumn>
                        <p>Programs</p>
                      </CardColumn>
                      <CardColumn>
                        {school.loanInfo
                          .slice(0, 2)
                          .sort()
                          .map(program => (
                            <p>{program.name} </p>
                          ))}
                        {school.loanInfo.length > 2 && (
                          <p
                            className="cursor-pointer text-purple"
                            onClick={() => setCardIndex(i)}
                          >
                            See More
                          </p>
                        )}
                      </CardColumn>
                    </div>
                    <div className="click">
                      <a
                        className="btn"
                        href={school.basicInfo.schoolcode}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Apply For Financing
                      </a>
                      <Link
                        className="hoverUnderline"
                        to={`students/${school.slug}`}
                      >
                        Learn More
                      </Link>
                    </div>
                  </CardInfo>
                </CardFront>
                <CardBack>
                  <div className="card-back-info">
                    <CardColumn>
                      <p className="font-bold">Locations</p>{" "}
                      {school.basicInfo.locations.sort().map(location => (
                        <p>{location} </p>
                      ))}
                    </CardColumn>
                    <CardColumn>
                      <p className="font-bold">Programs</p>{" "}
                      {school.loanInfo.sort().map(program => (
                        <p>{program.name} </p>
                      ))}
                    </CardColumn>
                  </div>
                  <div className="click">
                    <p
                      onClick={() => setCardIndex("")}
                      className="hoverUnderline"
                    >
                      Front
                    </p>
                  </div>
                </CardBack>
              </CardInner>
            </Card>
          )
        })}
      </AnimatePresence>
    </CardContainer>
  )
}

export default SchoolCards

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
`

const spring = {
  type: "spring",
  damping: 30,
  stiffness: 250,
}

const CardSide = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 2px solid gray;
  border-radius: 5px;
  box-shadow: 2px 2px 10px lightgray;

  .click {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
  }
`

const CardFront = styled.div`
  ${CardSide}
  font-weight: bold;
`

const CardBack = styled.div`
  ${CardSide}
  transform: rotateY(-180deg);
  background: #ffebd9;

  div {
    padding: 0.5rem;
  }

  p {
    font-size: 0.65rem;
    margin: 0 0 0.25rem 0;
  }

  .hoverUnderline {
    text-align: center;
  }

  .card-back-info {
    display: flex;
    justify-content: space-evenly;
  }
`

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  &.flipped {
    transform: rotateY(180deg);
  }
`

const Card = styled(motion.div)`
  margin: 1rem;
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 30rem;
  perspective: 1000px;
  background: transparent;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  @media ${breakpoint.md} {
    width: calc(50% - 2rem);
    max-width: calc(50% - 2rem);
  }

  @media ${breakpoint.lg} {
    width: calc(33% - 2rem);
    max-width: calc(33% - 2rem);
  }

  @media ${breakpoint.xl} {
    width: calc(25% - 2rem);
    max-width: calc(25% - 2rem);
  }

  .btn {
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
  a {
    text-decoration: none;
    color: black;
  }
`

const CardLogo = styled.div`
  display: flex;
  justify-content: center;

  a {
    height: 92px;
    width: 150px;
  }
`

const CardInfo = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  border-top: 2px solid lightgray;

  div:not(.tooltip--parent) {
    display: flex;
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0 0 0.25rem 0;
    font-size: 0.8rem;
  }

  .schoolname {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .click {
    margin-top: auto;
  }
`

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;

  p {
    text-align: left;
  }

  .tooltip--parent {
    position: relative;
  }

  .tooltip--tip {
    background-color: #e7e7e7;
    padding: 0.5rem;
    font-size: 0.75rem;
    position: absolute;
    width: 9rem;
    transition: opacity 300ms;
    opacity: 0;
    top: 1rem;
    font-weight: normal;
  }

  .tooltip--parent:hover .tooltip--tip {
    opacity: 1;
  }
`
