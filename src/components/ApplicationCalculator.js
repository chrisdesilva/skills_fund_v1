import React, { useEffect, useState } from "react"
import styled from "styled-components"

const ApplicationCalculator = ({ school, showProgram, schoolName }) => {
  const [program, setProgram] = useState("")
  const [tuitionValue, setTuitionValue] = useState("")
  const [colValue, setCOLValue] = useState("")
  const loanValue = tuitionValue + colValue
  const [maxTuition, setMaxTuition] = useState("")
  const [maxCOL, setMaxCOL] = useState("")

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // even dollar amounts without cents
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
  }

  const selectMetro = e => {
    let maxArray = e.target.value.split(",")
    setMaxTuition(maxArray[0])
    setMaxCOL(maxArray[1])
  }

  useEffect(() => {
    if (program[0]) {
      setTuitionValue(program[0]["defaultAmount"])
      setCOLValue(0)
      setMaxTuition(program[0]["aprAndType"][0]["info"]["maxTuition"])
      setMaxCOL(program[0]["aprAndType"][0]["info"]["maxCOL"])
    }
  }, [program])

  useEffect(() => {
    setTuitionValue("")
    setCOLValue(0)
    setMaxTuition("")
    setMaxCOL("")
    setProgram("")
  }, [school])

  useEffect(() => {
    if (tuitionValue > maxTuition) {
      setTuitionValue(Number(maxTuition))
    }
  }, [maxTuition])

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
          <LoanCalculatorSlider>
            <div>
              <p id="total">{formatter.format(loanValue)}</p>
              <p>Total Loan Amount</p>
            </div>
            <input
              onChange={handleTuitionSlider}
              onBlur={handleTuitionSlider}
              // onTouchEnd={calculateMonthlyPayment}
              // onMouseUp={calculateMonthlyPayment}
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
            <LoanCalculatorSlider>
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

const LoanCalculatorSlider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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
