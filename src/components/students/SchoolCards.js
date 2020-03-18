import React, { useState } from "react"
import styled, { css } from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { FaQuestionCircle } from "react-icons/fa"

const SchoolCards = ({ filteredSchools, skfLogo }) => {
  const [cardIndex, setCardIndex] = useState([])
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <CardContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence initial={false} exitBeforeEnter>
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school, i) => {
              return (
                <Card
                  layoutTransition={spring}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ y: -5 }}
                  className={cardIndex.includes(i) ? "flipped" : ""}
                  key={school.basicInfo.schoolurl}
                >
                  <CardInner className={cardIndex.includes(i) ? "flipped" : ""}>
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
                      <CardInfo className="cardinfo">
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
                            <div id="tooltip--parent">
                              <p>
                                Tuition Range{" "}
                                <FaQuestionCircle className="text-xs" />
                              </p>
                              <div id="tooltip--tip">
                                <p>
                                  Range of tuition for programs financed by
                                  Skills Fund. You can borrow from $2,000 in
                                  tuition up to the max for your program.
                                </p>
                              </div>
                            </div>
                          </CardColumn>
                          <CardColumn>
                            <p>{school.basicInfo.tuitionRange}</p>
                          </CardColumn>
                        </div>
                        <div>
                          <CardColumn>
                            <div id="tooltip--parent">
                              <p>
                                Living Expenses{" "}
                                <FaQuestionCircle className="text-xs" />
                              </p>
                              <div id="tooltip--tip">
                                <p>
                                  Schools that offer living expenses financing
                                  allow you to borrow money for living expenses
                                  in addition to tuition.
                                </p>
                              </div>
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
                                className="cursor-pointer hoverUnderline"
                                onClick={() => setCardIndex([...cardIndex, i])}
                              >
                                More
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
                                className="cursor-pointer hoverUnderline"
                                onClick={() => setCardIndex([...cardIndex, i])}
                              >
                                More
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
                            Calculate Payments
                          </Link>
                        </div>
                      </CardInfo>
                    </CardFront>
                    <CardBack
                      onClick={() =>
                        setCardIndex(cardIndex.filter(index => index !== i))
                      }
                    >
                      <div className="card-back--info">
                        <CardColumn className="card-back--list ">
                          <h4>Locations</h4>{" "}
                          {school.basicInfo.locations.sort().map(location => (
                            <p>{location} </p>
                          ))}
                        </CardColumn>
                        <CardColumn className="card-back--list ">
                          <h4>Programs</h4>{" "}
                          {school.loanInfo.sort().map(program => (
                            <p>{program.name} </p>
                          ))}
                        </CardColumn>
                      </div>
                      <div className="card-back--image">
                        <Image fluid={school.logo.childImageSharp.fluid} />
                      </div>
                    </CardBack>
                  </CardInner>
                </Card>
              )
            })
          ) : (
            <Card
              layoutTransition={spring}
              // transition={{ duration: 0.3, type: "tween" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ y: -5 }}
              key={"noMatches"}
            >
              <CardInner>
                <CardFront className="noMatches">
                  <CardLogo className="noMatches">
                    {" "}
                    <Image
                      fluid={skfLogo}
                      alt="Skills Fund logo - no matching schools"
                    />
                  </CardLogo>
                  <CardInfo className="noMatches">No matching schools</CardInfo>
                </CardFront>
              </CardInner>
            </Card>
          )}
        </AnimatePresence>
      </CardContainer>
    </AnimatePresence>
  )
}

export default SchoolCards

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
}

const CardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  justify-content: center;
  padding: 2rem;
  background: white;
`

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
  z-index: 0;
  transition: border 800ms;
  border: 2px solid lightgray;
  background: white;

  :hover:not(.noMatches) {
    border: ${props => `2px solid ${props.theme.secondary}`};
  }

  .noMatches {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    .gatsby-image-wrapper {
      width: 100%;
    }
  }
`

const CardBack = styled.div`
  ${CardSide}
  transform: rotateY(-180deg) translate(100%, 0);
  background: #ffebd9;
  z-index: 1;
  cursor: pointer;

  p {
    font-size: 0.65rem;
    margin: 0 0 0.25rem 0;
  }

  h4 {
    font-size: 0.65rem;
    margin-bottom: 0.25rem;
  }

  .card-back--list {
    padding: 0.5rem;
  }

  .card-back--image {
    width: 25%;
    margin: 0 auto;

    .gatsby-image-wrapper {
      width: 100%;
      padding: 0;
    }
  }

  .hoverUnderline {
    text-align: center;
  }

  .card-back--info {
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

  a {
    text-decoration: none;
    color: black;
  }
`

const CardLogo = styled.div`
  margin: auto;
  background: white;
  width: 150px;
  height: 92px;
  transition: border 300ms;
  border-bottom: 2px solid transparent;

  :hover:not(.noMatches) {
    border-bottom: ${props => `2px solid ${props.theme.secondary}`};
  }
`

const CardInfo = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;

  div {
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
    font-weight: normal;
  }
`
