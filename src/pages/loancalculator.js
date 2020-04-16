import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FaGraduationCap, FaCode, FaEnvelope } from "react-icons/fa"
import {
  calculateInterestPayment,
  calculateMonthlyPayment,
  calculateTotalPayment,
} from "../utils/calculator"
import { useApplication } from "../hooks/useApplication"
import { breakpoint } from "../utils/breakpoints"
import TextInput from "../components/common/TextInput"
import SelectInput from "../components/common/SelectInput"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"
import PaymentCard from "../components/apply/PaymentCard"

const LoanCalculator = () => {
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
    toggleSliders,
  ] = useApplication()
  const [tuitionValue, setTuitionValue] = useState(10000)
  const [colValue, setCOLValue] = useState(2000)
  const [boxes, setBoxes] = useState(false)
  const loanValue = tuitionValue + colValue
  const [maxTuition, setMaxTuition] = useState(30000)
  const [maxCOL, setMaxCOL] = useState(10000)
  const [metros, setMetros] = useState("")
  const [interestRate, setInterestRate] = useState({
    rate36: 8.99,
    rate60: 10.99,
  })
  const [interestPayments, setInterestPayments] = useState("")
  const [monthlyPayments, setMonthlyPayments] = useState("")
  const [totalPayments, setTotalPayments] = useState("")
  const [loanType, setLoanType] = useState("Interest Only")
  const [nonPaymentPeriod, setNonPaymentPeriod] = useState(3)
  const [formState, setFormState] = useState({ email: "" })

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormState({ [name]: value })
  }

  const handleTuitionSlider = e => {
    setTuitionValue(Number(e.target.value))
    setBoxes(true)
  }

  const handleCOLSlider = e => {
    setCOLValue(Number(e.target.value))
    setBoxes(true)
  }

  const selectLoanType = e => {
    setLoanType(e.target.value)
  }

  const selectMetro = e => {
    const parsedObj = JSON.parse(e.target.value)
    setMaxTuition(parsedObj.max[0])
    setMaxCOL(parsedObj.max[1])
  }

  useEffect(() => {
    console.log(program)
    if (program) {
      setTuitionValue(program["defaultAmount"])
      setMetros(program["metros"])
      setMaxTuition(program["aprAndType"][0]["info"]["maxTuition"])
      setCOLValue(0)
      setMaxCOL(program["aprAndType"][0]["info"]["maxCOL"])
      setLoanType(program["aprAndType"][0]["info"]["type"])
      setNonPaymentPeriod(program["nonPaymentPeriod"])
      setBoxes(false)
    }
  }, [program, metros])

  useEffect(() => {
    if (school) {
      setTuitionValue("")
      setCOLValue(0)
      setMaxTuition("")
      setMaxCOL("")
      program && setLoanType(program["aprAndType"][0]["info"]["type"])
    }
  }, [school])

  useEffect(() => {
    if (tuitionValue > maxTuition) {
      setTuitionValue(Number(maxTuition))
    }
  }, [maxTuition])

  useEffect(() => {
    calculateInterestPayment(loanValue, setInterestPayments, interestRate)
    calculateMonthlyPayment(loanValue, 10000, setMonthlyPayments, interestRate)
  }, [school, program, loanValue, loanType])

  useEffect(() => {
    calculateInterestPayment(loanValue, setInterestPayments, interestRate)
    calculateMonthlyPayment(loanValue, 10000, setMonthlyPayments, interestRate)
  }, [interestRate])

  useEffect(() => {
    calculateTotalPayment(
      loanType,
      nonPaymentPeriod,
      interestPayments,
      monthlyPayments,
      setTotalPayments
    )
  }, [interestPayments, monthlyPayments])

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

  let loanOptions =
    program && program["aprAndType"].length > 1 ? (
      program["aprAndType"].map(loanType => (
        <option key={loanType.info.type} value={loanType.info.type}>
          {loanType.info.type}
        </option>
      ))
    ) : (
      <>
        <option value="Interest Only">Interest Only</option>
        <option value="Immediate Repayment">Immediate Repayment</option>
      </>
    )

  let metroOptions =
    metros &&
    metros.map((metro, i) => (
      <option key={i} value={JSON.stringify(metro)}>
        {metro.location}
      </option>
    ))
  return (
    <Layout>
      <SEO title="Loan Calculator" />
      <Banner>
        <h1>Loan Calculator</h1>
        <p>
          Use the calculator to preview your monthly payments with a Skills Fund
          financing option. Curious about a specific program? Use the menu to
          select a school.
        </p>
      </Banner>
      <Container>
        <Form>
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
              value="Apply For Financing"
              onClick={handleSubmit}
              className={
                formState.email && loanUrl
                  ? "btn btn--submit"
                  : "btn btn--disabled"
              }
              disabled={formState.email && loanUrl ? false : true}
            />
          </form>
        </Form>
        <Calculator>
          <CalculatorCard>
            <div>
              <label htmlFor="loanType">Select your loan type</label>
              <SelectInput
                id="loanType"
                value={loanType}
                onChange={selectLoanType}
                onBlur={selectLoanType}
                options={loanOptions}
              />
            </div>
            {program && program["metros"].length > 0 && (
              <div>
                <label htmlFor="program">Select your location</label>
                <SelectInput
                  id="program"
                  defaultValue="default"
                  onChange={selectMetro}
                  onBlur={selectMetro}
                  options={metroOptions}
                />
              </div>
            )}
            <LoanCalculatorSlider
              maxTuition={maxTuition}
              tuitionValue={tuitionValue}
              showSliders={true}
              boxes={boxes}
            >
              <div className="loanCalculator--total">
                <p id="total">{formatter.format(loanValue)}</p>
                <p>Total Loan Amount</p>
              </div>
              <div className="slider__label--container">
                <span className="slider__label--label">
                  Tuition financed: {formatter.format(tuitionValue)}
                </span>
                <input
                  onChange={handleTuitionSlider}
                  onBlur={handleTuitionSlider}
                  type="range"
                  min="2000"
                  step="5"
                  max={maxTuition}
                  value={tuitionValue}
                  className="loanCalculator--input"
                />
              </div>
            </LoanCalculatorSlider>
            <LoanCalculatorSlider>
              <div className="slider__label--container">
                <span className="slider__label--label">
                  Living expenses financed: {formatter.format(colValue)}
                </span>
                <input
                  onChange={handleCOLSlider}
                  onBlur={handleCOLSlider}
                  type="range"
                  min="0"
                  step="5"
                  max={maxCOL}
                  value={colValue}
                  className="loanCalculator--input"
                />
              </div>
            </LoanCalculatorSlider>
            <Payments>
              <PaymentCard
                boxes={boxes}
                loanType={loanType}
                program={program}
                onChange={e =>
                  setInterestRate({
                    ...interestRate,
                    rate36: Number(e.target.value),
                  })
                }
                interestRate={interestRate.rate36}
                paymentTerm="36 Month"
                interestPayments={interestPayments.payment36}
                monthlyPayments={monthlyPayments.payment36}
                totalPayments={totalPayments.payment36}
                program={true}
              />
              <PaymentCard
                boxes={boxes}
                loanType={loanType}
                program={program}
                onChange={e =>
                  setInterestRate({
                    ...interestRate,
                    rate60: Number(e.target.value),
                  })
                }
                interestRate={interestRate.rate60}
                paymentTerm="60 Month"
                interestPayments={interestPayments.payment60}
                monthlyPayments={monthlyPayments.payment60}
                totalPayments={totalPayments.payment60}
                program={true}
              />
            </Payments>
          </CalculatorCard>
        </Calculator>
      </Container>
    </Layout>
  )
}

