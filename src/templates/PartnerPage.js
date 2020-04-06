import React, { useState } from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import SEO from "../components/layout/SEO"
import Layout from "../components/layout/Layout"
import { FaCode, FaEnvelope, FaCaretDown, FaCheckCircle } from "react-icons/fa"
import { breakpoint } from "../utils/breakpoints"
import ApplicationCalculator from "../components/apply/ApplicationCalculator"
import TextInput from "../components/common/TextInput"
import SelectInput from "../components/common/SelectInput"

export const query = graphql`
  query($slug: String!) {
    school: contentfulSchool(slug: { eq: $slug }) {
      logo {
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      slug
      schoolInfo {
        basicInfo {
          schoolname
          locations
          schoolurl
          schoolcode
          APRRange36
          APRRange60
          tuitionRange
          programTypes
          hubspotFormID
          interestRate36
          interestRate60
          selectAProgram
          applicationsLive
          nextCohortStartDate
          disabledLoanAppFormID
        }
        paymentTable {
          data {
            col
            max
            program
            tuition
          }
          show
          headers
        }
        features {
          products
          costOfLiving
          multiPrograms
          multiLoanLengths
        }
        loanInfo {
          name
          hubspotValue
          defaultAmount
          metros {
            location
            max
          }
          segment
          aprAndType {
            info {
              type
              apr36
              apr60
              maxTuition
              maxCOL
            }
          }
          multiMetros
          loanLengths
          nonPaymentPeriod
          queryParams
        }
      }
    }
  }
`

