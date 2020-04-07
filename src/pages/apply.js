import React, { useState } from "react"
import {
  FaGraduationCap,
  FaCode,
  FaEnvelope,
  FaCaretDown,
} from "react-icons/fa"
import {
  ApplyContainer,
  ApplyCard,
  SelectContainer,
  ApplySubmit,
  ApplyPayments,
} from "../components/apply/Apply.styled"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"
import ApplicationCalculator from "../components/apply/ApplicationCalculator"
import { useApplication } from "../hooks/useApplication"
import TextInput from "../components/common/TextInput"
import SelectInput from "../components/common/SelectInput"

const Apply = () => {
  const [
    schoolName,
    setSchoolName,
    showCalculator,
    setShowCalculator,
    showCalculatorText,
    submitReady,
    showThankYou,
    selectSchool,
    selectProgram,
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

  const [formState, setFormState] = useState({
    email: "",
    email2: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  let schoolOptions = (
    <>
      {" "}
      <option value="default">---</option>
      {schoolList.map(school => (
        <option
          key={school["node"]["schoolInfo"]["basicInfo"]["schoolname"]}
          value={school["node"]["slug"]}
        >
          {school["node"]["schoolInfo"]["basicInfo"]["schoolname"]}
        </option>
      ))}
    </>
  )

  let programOptions = (
    <>
      {" "}
      <option value="default">---</option>
      {school
        ? school["schoolInfo"]["loanInfo"].map(program => (
            <option key={program.segment} value={JSON.stringify(program)}>
              {program.name}
            </option>
          ))
        : null}
    </>
  )

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
              <SelectInput
                id="school"
                defaultValue={"default"}
                onChange={selectSchool}
                onBlur={selectSchool}
                options={schoolOptions}
              />
            </div>
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
                name="email"
                placeholder="Enter your email address"
                onChange={handleChange}
                value={formState.email}
              />
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
            </form>
          </SelectContainer>
          <ApplySubmit thankYou={showThankYou}>
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
            setSchoolName={setSchoolName}
            showCalculator={showCalculator}
            schoolName={schoolName}
            program={program}
            showSliders={showSliders}
            toggleSliders={toggleSliders}
            email={formState.email}
            email2={formState.email2}
            handleSubmit={handleSubmit}
            loanUrl={loanUrl}
            showThankYou={showThankYou}
            handleChange={handleChange}
          />
        </ApplyCard>
      </ApplyContainer>
    </Layout>
  )
}

export default Apply
