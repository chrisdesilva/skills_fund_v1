import React, { useState } from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import SEO from "../../components/layout/SEO"
import Layout from "../../components/layout/Layout"
import { FaCode, FaEnvelope, FaCaretDown } from "react-icons/fa"
import {
  ApplyContainer,
  ApplyCard,
  ApplySplit,
  ContentContainer,
  SelectContainer,
  ApplySubmit,
  ApplyPayments,
} from "./PartnerPage.styled"
import ApplicationCalculator from "../../components/apply/ApplicationCalculator"
import TextInput from "../../components/common/TextInput"
import SelectInput from "../../components/common/SelectInput"

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
              apr36 {
                Poor
                Fair
                Good
                Excellent
              }
              apr60 {
                Poor
                Fair
                Good
                Excellent
              }
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

  let programOptions = (
    <>
      <option value="default">---</option>
      {school["schoolInfo"]["loanInfo"] &&
        school["schoolInfo"]["loanInfo"].map(program => (
          <option key={program.segment} value={JSON.stringify(program)}>
            {program.name}
          </option>
        ))}
    </>
  )

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
            <button
              className="calculator text-xs textButton"
              onClick={() => setShowCalculator(true)}
            >
              Curious what you'll pay? Easily calculate your payments{" "}
              <FaCaretDown />
            </button>
          </ApplyPayments>
          <ApplicationCalculator
            school={school}
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