export default LoanCalculator

const Banner = styled.header`
  grid-area: banner;
  padding: 0.5rem;
  h1 {
    text-align: center;
  }

  @media ${breakpoint.lg} {
    margin: 2rem 0;
  }
`

const Container = styled.div`
  display: grid;
  padding: 0.5rem;
  grid-template-columns: 1fr;
  grid-template-areas:
    "banner"
    "calculator"
    "form";

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "banner   banner   banner"
      "form calculator calculator";
  }
`

const Form = styled.div`
  grid-area: form;
  padding: 0 0 1rem 0;
  border-right: 2px solid #c4c4c4;
  border-left: 2px solid #c4c4c4;
  border-bottom: 2px solid #c4c4c4;

  @media ${breakpoint.lg} {
    margin: 1rem 0;
    box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4,
      4px 4px #c4c4c4;
    border: 2px solid #c4c4c4;
  }
  .input {
    width: 20rem;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    select {
      margin: 0;
    }

    svg {
      font-size: 2rem;
      align-self: center;
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin: 0.5rem auto 0 auto;
    }
  }
`

const Calculator = styled.div`
  grid-area: calculator;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.primaryLight};
  color: ${({ theme }) => theme.black};
  border-top: 2px solid #c4c4c4;
  border-bottom: 2px solid #c4c4c4;
  overflow: hidden;

  @media ${breakpoint.lg} {
    margin: 1rem 0;
    box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4,
      4px 4px #c4c4c4;
  }

  select {
    width: 20rem;
  }
`

const Payments = styled.div`
  justify-content: space-evenly;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  @media ${breakpoint.lg} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const LoanCalculatorSlider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  .loanCalculator--total {
    margin: 1rem 0 2rem 0;
    box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4,
      4px 4px #c4c4c4, 5px 5px #c4c4c4, 6px 6px #c4c4c4, 7px 7px #c4c4c4,
      8px 8px #c4c4c4;
    background: white;
    padding: 0 1rem;
  }

  .labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  span {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.8rem;
  }

  p {
    text-align: center;
    margin-top: 0;
  }

  #total {
    font-weight: bold;
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 0;
  }
`
const CalculatorCard = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .btn--submit {
    box-shadow: none;
    transform: translate(0);
    :hover {
      transform: translate(0);
      box-shadow: none;
    }
  }
`
