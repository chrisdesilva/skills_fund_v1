import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { FaQuestionCircle } from "react-icons/fa"
import { useApplication } from "../../hooks/useApplication"
import {
  CardContainer,
  Card,
  spring,
  CardBack,
  CardFront,
  CardInner,
  CardColumn,
  CardLogo,
  CardInfo,
} from "./SchoolCards.styled"

const SchoolCards = ({ filteredSchools, skfLogo }) => {
  const [email, handleEmail] = useApplication()
  const [cardIndex, setCardIndex] = useState([])
  const [applyForm, setApplyForm] = useState([])
  const [loanUrl, setLoanUrl] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    window.open(loanUrl)
  }

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
                  key={school.schoolInfo.basicInfo.schoolurl}
                >
                  <CardInner className={cardIndex.includes(i) ? "flipped" : ""}>
                    <CardFront email={email}>
                      <CardLogo>
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
                      </CardLogo>
                      <CardInfo className="cardinfo">
                        <div>
                          <CardColumn>
                            <p>School</p>
                          </CardColumn>
                          <CardColumn>
                            <p>{school.schoolInfo.basicInfo.schoolname}</p>
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
                            <p>{school.schoolInfo.basicInfo.tuitionRange}</p>
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
                              {school.schoolInfo.features.costOfLiving
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
                            {school.schoolInfo.basicInfo.locations
                              .sort()
                              .slice(0, 2)
                              .map(location => (
                                <p>{location} </p>
                              ))}
                            {school.schoolInfo.basicInfo.locations.length >
                              2 && (
                              <button
                                className="cursor-pointer hoverUnderline p-0 border-none"
                                onClick={() => setCardIndex([...cardIndex, i])}
                              >
                                More
                              </button>
                            )}
                          </CardColumn>
                        </div>
                        <div>
                          <CardColumn>
                            <p>Programs</p>
                          </CardColumn>
                          <CardColumn>
                            {school.schoolInfo.loanInfo
                              .sort()
                              .slice(0, 2)
                              .map(program => (
                                <p>{program.name} </p>
                              ))}
                            {school.schoolInfo.loanInfo.length > 2 && (
                              <button
                                className="cursor-pointer hoverUnderline p-0 border-none"
                                onClick={() => setCardIndex([...cardIndex, i])}
                              >
                                More
                              </button>
                            )}
                          </CardColumn>
                        </div>
                        <div className="click">
                          {!applyForm.includes(i) && (
                            <button
                              className="btn"
                              onClick={() => {
                                setApplyForm([i])
                                setLoanUrl(
                                  school.schoolInfo.basicInfo.schoolcode
                                )
                              }}
                            >
                              Apply For Funding
                            </button>
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
                                    email
                                      ? "btn btn--submit"
                                      : "btn btn--disabled"
                                  }
                                  disabled={email ? false : true}
                                />
                              </div>
                            </form>
                          )}
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
                      <button
                        className="absolute w-full border-none bg-transparent"
                        onClick={() =>
                          setCardIndex(cardIndex.filter(index => index !== i))
                        }
                      ></button>
                      <div className="card-back--info">
                        <CardColumn className="card-back--list ">
                          <h4>Locations</h4>{" "}
                          {school.schoolInfo.basicInfo.locations
                            .sort()
                            .map(location => (
                              <p>{location} </p>
                            ))}
                        </CardColumn>
                        <CardColumn className="card-back--list ">
                          <h4>Programs</h4>{" "}
                          {school.schoolInfo.loanInfo.sort().map(program => (
                            <p>{program.name} </p>
                          ))}
                        </CardColumn>
                      </div>
                      <div className="card-back--image">
                        <Image fluid={school.logo.fluid} />
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
