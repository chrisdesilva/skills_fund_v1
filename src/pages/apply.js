import React from "react"
import styled from "styled-components"
import { FaGraduationCap, FaCode, FaEnvelope } from "react-icons/fa"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"
import ApplicationCalculator from "../components/apply/ApplicationCalculator"
import { useApplication } from "../hooks/useApplication"

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
  ] = useApplication()

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
                    <option key={program.segment} value={program.segment}>
                      {program.name}
                    </option>
                  ))}
              </select>
            </div>
            <form onSubmit={handleSubmit} className="input">
              <FaEnvelope />
              <label htmlFor="email">Enter your email address</label>
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
                  className={
                    email && loanUrl ? "btn btn--submit" : "btn btn--disabled"
                  }
                  disabled={email && loanUrl ? false : true}
                />
              </div>
            </form>
          </SelectContainer>
          <ThankYou thankYou={showThankYou}>
            Thanks for applying! Your application has opened in a new window.
          </ThankYou>
          <p className="calculator uppercase text-xs">
            Curious what you'll pay?
          </p>
          <p className="calculator" onClick={() => setShowCalculator(true)}>
            Easily calculate your payments.
          </p>
          <ApplicationCalculator
            school={school}
            setSchoolName={setSchoolName}
            showCalculator={showCalculator}
            schoolName={schoolName}
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
  align-items: center;
  background: #f7f7f7;
  padding: 4rem 0 6rem 0;
`

const ApplyCard = styled.div`
  padding: 2rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 2px 2px 10px lightgray;
  width: 100%;
  margin: 0 5rem;

  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .calculator {
    transition: opacity 300ms;
    opacity: ${({ showCalculatorText }) => (showCalculatorText ? "1" : "0")};
    text-align: center;
    margin: 0.25rem 0;

    :not(.uppercase) {
      position: relative;
      cursor: pointer;

      :after {
        position: absolute;
        bottom: -25%;
        left: 0;
        right: 0;
        margin: auto;
        width: 12%;
        content: ".";
        color: transparent;
        background: black;
        height: 1px;
        transition: width 300ms;
      }
      :hover:after {
        width: 13%;
      }
    }
  }
`

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ThankYou = styled.p`
  transition: opacity 300ms;
  opacity: ${({ thankYou }) => (thankYou ? "1" : "0")};
`
