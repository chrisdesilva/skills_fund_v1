import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ApplicationCalculator from "../components/ApplicationCalculator"

const Apply = () => {
  const data = useStaticQuery(graphql`
    query {
      schools: allSchoolsJson(sort: { fields: slug, order: ASC }) {
        edges {
          node {
            slug
            basicInfo {
              locations
              schoolurl
              APRRange36
              APRRange60
              schoolname
              programTypes
              hubspotFormID
              interestRate36
              interestRate60
              selectAProgram
              applicationsLive
              nextCohortStartDate
              disabledLoanAppFormID
            }
            features {
              products
              costOfLiving
              multiPrograms
              multiLoanLengths
            }
            loanInfo {
              name
              defaultAmount
              hubspotValue
              metros {
                maxCOL
                location
                maxTuition
              }
              segment
              aprAndType {
                type
                apr36
                apr60
                maxCOL
                maxTuition
              }
              multiMetros
              nonPaymentPeriod
            }
          }
        }
      }
    }
  `)

  const schoolList = data.schools.edges
  const [schoolIndex, setSchoolIndex] = useState(0)
  const [programIndex, setProgramIndex] = useState(0)
  const [schoolName, setSchoolName] = useState("")
  const [showProgram, setShowProgram] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [loanUrl, setLoanUrl] = useState(false)
  const [email, setEmail] = useState("")
  const [submitReady, setSubmitReady] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const selectSchool = e => {
    setShowProgram(true)
    setSchoolIndex(e.target.value)
    setProgramIndex(0)
  }

  const selectProgram = e => {
    setShowForm(true)
    setLoanUrl(e.target.value)
  }

  const handleEmail = e => {
    setEmail(e.target.value)
    setSubmitReady(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setEmail("")
    setShowThankYou(true)
    window.open(loanUrl)
  }

  return (
    <Layout>
      <SEO title="Apply" />
      <ApplyContainer>
        <ApplyCard>
          <h1>Loan Application</h1>
          <label htmlFor="school">Select your school</label>
          <select
            id="school"
            defaultValue={"default"}
            onChange={selectSchool}
            onBlur={selectSchool}
          >
            <option disabled value="default">
              ---
            </option>
            {schoolList.map((school, i) => (
              <option key={school["node"]["basicInfo"]["schoolname"]} value={i}>
                {school["node"]["basicInfo"]["schoolname"]}
              </option>
            ))}
          </select>
          <SelectContainer showProgram={showProgram}>
            <label htmlFor="program">Select your program</label>
            <select
              id="program"
              defaultValue={"default"}
              onChange={selectProgram}
              onBlur={selectProgram}
            >
              <option disabled value="default">
                ---
              </option>
              {schoolList[schoolIndex]["node"]["loanInfo"].map(program => (
                <option key={program.segment} value={program.segment}>
                  {program.name}
                </option>
              ))}
            </select>
          </SelectContainer>
          <Form ready={submitReady} showForm={showForm} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              onChange={handleEmail}
            />
            <input
              type="submit"
              value="Next &rarr;"
              className={
                email && loanUrl ? "btn btn--submit" : "btn btn--disabled"
              }
              disabled={email && loanUrl ? false : true}
            />
          </Form>
          <ThankYou thankYou={showThankYou}>
            Thanks for applying! Your application has opened in a new window.
          </ThankYou>
        </ApplyCard>
      </ApplyContainer>
      <ApplicationCalculator
        schoolList={schoolList}
        schoolIndex={schoolIndex}
        setSchoolName={setSchoolName}
        showProgram={showProgram}
        schoolName={schoolName}
        programIndex={programIndex}
        setProgramIndex={setProgramIndex}
      />
    </Layout>
  )
}

export default Apply

const ApplyContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primaryDark};
  padding: 2rem 0;
`

const ApplyCard = styled.div`
  max-width: 20rem;
  padding: 2rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: white;

  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }
`

const SelectContainer = styled.div`
  opacity: 0;
  transition: opacity 300ms;
  opacity: ${({ showProgram }) => (showProgram ? "1" : "0")};
`

const Form = styled.form`
  display: flex;
  margin-top: 1rem;
  transition: opacity 300ms;
  opacity: ${({ showForm }) => (showForm ? "1" : "0")};
  z-index: 10;

  input[type="submit"] {
    width: 33%;
  }
`

const ThankYou = styled.p`
  transition: opacity 300ms;
  opacity: ${({ thankYou }) => (thankYou ? "1" : "0")};
`
