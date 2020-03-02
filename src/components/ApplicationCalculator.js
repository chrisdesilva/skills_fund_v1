import React, { useEffect, useState } from "react"
import styled from "styled-components"

const ApplicationCalculator = ({ school, showProgram, schoolName }) => {
  const [program, setProgram] = useState("")
  const [loanValue, setLoanValue] = useState("")
  const [maxTuition, setMaxTuition] = useState("")
  const [maxCOL, setMaxCOL] = useState("")

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // even dollar amounts without cents
  })

  const handleSliderAmt = e => {
    setLoanValue(e.target.value)
  }

  const selectProgramLoan = e => {
    const selectedProgram = school.loanInfo.filter(
      program => program.name === e.target.value
    )
    setProgram(selectedProgram)
  }

  const selectMetro = e => {
    let maxArray = e.target.value.split(",")
    setMaxTuition(maxArray[0])
    setMaxCOL(maxArray[1])
  }

  useEffect(() => {
    if (program[0]) {
      setLoanValue(program[0]["defaultAmount"])
      setMaxTuition(program[0]["aprAndType"][0]["info"]["maxTuition"])
      setMaxCOL(program[0]["aprAndType"][0]["info"]["maxCOL"])
    }
  }, [program])

  useEffect(() => {
    setLoanValue("")
    setMaxTuition("")
    setMaxCOL("")
    setProgram("")
  }, [school])

  return (
    <CalculatorContainer showProgram={showProgram}>
      {school["loanInfo"] && (
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
              onBlur={selectProgramLoan}
              onClick={selectProgramLoan}
            >
              <option disabled value="default">
                ---
              </option>
              {school["loanInfo"].map(program => (
                <option key={program.segment} value={program.name}>
                  {program.name}
                </option>
              ))}
            </select>
          </SelectContainer>
          {program[0] && program[0]["metros"].length > 0 && (
            <SelectContainer showProgram={showProgram}>
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
                {program[0]["metros"].map((program, i) => (
                  <option key={i} value={program.max}>
                    {program.location}
                  </option>
                ))}
              </select>
            </SelectContainer>
          )}
          <div className="loanCalculator__slider">
            <input
              className="loanCalculator__input"
              onChange={handleSliderAmt}
              onBlur={handleSliderAmt}
              // onTouchEnd={calculateMonthlyPayment}
              // onMouseUp={calculateMonthlyPayment}
              type="range"
              min="2000"
              step="5"
              max={maxTuition}
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
              <p>{formatter.format(maxTuition)}</p>
            </div>
          </div>
        </CalculatorCard>
      )}
    </CalculatorContainer>
  )
}

export default ApplicationCalculator

const CalculatorContainer = styled.section`
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

const CalculatorCard = styled.div`
  transition: opacity 500ms, transform 500ms, height 500ms;
  height: ${({ showProgram }) => (showProgram ? "292" : "0")};
  opacity: ${({ showProgram }) => (showProgram ? "1" : "0")};
  transform: ${({ showProgram }) =>
    showProgram ? "translateY(0)" : "translateY(-5%)"};
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

const SelectContainer = styled.div`
  opacity: 0;
  transition: opacity 300ms;
  opacity: ${({ showProgram }) => (showProgram ? "1" : "0")};
`
