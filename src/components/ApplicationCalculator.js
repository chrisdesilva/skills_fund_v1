import React, { useEffect, useState } from "react"
import styled from "styled-components"

const ApplicationCalculator = ({
  schoolList,
  schoolIndex,
  setSchoolName,
  showProgram,
  schoolName,
  programIndex,
  setProgramIndex,
}) => {
  const selectProgramLoan = e => {
    setProgramIndex(e.target.value)
  }

  const selectProgramLocation = e => {
    setMetroIndex(e.target.value)
  }

  const handleSliderAmt = e => {
    setLoanValue(e.target.value)
  }

  const [loanInformation, setLoanInformation] = useState("")
  const [metroIndex, setMetroIndex] = useState(0)
  const [loanValue, setLoanValue] = useState(
    schoolList[schoolIndex]["node"]["loanInfo"][0]["defaultAmount"]
  )
  const [tuitionMax, setTuitionMax] = useState(
    schoolList[schoolIndex]["node"]["loanInfo"][0]["maxTuition"]
  )
  const [costOfLivingMax, setCostOfLivingMax] = useState(
    schoolList[schoolIndex]["node"]["loanInfo"][0]["maxCOL"]
  )

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // even dollar amounts without cents
  })

  useEffect(() => {
    setProgramIndex(0)
    console.log(programIndex)
  }, [schoolIndex])

  useEffect(() => {
    // reset the program index any time the user changes schools in the loan app section
    setLoanInformation(schoolList[schoolIndex]["node"]["loanInfo"][0])
    setTuitionMax(
      schoolList[schoolIndex]["node"]["loanInfo"][0]["aprAndType"][0][
        "maxTuition"
      ]
    )
    setCostOfLivingMax(
      schoolList[schoolIndex]["node"]["loanInfo"][0]["aprAndType"][0]["maxCOL"]
    )
    setSchoolName(schoolList[schoolIndex]["node"]["basicInfo"]["schoolname"])
  }, [schoolIndex])

  useEffect(() => {
    // update the loan information any time a user changes programs
    setLoanInformation(
      schoolList[schoolIndex]["node"]["loanInfo"][programIndex]
    )
    setTuitionMax(
      schoolList[schoolIndex]["node"]["loanInfo"][programIndex][
        "aprAndType"
      ][0]["maxTuition"]
    )
    setCostOfLivingMax(
      schoolList[schoolIndex]["node"]["loanInfo"][programIndex][
        "aprAndType"
      ][0]["maxCOL"]
    )
  }, [programIndex])

  return (
    <CalculatorContainer showProgram={showProgram}>
      <CalculatorCard showProgram={showProgram}>
        <h2>Loan Calculator{showProgram && <span> for {schoolName}</span>}</h2>
        <SelectContainer showProgram={showProgram}>
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
            {schoolList[schoolIndex]["node"]["loanInfo"].map((program, i) => (
              <option key={program.segment} value={i}>
                {program.name}
              </option>
            ))}
          </select>
        </SelectContainer>
        {schoolList[schoolIndex]["node"]["loanInfo"][programIndex]["metros"]
          .length > 0 && (
          <SelectContainer showProgram={showProgram}>
            <label htmlFor="program">Select your location</label>
            <select
              id="program"
              defaultValue={"default"}
              onChange={selectProgramLocation}
              onBlur={selectProgramLocation}
            >
              <option disabled value="default">
                ---
              </option>
              {schoolList[schoolIndex]["node"]["loanInfo"][programIndex][
                "metros"
              ].map((program, i) => (
                <option key={i} value={i}>
                  {program.location}
                </option>
              ))}
            </select>
          </SelectContainer>
        )}
        {loanInformation && (
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
              max={loanInformation["aprAndType"][0]["maxTuition"]}
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
              <p>{formatter.format(tuitionMax)}</p>
            </div>
          </div>
        )}
      </CalculatorCard>
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
