import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { FaQuestionCircle } from "react-icons/fa"
import {
  calculateInterestPayment,
  calculateMonthlyPayment,
  calculateTotalPayment,
} from "../../utils/calculator"
import { breakpoint } from "../../utils/breakpoints"

const ApplicationCalculator = ({
  school,
  showCalculator,
  schoolName,
  program,
  showSliders,
  toggleSliders,
  handleEmail,
  email,
  handleSubmit,
  loanUrl,
  showThankYou,
}) => {
  const [tuitionValue, setTuitionValue] = useState("")
  const [colValue, setCOLValue] = useState("")
  const [boxes, setBoxes] = useState(false)
  const loanValue = tuitionValue + colValue
  const [maxTuition, setMaxTuition] = useState("")
  const [maxCOL, setMaxCOL] = useState("")
  const [metros, setMetros] = useState("")
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
            {program && program["metros"].length > 0 && (
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
              {/* {loanValue && (
                <div className="labels">
                  <p>$2,000</p>
                  <p>{formatter.format(maxTuition)}</p>
                </div>
              )} */}
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
                    // onTouchEnd={calculateMonthlyPayment}
                    // onMouseUp={calculateMonthlyPayment}
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
                          {school["basicInfo"]["interestRate36"]}% Interest
                          Rate, {program["aprAndType"][0]["info"]["apr36"]}% APR{" "}
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
                          {formatterCents.format(interestPayments.payment36)}
                        </p>
                        <p className="mb-0 mt-1 text-xs">
                          Monthly Payments in School
                        </p>
                      </>
                    )}
                    <p className="mb-0 mt-4 text-2xl font-bold">
                      {formatterCents.format(monthlyPayments.payment36)}
                    </p>
                    <p className="mb-0 mt-1 text-xs">
                      Monthly Payments
                      {loanType === "Interest Only" && " After Graduation"}
                    </p>
                    <p className="mb-0 mt-4 text-2xl font-bold">
                      {formatterCents.format(totalPayments.payment36)}
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
                          {school["basicInfo"]["interestRate60"]}% Interest
                          Rate, {program["aprAndType"][0]["info"]["apr60"]}% APR{" "}
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
                          {formatterCents.format(interestPayments.payment60)}
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
            <form className="input">
              {!email && (
                <label htmlFor="email">
                  Enter your email to apply for financing
                </label>
              )}
              <div>
                {!email && (
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    onChange={handleEmail}
                  />
                )}
                <input
                  type="submit"
                  value="Next &rarr;"
                  onClick={handleSubmit}
                  className={
                    email && loanUrl ? "btn btn--submit" : "btn btn--disabled"
                  }
                  disabled={email && loanUrl ? false : true}
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

const CalculatorContainer = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.primaryLight};
  color: ${({ theme }) => theme.black};
  overflow: hidden;
  border-top: ${({ theme }) => `5px solid ${theme.black}`};
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
  position: relative;

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  form {
    width: ${({ email }) => (email ? "13rem" : "20rem")};
    margin-top: 3rem;
    text-align: center;
    background: white;
    padding: ${({ email }) => (email ? "1rem" : "0 1rem 1rem 1rem")};
    box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
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

const LoanCalculatorSlider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: opacity 300ms;
  margin: 1rem 0;
  opacity: ${({ showSliders }) => (showSliders ? "1" : "0")};

  @media ${breakpoint.lg} {
    width: 50%;
  }

  .loanCalculator--total {
    margin: 1rem 0 2rem 0;
    transition: box-shadow 500ms, transform 500ms;
    transition-delay: 1000ms;
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

const Payments = styled.div`
  justify-content: space-evenly;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  @media ${breakpoint.lg} {
    flex-direction: row;
  }
`

const PaymentCard = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background: white;
  margin: 1rem 0;
  transition: border 500ms, transform 500ms;
  border: 2px solid lightgray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4,
    5px 5px #c4c4c4, 6px 6px #c4c4c4, 7px 7px #c4c4c4, 8px 8px #c4c4c4;
  /* transform: translateX(-8px) translateY(-8px); */
  width: 22rem;

  :hover {
    border: ${props => `2px solid ${props.theme.secondary}`};
    transform: translateY(-5px);
  }

  @media ${breakpoint.lg} {
    margin: 0;
  }

  .card--info {
    background: ${({ theme }) => theme.primaryDark};
    padding: 0.5rem 1rem;
    text-align: center;
    p {
      margin: 0;
    }
  }

  .card--payments {
    padding: 1rem 2rem 2rem 2rem;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
