import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled, { css } from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const Apply = () => {
  const data = useStaticQuery(graphql`
    query {
      schools: allSchoolsJson {
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

  const handleSliderAmt = e => {
    setLoanValue(e.target.value)
  }

  const [loanInformation, setLoanInformation] = useState("")
  const [programIndex, setProgramIndex] = useState(0)
  const [loanValue, setLoanValue] = useState(
    schoolList[programIndex]["node"]["loanInfo"][0]["defaultAmount"]
  )

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // even dollar amounts without cents
  })

  useEffect(() => {
    // reset the program index any time the user changes schools in the loan app section
    setProgramIndex(0)
    setLoanInformation(
      schoolList[schoolIndex]["node"]["loanInfo"][programIndex]
    )
    setSchoolName(schoolList[schoolIndex]["node"]["basicInfo"]["schoolname"])
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

      <CalculatorContainer showProgram={showProgram}>
        <CalculatorCard showProgram={showProgram}>
          <h2>
            Loan Calculator{showProgram && <span> for {schoolName}</span>}
          </h2>
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
          {loanInformation && (
            <div className="loanCalculator__slider">
              <input
                className="loanCalculator__input"
                onChange={handleSliderAmt}
                // onTouchEnd={calculateMonthlyPayment}
                // onMouseUp={calculateMonthlyPayment}
                type="range"
                min="2000"
                step="5"
                max={loanInformation.aprAndType[0].maxTuition}
                value={loanValue}
              />
              <div className="loanCalculator__labels">
                <p>$2,000</p>
                <p>
                  Loan Amount
                  <br />
                  <span className="loanCalculator__amount">
                    {formatter.format(loanValue)}
                  </span>
                </p>
                <p>
                  {formatter.format(loanInformation.aprAndType[0].maxTuition)}
                </p>
              </div>
            </div>
          )}
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
  z-index: 10;

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
  padding: ${({ showProgram }) => (showProgram ? "2rem 0" : "0")};
  overflow: hidden;
  transition: height 500ms, padding 500ms;
  height: ${({ showProgram }) => (showProgram ? "292" : "0")};
  select {
    width: 20rem;
  }
`

export const CalculatorCard = styled.div`
	transition: opacity 500ms, transform 500ms, height 500ms;
  height: ${({ showProgram }) => (showProgram ? "292" : "0")};
	opacity: ${({ showProgram }) => (showProgram ? "1" : "0")};
  transform: ${({ showProgram }) =>
    showProgram ? "translateY(0)" : "translateY(-5%)"};
	z-index: -10:
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
