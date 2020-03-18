import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import {
  calculateInterestPayment,
  calculateMonthlyPayment,
  calculateTotalPayment,
} from "../../utils/calculator"

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
  }, [school, program, loanValue, loanType])

  return (
    <AnimatePresence initial={false}>
      {showCalculator && (
        <CalculatorContainer
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CalculatorCard>
            <h2>
              Loan Calculator{showCalculator && <span> for {schoolName}</span>}
            </h2>
            <div>
              <label htmlFor="program">Select your program</label>
              <select
                id="program"
                defaultValue={"default"}
                onChange={selectProgramLoan}
                onBlur={selectProgramLoan}
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
                  value={loanType}
                  onChange={selectLoanType}
                  onBlur={selectLoanType}
                >
                  <option disabled>---</option>
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
              {program[0] && program[0]["loanLengths"].includes("36") && (
                <PaymentCard>
                  <div className="card--info">
                    <h3>{loanType}</h3>
                    <h4>36 Month Option</h4>
                    {program[0] && (
                      <p className="text-xs">
                        {program[0]["aprAndType"][0]["info"]["apr36"]}% APR
                      </p>
                    )}
                  </div>
                  <div className="card--payments">
                    {loanType === "Interest Only" && (
                      <>
                        <p className="mb-0 mt-4">
                          {formatterCents.format(interestPayments.payment36)}
                        </p>
                        <p className="mb-0 mt-1">Monthly Payments in School</p>
                      </>
                    )}
                    <p className="mb-0 mt-4">
                      {formatterCents.format(monthlyPayments.payment36)}
                    </p>
                    <p className="mb-0 mt-1">
                      Monthly Payments
                      {loanType === "Interest Only" && " After Graduation"}
                    </p>
                    <p className="mb-0 mt-4">
                      {formatterCents.format(totalPayments.payment36)}
                    </p>
                    <p className="mb-0 mt-1">Total cost of loan</p>
                  </div>
                </PaymentCard>
              )}
              {program[0] && program[0]["loanLengths"].includes("60") && (
                <PaymentCard>
                  <div className="card--info">
                    <h3>{loanType}</h3>
                    <h4>60 Month Option</h4>
                    {program[0] && (
                      <p className="text-xs">
                        {program[0]["aprAndType"][0]["info"]["apr60"]}% APR
                      </p>
                    )}
                  </div>
                  <div className="card--payments">
                    {loanType === "Interest Only" && (
                      <>
                        <p className="mb-0 mt-4">
                          {formatterCents.format(interestPayments.payment60)}
                        </p>
                        <p className="mb-0 mt-1">Monthly Payments in School</p>
                      </>
                    )}
                    <p className="mb-0 mt-4">
                      {formatterCents.format(monthlyPayments.payment60)}
                    </p>
                    <p className="mb-0 mt-1">
                      Monthly Payments
                      {loanType === "Interest Only" && " After Graduation"}
                    </p>
                    <p className="mb-0 mt-4">
                      {formatterCents.format(totalPayments.payment60)}
                    </p>
                    <p className="mb-0 mt-1">Total cost of loan</p>
                  </div>
                </PaymentCard>
              )}
            </Payments>
          </CalculatorCard>
        </CalculatorContainer>
      )}
    </AnimatePresence>
  )
}

export default ApplicationCalculator

const CalculatorContainer = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 4rem;
  select {
    width: 20rem;
  }
`

const CalculatorCard = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  :before {
    content: "";
    position: absolute;
    height: 1px;
    top: 0;
    background: black;
    width: 75vw;
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
  text-align: center;
  border-radius: 5px;
  box-shadow: 2px 2px 10px lightgray;
  color: #070707;

  .card--info {
    background: #fd6d5d;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 0.5rem 1rem;
    p {
      margin: 0;
    }
  }

  .card--payments {
    padding: 0.5rem 2rem 1rem 2rem;
  }
`
