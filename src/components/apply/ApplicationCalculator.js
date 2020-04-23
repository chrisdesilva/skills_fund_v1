import React, { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import {
  Payments,
  LoanCalculatorSlider,
  CalculatorCard,
  CalculatorContainer,
} from "./ApplicationCalculator.styled"
import {
  calculateInterestPayment,
  calculateMonthlyPayment,
  calculateTotalPayment,
} from "../../utils/calculator"
import TextInput from "../common/TextInput"
import SelectInput from "../common/SelectInput"
import PaymentCard from "./PaymentCard"

const ApplicationCalculator = ({
  school,
  showCalculator,
  schoolName,
  program,
  showSliders,
  toggleSliders,
  email,
  email2,
  handleSubmit,
  loanUrl,
  handleChange,
}) => {
  const [tuitionValue, setTuitionValue] = useState("")
  const [colValue, setCOLValue] = useState("")
  const [boxes, setBoxes] = useState(false)
  const loanValue = tuitionValue + colValue
  const [maxTuition, setMaxTuition] = useState("")
  const [maxCOL, setMaxCOL] = useState("")
  const [metros, setMetros] = useState("")
  const [creditScore, setCreditScore] = useState("3")
  const [creditScoreLabel, setCreditScoreLabel] = useState("Good")
  const [interestRate, setInterestRate] = useState({
    rate36: 8.99,
    rate60: 10.99,
  })
  const [interestPayments, setInterestPayments] = useState("")
  const [monthlyPayments, setMonthlyPayments] = useState("")
  const [totalPayments, setTotalPayments] = useState("")
  const [loanType, setLoanType] = useState("")
  const [nonPaymentPeriod, setNonPaymentPeriod] = useState("")

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  const handleInterestRate = e => {
    setCreditScore(e.target.value)
    console.log(creditScore)
  }

  useEffect(() => {
    if (creditScore == 1) {
      setCreditScoreLabel("Poor")
      setInterestRate({
        rate36: 14.99,
        rate60: 16.99,
      })
    }
    if (creditScore == 2) {
      setCreditScoreLabel("Fair")
      setInterestRate({
        rate36: 11.99,
        rate60: 13.99,
      })
    }
    if (creditScore == 3) {
      setCreditScoreLabel("Good")
      setInterestRate({
        rate36: 8.99,
        rate60: 10.99,
      })
    }
    if (creditScore == 4) {
      setCreditScoreLabel("Excellent")
      setInterestRate({
        rate36: 5.99,
        rate60: 7.99,
      })
    }
  }, [creditScore])

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
    setTuitionValue("")
    setCOLValue(0)
    setMaxTuition("")
    setMaxCOL("")
    toggleSliders(false)
    setBoxes(false)
    program && setLoanType(program["aprAndType"][0]["info"]["type"])
  }, [school])

  useEffect(() => {
    if (tuitionValue > maxTuition) {
      setTuitionValue(Number(maxTuition))
    }
  }, [maxTuition])

  useEffect(() => {
    if (program) {
      calculateInterestPayment(loanValue, setInterestPayments, interestRate)
      calculateMonthlyPayment(
        loanValue,
        10000,
        setMonthlyPayments,
        interestRate
      )
    }
  }, [school, program, loanValue, loanType])

  useEffect(() => {
    if (program) {
      calculateInterestPayment(loanValue, setInterestPayments, interestRate)
      calculateMonthlyPayment(
        loanValue,
        10000,
        setMonthlyPayments,
        interestRate
      )
    }
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

  let loanOptions =
    program &&
    program["aprAndType"].length > 1 &&
    program["aprAndType"].map(loanType => (
      <option key={loanType.info.type} value={loanType.info.type}>
        {loanType.info.type}
      </option>
    ))

  let metroOptions =
    metros &&
    metros.map((metro, i) => (
      <option key={i} value={JSON.stringify(metro)}>
        {metro.location}
      </option>
    ))

  return (
    <AnimatePresence initial={false}>
      {showCalculator && (
        <CalculatorContainer
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CalculatorCard email={email}>
            <h2>
              Loan Calculator
              {
                <span>
                  {" "}
                  for {schoolName} - {program.name}
                </span>
              }
            </h2>
            {program && program["aprAndType"].length > 1 && (
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
            )}
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
            {maxCOL > 0 && (
              <LoanCalculatorSlider showSliders={true}>
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
            )}
            <LoanCalculatorSlider
              maxTuition={maxTuition}
              tuitionValue={tuitionValue}
              showSliders={true}
              boxes={boxes}
            >
              <div className="slider__label--container gradient">
                <span className="slider__label--label">
                  Credit Score: {creditScoreLabel}
                </span>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  onChange={handleInterestRate}
                  onBlur={handleInterestRate}
                  className="loanCalculator--input"
                  value={creditScore}
                />
              </div>
            </LoanCalculatorSlider>
            <Payments showSliders={showSliders}>
              {program && program["loanLengths"].includes("36") && (
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
                  APR={
                    program["aprAndType"][0]["info"]["apr36"][creditScoreLabel]
                  }
                />
              )}
              {program && program["loanLengths"].includes("60") && (
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
                  APR={
                    program["aprAndType"][0]["info"]["apr60"][creditScoreLabel]
                  }
                />
              )}
            </Payments>
            <form className="input" onSubmit={handleSubmit}>
              {!email && (
                <label htmlFor="email">
                  Enter your email to apply for funding
                </label>
              )}
              <div>
                {!email && (
                  <TextInput
                    id="email2"
                    type="email"
                    name="email2"
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    value={email2}
                  />
                )}
                <TextInput
                  type="submit"
                  value="Next &rarr;"
                  className={
                    (email || email2) && loanUrl
                      ? "btn btn--submit"
                      : "btn btn--disabled"
                  }
                  disabled={(email || email2) && loanUrl ? false : true}
                />
              </div>
            </form>
          </CalculatorCard>
        </CalculatorContainer>
      )}
    </AnimatePresence>
  )
}

export default ApplicationCalculator
