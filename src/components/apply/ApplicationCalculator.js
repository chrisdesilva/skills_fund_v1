import React, { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import {
  PaymentCard,
  Payments,
  LoanCalculatorSlider,
  CalculatorCard,
  CalculatorContainer,
} from "./ApplicationCalculator.styled"
import { FaQuestionCircle } from "react-icons/fa"
import {
  calculateInterestPayment,
  calculateMonthlyPayment,
  calculateTotalPayment,
} from "../../utils/calculator"
import TextInput from "../common/TextInput"
import SelectInput from "../common/SelectInput"
import EditableInput from "../common/EditableInput"

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
  showThankYou,
  handleChange,
}) => {
  const [tuitionValue, setTuitionValue] = useState("")
  const [colValue, setCOLValue] = useState("")
  const [boxes, setBoxes] = useState(false)
  const loanValue = tuitionValue + colValue
  const [maxTuition, setMaxTuition] = useState("")
  const [maxCOL, setMaxCOL] = useState("")
  const [metros, setMetros] = useState("")
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

  const formatterCents = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })

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
      calculateTotalPayment(
        loanType,
        nonPaymentPeriod,
        interestPayments,
        monthlyPayments,
        setTotalPayments
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
      calculateTotalPayment(
        loanType,
        nonPaymentPeriod,
        interestPayments,
        monthlyPayments,
        setTotalPayments
      )
    }
  }, [interestRate])

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
              {showCalculator && (
                <span>
                  {" "}
                  for {schoolName} - {program.name}
                </span>
              )}
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
              showSliders={showSliders}
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
              <LoanCalculatorSlider showSliders={showSliders}>
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

            <Payments showSliders={showSliders}>
              {program && program["loanLengths"].includes("36") && (
                <PaymentCard boxes={boxes}>
                  <div className="card--info">
                    <div id="tooltip--parent">
                      <h3>
                        {loanType} Loan <FaQuestionCircle className="text-xs" />
                      </h3>
                      <div id="tooltip--tip">
                        <p>
                          {loanType === "Interest Only" ? (
                            <>
                              <span>Interest Only</span> - Make interest-only
                              payments while in the program. Two months after
                              completion, begin full payments.
                            </>
                          ) : (
                            <>
                              <span>Immediate Repayment</span> - Start making
                              full payments (interest + principal) about one
                              month after disbursement.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <h4>36 Month Payment Term</h4>
                    {program && (
                      <div id="tooltip--parent">
                        <p className="text-xs">
                          <EditableInput
                            onChange={e =>
                              setInterestRate({
                                ...interestRate,
                                rate36: Number(e.target.value),
                              })
                            }
                            type="number"
                            value={interestRate.rate36}
                            color="white"
                            maxWidth="15%"
                            step=".01"
                          />
                          % Interest Rate,{" "}
                          {program["aprAndType"][0]["info"]["apr36"]}% APR{" "}
                          <FaQuestionCircle className="text-xs" />
                        </p>
                        <div id="tooltip--tip">
                          <p>
                            The Annual Percentage Rate (APR) shown is estimated
                            based on the loan type, origination fee, and
                            approximate program length. The actual APR may be
                            slightly different than the example provided based
                            on loan type and program length. To learn how an
                            Annual Percentage Rate (APR) is calculated, visit
                            our{" "}
                            <a
                              href="https://skills.fund/resources/how-is-an-apr-calculated"
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              blog
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="card--payments">
                    {loanType === "Interest Only" && (
                      <>
                        <p className="mb-0 mt-4 text-2xl font-bold">
                          {interestRate.rate36 < 4
                            ? "---"
                            : formatterCents.format(interestPayments.payment36)}
                        </p>
                        <p className="mb-0 mt-1 text-xs">
                          Monthly Payments in School
                        </p>
                      </>
                    )}
                    <p className="mb-0 mt-4 text-2xl font-bold">
                      {interestRate.rate36 < 4
                        ? "---"
                        : formatterCents.format(monthlyPayments.payment36)}
                    </p>
                    <p className="mb-0 mt-1 text-xs">
                      Monthly Payments
                      {loanType === "Interest Only" && " After Graduation"}
                    </p>
                    <p className="mb-0 mt-4 text-2xl font-bold">
                      {interestRate.rate36 < 4
                        ? "---"
                        : formatterCents.format(totalPayments.payment36)}
                    </p>
                    <p className="mb-0 mt-1 text-xs">
                      Total Lifetime Cost of Loan
                    </p>
                  </div>
                </PaymentCard>
              )}
              {program && program["loanLengths"].includes("60") && (
                <PaymentCard boxes={boxes}>
                  <div className="card--info">
                    {" "}
                    <div id="tooltip--parent">
                      <h3>
                        {loanType} Loan <FaQuestionCircle className="text-xs" />
                      </h3>
                      <div id="tooltip--tip">
                        <p>
                          {loanType === "Interest Only" ? (
                            <>
                              <span>Interest Only</span> - Make interest-only
                              payments while in the program. Two months after
                              completion, begin full payments.
                            </>
                          ) : (
                            <>
                              <span>Immediate Repayment</span> - Start making
                              full payments (interest + principal) about one
                              month after disbursement.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <h4>60 Month Payment Term</h4>
                    {program && (
                      <div id="tooltip--parent">
                        <p className="text-xs">
                          <EditableInput
                            onChange={e =>
                              setInterestRate({
                                ...interestRate,
                                rate60: Number(e.target.value),
                              })
                            }
                            type="number"
                            value={interestRate.rate60}
                            color="white"
                            maxWidth="15%"
                            step="0.1"
                          />
                          % Interest Rate,{" "}
                          {program["aprAndType"][0]["info"]["apr60"]}% APR{" "}
                          <FaQuestionCircle className="text-xs" />
                        </p>
                        <div id="tooltip--tip">
                          <p>
                            The Annual Percentage Rate (APR) shown is estimated
                            based on the loan type, origination fee, and
                            approximate program length. The actual APR may be
                            slightly different than the example provided based
                            on loan type and program length. To learn how an
                            Annual Percentage Rate (APR) is calculated, visit
                            our{" "}
                            <a
                              href="https://skills.fund/resources/how-is-an-apr-calculated"
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              blog
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="card--payments">
                    {loanType === "Interest Only" && (
                      <>
                        <p className="mb-0 mt-4 text-2xl font-bold">
                          {interestRate.rate60 == 0
                            ? "---"
                            : formatterCents.format(interestPayments.payment60)}
                        </p>
                        <p className="mb-0 mt-1 text-xs">
                          Monthly Payments in School
                        </p>
                      </>
                    )}
                    <p className="mb-0 mt-4 text-2xl font-bold">
                      {formatterCents.format(monthlyPayments.payment60)}
                    </p>
                    <p className="mb-0 mt-1 text-xs">
                      Monthly Payments
                      {loanType === "Interest Only" && " After Graduation"}
                    </p>
                    <p className="mb-0 mt-4 text-2xl font-bold">
                      {formatterCents.format(totalPayments.payment60)}
                    </p>
                    <p className="mb-0 mt-1 text-xs">
                      Total Lifetime Cost of Loan
                    </p>
                  </div>
                </PaymentCard>
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
