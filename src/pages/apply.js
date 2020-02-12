import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled, { css } from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const Apply = () => {
  const data = useStaticQuery(graphql`
    query {
      schools: allContentfulSchool {
        edges {
          node {
            slug
            schoolLogo {
              sizes(maxWidth: 1280) {
                ...GatsbyContentfulSizes
              }
            }
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
  const [showProgram, setShowProgram] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [loanUrl, setLoanUrl] = useState(false)
  const [email, setEmail] = useState("")
  const [submitReady, setSubmitReady] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  // loan calc start
  const [loanInformation, setLoanInformation] = useState("")
  const [programIndex, setProgramIndex] = useState(0)

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // even dollar amounts without cents
  })

  const selectSchool = e => {
    setShowProgram(true)
    setSchoolIndex(e.target.value)
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

  // loan calc start

  const selectProgramLoan = e => {
    setProgramIndex(e.target.value)
  }

  useEffect(() => {
    // reset the program index any time the user changes schools in the loan app section
    setProgramIndex(0)
    setLoanInformation(
      schoolList[schoolIndex]["node"]["loanInfo"][programIndex]
    )
    return () => setLoanInformation("")
  }, [schoolIndex])

  useEffect(() => {
    // update the loan information any time a user changes programs
    setLoanInformation(
      schoolList[schoolIndex]["node"]["loanInfo"][programIndex]
    )
    return () => setLoanInformation("")
  }, [programIndex])

  return (
    <Layout>
      <SEO title="Apply" />
      <ApplyContainer>
        <ApplyCard>
          <h1>Loan Application</h1>
          <label htmlFor="school">Select your school</label>
          <select id="school" defaultValue={"default"} onChange={selectSchool}>
            <option disabled value="default">
              ---
            </option>
            {schoolList.map((school, i) => (
              <option key={school.node.basicInfo.schoolname} value={i}>
                {school.node.basicInfo.schoolname}
              </option>
            ))}
          </select>
          <SelectContainer showProgram={showProgram}>
            <label htmlFor="program">Select your program</label>
            <select
              id="program"
              defaultValue={"default"}
              onChange={selectProgram}
            >
              <option disabled value="default">
                ---
              </option>
              {schoolList[schoolIndex].node.loanInfo.map(program => (
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

      <CalculatorContainer>
        <CalculatorCard showProgram={showProgram}>
          <h2>Loan Calculator</h2>
          <SelectContainer showProgram={showProgram}>
            <label htmlFor="program">Select your program</label>
            <select
              id="program"
              defaultValue={"default"}
              onChange={selectProgramLoan}
            >
              <option disabled value="default">
                ---
              </option>
              {schoolList[schoolIndex].node.loanInfo.map((program, i) => (
                <option key={program.segment} value={i}>
                  {program.name}
                </option>
              ))}
            </select>
          </SelectContainer>
          <p>
            Max tuition:{" "}
            {formatter.format(loanInformation.aprAndType[0].maxTuition)}
          </p>
        </CalculatorCard>
      </CalculatorContainer>
    </Layout>
  )
}

export default Apply

export const ApplyContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primaryDark};
  padding: 2rem 0;
`

export const ApplyCard = styled.div`
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

export const SelectContainer = styled.div`
  opacity: 0;
  transition: opacity 300ms;
  opacity: ${({ showProgram }) => (showProgram ? "1" : "0")};
`

export const Form = styled.form`
  display: flex;
  margin-top: 1rem;
  transition: opacity 300ms;
  opacity: ${({ showForm }) => (showForm ? "1" : "0")};

  input[type="submit"] {
    width: 33%;
  }
`

export const ThankYou = styled.p`
  transition: opacity 300ms;
  opacity: ${({ thankYou }) => (thankYou ? "1" : "0")};
`

export const CalculatorContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 2rem 0;

  select {
    width: 20rem;
  }
`

export const CalculatorCard = styled.div`
  transition: opacity 300ms;
  opacity: ${({ showProgram }) => (showProgram ? "1" : ".3")};
  width: 40rem;
  padding: 2rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
`
