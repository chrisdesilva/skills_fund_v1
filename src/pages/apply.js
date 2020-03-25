import React from "react"
import styled from "styled-components"
import {
  FaGraduationCap,
  FaCode,
  FaEnvelope,
  FaCaretDown,
  FaCheckCircle,
} from "react-icons/fa"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"
import ApplicationCalculator from "../components/apply/ApplicationCalculator"
import { useApplication } from "../hooks/useApplication"
import { breakpoint } from "../utils/breakpoints"

const Apply = () => {
  const [
    schoolName,
    setSchoolName,
    showCalculator,
    setShowCalculator,
    showCalculatorText,
    email,
    submitReady,
    showThankYou,
    selectSchool,
    selectProgram,
    handleEmail,
    handleSubmit,
    schoolList,
    school,
    loanUrl,
    program,
    showSliders,
    toggleSliders,
  ] = useApplication()

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  return (
    <Layout>
      <SEO title="Apply" />
      <ApplyContainer>
        <ApplyCard showCalculatorText={showCalculatorText}>
          <h1>Apply For Funding</h1>
          <SelectContainer>
            <div className="input">
              <FaGraduationCap />
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
                {schoolList.map(school => (
                  <option
                    key={school["node"]["basicInfo"]["schoolname"]}
                    value={school["node"]["slug"]}
                  >
                    {school["node"]["basicInfo"]["schoolname"]}
                  </option>
                ))}
              </select>
            </div>
            <div className="input">
              <FaCode />
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
                {school["loanInfo"] &&
                  school["loanInfo"].map(program => (
                    <option
                      key={program.segment}
                      value={JSON.stringify(program)}
                    >
                      {program.name}
                    </option>
                  ))}
              </select>
            </div>
            <form className="input">
              <FaEnvelope />
              <label htmlFor="email">Enter your email address</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
                onChange={handleEmail}
              />
            </form>
          </SelectContainer>
          <ApplySubmit thankYou={showThankYou}>
            <input
              type="submit"
              value="Next &rarr;"
              onClick={handleSubmit}
              className={
                email && loanUrl ? "btn btn--submit" : "btn btn--disabled"
              }
              disabled={email && loanUrl ? false : true}
            />
            <p>Your application has opened in a new window.</p>
          </ApplySubmit>
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
              <FaCheckCircle />
            </p>
            <p className="calculator uppercase text-xs">
              Curious what you'll pay?
            </p>
            <p className="calculator" onClick={() => setShowCalculator(true)}>
              Easily calculate your payments <FaCaretDown />
            </p>
          </ApplyPayments>
          <ApplicationCalculator
            school={school}
            setSchoolName={setSchoolName}
            showCalculator={showCalculator}
            schoolName={schoolName}
            program={program}
            showSliders={showSliders}
            toggleSliders={toggleSliders}
            email={email}
            handleEmail={handleEmail}
            handleSubmit={handleSubmit}
            loanUrl={loanUrl}
            showThankYou={showThankYou}
          />
        </ApplyCard>
      </ApplyContainer>
    </Layout>
  )
}

export default Apply

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
  margin: 0 5rem;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4,
    5px 5px #c4c4c4, 6px 6px #c4c4c4, 7px 7px #c4c4c4, 8px 8px #c4c4c4;

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

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  @media ${breakpoint.xl} {
    flex-direction: row;
    justify-content: space-around;
  }
  .input {
    width: 20rem;
    display: flex;
    flex-direction: column;

    select {
      margin: 0;
    }

    svg {
      font-size: 2rem;
      align-self: center;
      margin-top: 1rem;
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

  input {
    @media ${breakpoint.lg} {
      margin: 3rem 0 0 0;
    }
  }

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
