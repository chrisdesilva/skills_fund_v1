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
      <AnimatePresence initial={false} exitBeforeEnter>
        {filteredSchools.map((school, i) => {
          return (
            <Card
              positionTransition
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.1, ease: "easeIn" }}
              whileHover={{ y: -5 }}
              className={cardIndex === i ? "flipped" : ""}
              key={school.id}
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
                    <div>
                      <CardColumn>
                        <p>School</p>
                      </CardColumn>
                      <CardColumn>
                        <p>{school.basicInfo.schoolname}</p>
                      </CardColumn>
                    </div>
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
                          <p>Cost of Living</p>
                          <FaQuestionCircle className="text-xs" />{" "}
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
                          .sort()
                          .slice(0, 2)
                          .map(location => (
                            <p>{location} </p>
                          ))}
                        {school.basicInfo.locations.length > 2 && (
                          <p
                            className="cursor-pointer"
                            onClick={() => setCardIndex(i)}
                          >
                            More...
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
                          .sort()
                          .slice(0, 2)
                          .map(program => (
                            <p>{program.name} </p>
                          ))}
                        {school.loanInfo.length > 2 && (
                          <p
                            className="cursor-pointer"
                            onClick={() => setCardIndex(i)}
                          >
                            More...
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
                        Apply For Funding
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
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  justify-content: center;
  padding: 2rem;
`

const spring = {
  type: "spring",
  damping: 10,
  stiffness: 200,
}

const CardSide = css`
  /* position: absolute; */
  width: 100%;
  min-width: 100%;
  /* height: 100%; */
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
  opacity: 0.6;
  z-index: 0;
  transition: opacity 800ms;

  :hover {
    opacity: 1;
  }
`

const CardBack = styled.div`
  ${CardSide}
  transform: rotateY(-180deg) translate(100%, 0);
  background: #ffebd9;
  z-index: 1;

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
  flex: 1;
  display: flex;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  &.flipped {
    transform: rotateY(180deg);
  }
`

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  transition: z-index, transform 800ms;
  transition-delay: 800ms, 0s;
  z-index: 0;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  transform-style: preserve-3d;

  &.flipped {
    transition-delay: 0s;
    z-index: 1;
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
  margin: auto;

  width: 150px;
  height: 92px;
`

const CardInfo = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;

  div:not(.tooltip--parent) {
    display: flex;
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0 0 0.25rem 0;
    font-size: 0.8rem;
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
    display: flex;
    width: 100%;
    p {
      margin-right: 0.25rem;
    }
  }

  .tooltip--tip {
    background-color: #e7e7e7;
    padding: 0.5rem;
    font-size: 0.75rem;
    position: absolute;
    width: 16rem;
    transition: opacity 300ms;
    opacity: 0;
    top: 12.5rem;
    font-weight: normal;
  }

  .tooltip--parent:hover .tooltip--tip {
    opacity: 1;
  }
`
