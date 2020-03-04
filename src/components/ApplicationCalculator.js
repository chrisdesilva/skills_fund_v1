import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  calculateInterestPayment,
  calculateMonthlyPayment,
  calculateTotalPayment,
} from "../utils/calculator"

const ApplicationCalculator = ({ school, showCalculator, schoolName }) => {
  const [program, setProgram] = useState("")
  const [tuitionValue, setTuitionValue] = useState("")
  const [colValue, setCOLValue] = useState("")
  const loanValue = tuitionValue + colValue
  const [maxTuition, setMaxTuition] = useState("")
  const [maxCOL, setMaxCOL] = useState("")
  const [metros, setMetros] = useState("")
  const [interestPayments, setInterestPayments] = useState("")
  const [monthlyPayments, setMonthlyPayments] = useState("")
  const [totalPayments, setTotalPayments] = useState("")
  const [loanType, setLoanType] = useState("")
  const [nonPaymentPeriod, setNonPaymentPeriod] = useState("")
  const [showSliders, toggleSliders] = useState(false)

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  const formatterCents = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })

  const handleTuitionSlider = e => {
    setTuitionValue(Number(e.target.value))
  }

  const handleCOLSlider = e => {
    setCOLValue(Number(e.target.value))
  }

  const selectProgramLoan = e => {
    const selectedProgram = school.loanInfo.filter(
      program => program.name === e.target.value
    )
    setProgram(selectedProgram)
    toggleSliders(true)
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
    if (program[0]) {
      setTuitionValue(program[0]["defaultAmount"])
      setMetros(program[0]["metros"])
      setMaxTuition(program[0]["aprAndType"][0]["info"]["maxTuition"])
      setCOLValue(0)
      setMaxCOL(program[0]["aprAndType"][0]["info"]["maxCOL"])
      setLoanType(program[0]["aprAndType"][0]["info"]["type"])
      setNonPaymentPeriod(program[0]["nonPaymentPeriod"])
    }
  }, [program, metros])

  useEffect(() => {
    setTuitionValue("")
    setCOLValue(0)
    setMaxTuition("")
    setMaxCOL("")
    setProgram("")
    toggleSliders(false)
    program[0] && setLoanType(program[0]["aprAndType"][0]["info"]["type"])
  }, [school])

  useEffect(() => {
    if (tuitionValue > maxTuition) {
      setTuitionValue(Number(maxTuition))
    }
  }, [maxTuition])

  useEffect(() => {
    if (program[0]) {
      calculateInterestPayment(loanValue, setInterestPayments)
      calculateMonthlyPayment(loanValue, 10000, setMonthlyPayments)
      calculateTotalPayment(
        loanType,
        nonPaymentPeriod,
        interestPayments,
        monthlyPayments,
        setTotalPayments
      )
    }
  }, [school, program, loanValue])

  return (
    <CalculatorContainer showCalculator={showCalculator}>
      <CalculatorCard showCalculator={showCalculator}>
        <h2>
          Loan Calculator{showCalculator && <span> for {schoolName}</span>}
        </h2>
        <div showCalculator={showCalculator}>
          <label htmlFor="program">Select your program</label>
          <select
            id="program"
            defaultValue={"default"}
            onChange={selectProgramLoan}
            onBlur={selectProgramLoan}
            onClick={selectProgramLoan}
          >
            <option disabled value="default">
              ---
            </option>
            {school["loanInfo"] &&
              school["loanInfo"].map(program => (
                <option key={program.segment} value={program.name}>
                  {program.name}
                </option>
              ))}
          </select>
        </div>
        {program[0] && program[0]["aprAndType"].length > 1 && (
          <div>
            <label htmlFor="loanType">Select your loan type</label>
            <select
              id="loanType"
              defaultValue={"default"}
              onChange={selectLoanType}
              onBlur={selectLoanType}
              onClick={selectLoanType}
            >
              <option disabled value="default">
                ---
              </option>
              {school["features"]["products"].map(loanType => (
                <option key={loanType} value={loanType}>
                  {loanType}
                </option>
              ))}
            </select>
          </div>
        )}
        {program[0] && program[0]["metros"].length > 0 && (
          <div>
            <label htmlFor="program">Select your location</label>
            <select
              id="program"
              defaultValue={"default"}
              onChange={selectMetro}
              onBlur={selectMetro}
            >
              <option disabled value="default">
                ---
              </option>
              {metros &&
                metros.map((metro, i) => (
                  <option key={i} value={JSON.stringify(metro)}>
                    {metro.location}
                  </option>
                ))}
            </select>
          </div>
        )}
        <LoanCalculatorSlider showSliders={showSliders}>
          <div>
            <p id="total">{formatter.format(loanValue)}</p>
            <p>Total Loan Amount</p>
          </div>
          <input
            onChange={handleTuitionSlider}
            onBlur={handleTuitionSlider}
            type="range"
            min="2000"
            step="5"
            max={maxTuition}
            value={tuitionValue}
          />
          {loanValue && (
            <div className="labels">
              <p>$2,000</p>
              <div>
                <p>{formatter.format(tuitionValue)}</p>
                <p>Tuition Amount</p>
              </div>
              <p>{formatter.format(maxTuition)}</p>
            </div>
          )}
        </LoanCalculatorSlider>
        {maxCOL > 0 && (
          <LoanCalculatorSlider showSliders={showSliders}>
            <input
              onChange={handleCOLSlider}
              onBlur={handleCOLSlider}
              // onTouchEnd={calculateMonthlyPayment}
              // onMouseUp={calculateMonthlyPayment}
              type="range"
              min="0"
              step="5"
              max={maxCOL}
              value={colValue}
            />
            {loanValue && (
              <div className="labels">
                <p>$0</p>
                <div>
                  <p>{formatter.format(colValue)}</p>
                  <p>Cost of Living Amount</p>
                </div>
                <p>{formatter.format(maxCOL)}</p>
              </div>
            )}
          </LoanCalculatorSlider>
        )}
        <Payments showSliders={showSliders}>
          <PaymentCard>
            <h3>Interest Only Loan</h3>
            <h4>36 Month Option</h4>
            <p className="mb-0 mt-4">
              {formatterCents.format(interestPayments.payment36)}
            </p>
            <p className="mb-0 mt-1">Payments during your program</p>
            <p className="mb-0 mt-4">
              {formatterCents.format(monthlyPayments.payment36)}
            </p>
            <p className="mb-0 mt-1">Payments after you graduate</p>
            <p className="mb-0 mt-4">
              {formatterCents.format(totalPayments.payment36)}
            </p>
            <p className="mb-0 mt-1">Total cost of loan</p>
          </PaymentCard>
          <PaymentCard>
            <h3>Interest Only Loan</h3>
            <h4>60 Month Option</h4>
            <p className="mb-0 mt-4">
              {formatterCents.format(interestPayments.payment60)}
            </p>
            <p className="mb-0 mt-1">Payments during your program</p>
            <p className="mb-0 mt-4">
              {formatterCents.format(monthlyPayments.payment60)}
            </p>
            <p className="mb-0 mt-1">Payments after you graduate</p>
            <p className="mb-0 mt-4">
              {formatterCents.format(totalPayments.payment60)}
            </p>
            <p className="mb-0 mt-1">Total cost of loan</p>
          </PaymentCard>
        </Payments>
      </CalculatorCard>
    </CalculatorContainer>
  )
}

export default ApplicationCalculator

const CalculatorContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 300ms;
  background: ${props =>
    props.showCalculator ? "white" : props.theme.primaryDark};
  padding: 2rem 0;
  overflow: hidden;
  select {
    width: 20rem;
  }
`

const CalculatorCard = styled.div`
  transition: opacity 500ms, transform 500ms, height 500ms;
  opacity: ${({ showCalculator }) => (showCalculator ? "1" : "0")};
  transform: ${({ showCalculator }) =>
    showCalculator ? "translateY(0)" : "translateY(-5%)"};
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

const LoanCalculatorSlider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: opacity 300ms;
  opacity: ${({ showSliders }) => (showSliders ? "1" : "0")};

  .labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  p {
    text-align: center;
    margin-top: 0;
  }

  #total {
    font-weight: bold;
    font-size: 2rem;
    margin: 1rem 0;
  }
`

const Payments = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  transition: opacity 300ms;
  opacity: ${({ showSliders }) => (showSliders ? "1" : "0")};
`

const PaymentCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
  border: 2px solid lightgray;
  border-radius: 5px;
`