const PartnerPage = ({ data }) => {
  const school = data.school
  const [program, setProgram] = useState("")
  const [loanUrl, setLoanUrl] = useState("")
  const [submitReady, setSubmitReady] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [showCalculatorText, setShowCalculatorText] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [showSliders, toggleSliders] = useState(false)
  const [formState, setFormState] = useState({
    email: "",
    email2: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  const selectProgram = e => {
    const parsedObj = JSON.parse(e.target.value)
    setLoanUrl(parsedObj["segment"])
    const selectedProgram = school.schoolInfo.loanInfo.filter(
      program => program.name === parsedObj["name"]
    )
    setProgram(selectedProgram[0])
    toggleSliders(true)
    setShowCalculatorText(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setFormState({})
    setShowThankYou(true)
    window.open(loanUrl)
  }

  let programOptions =
    school["schoolInfo"]["loanInfo"] &&
    school["schoolInfo"]["loanInfo"].map(program => (
      <option key={program.segment} value={JSON.stringify(program)}>
        {program.name}
      </option>
    ))

  return (
    <Layout>
      <SEO title={school.schoolInfo.basicInfo.schoolname} />
      <ApplyContainer>
        <ApplyCard showCalculatorText={showCalculatorText}>
          <h1>Apply For Funding - {school.schoolInfo.basicInfo.schoolname}</h1>
          <ApplySplit>
            <ContentContainer>
              <div className="content--logo">
                <Image
                  fluid={school.logo.fluid}
                  src={`${school.schoolInfo.basicInfo.schoolname} logo`}
                />
              </div>
              <div className="content--content">
                {school.schoolInfo.basicInfo.schoolname} partners with Skills
                Fund to offer tuition and cost of living financing so more
                students like you can access their program.
              </div>
            </ContentContainer>
            <SelectContainer>
              <div className="input">
                <FaCode />
                <label htmlFor="program">Select your program</label>
                <SelectInput
                  id="program"
                  defaultValue={"default"}
                  onChange={selectProgram}
                  onBlur={selectProgram}
                  options={programOptions}
                />
              </div>
              <form className="input">
                <FaEnvelope />
                <label htmlFor="email">Enter your email address</label>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  required="required"
                  value={formState.email}
                  onChange={handleChange}
                />
              </form>
              <ApplySubmit thankYou={showThankYou}>
                <TextInput
                  type="submit"
                  value="Next &rarr;"
                  onClick={handleSubmit}
                  className={
                    (formState.email || formState.email2) && loanUrl
                      ? "btn btn--submit"
                      : "btn btn--disabled"
                  }
                  disabled={
                    (formState.email || formState.email2) && loanUrl
                      ? false
                      : true
                  }
                />
                <p>Your application has opened in a new window.</p>
              </ApplySubmit>
            </SelectContainer>
          </ApplySplit>
          <ApplyPayments>
            <p className="financingAvailable">
              Great! You can borrow up to&nbsp;
              {program &&
                formatter.format(
                  program["aprAndType"][0]["info"]["maxTuition"]
                )}
              &nbsp;for tuition
              {program && program["aprAndType"][0]["info"]["maxCOL"] > 0 && (
                <>
                  &nbsp;and up to&nbsp;
                  {program &&
                    formatter.format(
                      program["aprAndType"][0]["info"]["maxCOL"]
                    )}
                  &nbsp;for living expenses
                </>
              )}
              !
            </p>
            <p
              className="calculator text-xs"
              onClick={() => setShowCalculator(true)}
            >
              Curious what you'll pay? Easily calculate your payments{" "}
              <FaCaretDown />
            </p>
          </ApplyPayments>
          <ApplicationCalculator
            school={school}
            // setSchoolName={setSchoolName}
            showCalculator={showCalculator}
            schoolName={school.schoolInfo.basicInfo.schoolname}
            program={program}
            showSliders={showSliders}
            toggleSliders={toggleSliders}
            email={formState.email}
            email2={formState.email2}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loanUrl={loanUrl}
            showThankYou={showThankYou}
          />
        </ApplyCard>
      </ApplyContainer>
    </Layout>
  )
}

export default PartnerPage

const ApplyContainer = styled.section`
  display: flex;
  justify-content: center;
  background: #f7f7f7;
  min-height: 30vh;
  margin: 2rem 0 4rem 0;
`

const ApplyCard = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  padding-top: 2rem;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;

  @media ${breakpoint.lg} {
    margin: 0 5rem;
  }

  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .financingAvailable {
    transition: opacity 300ms;
    opacity: ${({ showCalculatorText }) => (showCalculatorText ? "1" : "0")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 0.25rem;
    text-align: center;

    @media ${breakpoint.lg} {
      flex-direction: row;
    }

    svg {
      transition: opacity 300ms, transform 500ms;
      transition-delay: 1000ms;
      opacity: ${({ showCalculatorText }) => (showCalculatorText ? "1" : "0")};
      transform: ${({ showCalculatorText }) =>
        showCalculatorText ? "scale(1.25)" : "scale(0)"};
      color: green;
      margin-top: 0.5rem;

      @media ${breakpoint.lg} {
        margin-left: 0.5rem;
        margin-top: 0;
      }
    }
  }

  .calculator {
    transition: opacity 300ms;
    transition-delay: 2000ms;
    opacity: ${({ showCalculatorText }) => (showCalculatorText ? "1" : "0")};
    text-align: center;
    margin: 0.25rem 0;

    :last-of-type {
      margin-bottom: 2rem;
    }

    :not(.uppercase) {
      position: relative;
      cursor: pointer;

      :after {
        position: absolute;
        bottom: -25%;
        left: 0;
        right: 0;
        margin: auto;
        width: 90%;
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
  }
`

const ApplySplit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem 0;

  @media ${breakpoint.lg} {
    flex-direction: row;
  }
`

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;

  @media ${breakpoint.lg} {
    width: 50%;
    padding: 0 2rem;
  }

  .content--logo {
    width: 33%;
    margin: 0 auto;
  }

  .content--content {
    margin: 0 auto;
  }
`

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${breakpoint.lg} {
    width: 50%;
  }

  .input {
    width: 20rem;
    display: flex;
    flex-direction: column;

    select {
      margin: 0;
    }

    svg {
      font-size: 1.5rem;
      align-self: center;
      margin: 1rem 0;
    }
  }
  form {
    div {
      display: flex;
      flex-direction: row;
    }
  }
`

const ApplySubmit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  margin: 2rem 0;

  p {
    display: ${({ thankYou }) => (thankYou ? "block" : "none")};
  }
`

const ApplyPayments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
