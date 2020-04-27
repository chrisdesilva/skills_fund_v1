import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import { breakpoint } from "../../utils/breakpoints"

const ProductEducation = ({
  schoolName,
  showCalculator,
  school,
  loanTypeAvailable,
  program,
}) => {
  const { loanLengths } = program

  const [loanTermLength, setLoanTermLength] = useState("")
  const [loanTermType, setLoanTermType] = useState("")

  const handleBack = () => {
    if (loanTermType) {
      setLoanTermType("")
    } else {
      setLoanTermLength("")
    }
  }

  useEffect(() => {
    if (school && !school.schoolInfo.features.multiLoanLengths) {
      setLoanTermLength("36")
    }
    if (school && school.schoolInfo.features.products.length === 1) {
      setLoanTermType(school.schoolInfo.features.products[0])
    }
  }, [school])

  let educationMarkup = school ? (
    <ProductContainer>
      {!loanTermLength && school.schoolInfo.features.multiLoanLengths && (
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3>
              Would you rather pay off your loan faster or have lower monthly
              payments?
            </h3>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionContainer"
              >
                <button
                  className="questionCard btn"
                  onClick={() => setLoanTermLength("36")}
                >
                  <p>Pay off loan faster</p>
                </button>
                <button
                  className="questionCard btn"
                  onClick={() => setLoanTermLength("60")}
                >
                  <p>Have lower monthly payments</p>
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
      {(loanTermLength || !school.schoolInfo.features.multiLoanLengths) &&
        !loanTermType &&
        school.schoolInfo.features.products.length > 1 && (
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>How would you like to start making payment each month?</h3>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="questionContainer"
                >
                  {school.schoolInfo.features.products.includes(
                    "Immediate Repayment"
                  ) && (
                    <button
                      className="questionCard btn"
                      onClick={() => setLoanTermType("Immediate Repayment")}
                    >
                      <p>Make full monthly payments</p>
                    </button>
                  )}
                  {school.schoolInfo.features.products.includes(
                    "Interest Only"
                  ) && (
                    <button
                      className="questionCard btn"
                      onClick={() => setLoanTermType("Interest Only")}
                    >
                      <p>
                        Just pay interest while I'm taking classes and for three
                        months after graduating
                      </p>
                    </button>
                  )}
                  {school.schoolInfo.features.products.includes("Deferred") && (
                    <button
                      className="questionCard btn"
                      onClick={() => setLoanTermType("Deferred")}
                    >
                      <p>
                        Make no payments while I'm taking classes and for three
                        months after graduating
                      </p>
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        )}
    </ProductContainer>
  ) : (
    <ProductContainer>
      {!loanTermLength && (
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3>
              Would you rather pay off your loan faster or have lower monthly
              payments?
            </h3>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionContainer"
              >
                <button
                  className="questionCard btn"
                  onClick={() => setLoanTermLength("36")}
                >
                  <p>Pay off loan faster</p>
                </button>
                <button
                  className="questionCard btn"
                  onClick={() => setLoanTermLength("60")}
                >
                  <p>Have lower monthly payments</p>
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
      {loanTermLength && !loanTermType && (
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3>How would you like to start making payment each month?</h3>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionContainer"
              >
                <button
                  className="questionCard btn"
                  onClick={() => setLoanTermType("Immediate Repayment")}
                >
                  <p>Make full monthly payments</p>
                </button>
                <button
                  className="questionCard btn"
                  onClick={() => setLoanTermType("Interest Only")}
                >
                  <p>
                    Just pay interest while I'm taking classes and for three
                    months after graduating
                  </p>
                </button>
                <button
                  className="questionCard btn"
                  onClick={() => setLoanTermType("Deferred")}
                >
                  <p>
                    Make no payments while I'm taking classes and for three
                    months after graduating
                  </p>
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </ProductContainer>
  )

  return (
    <EducationContainer>
      {educationMarkup}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="questionContainer"
        >
          {loanTermLength === "36" && loanTermType === "Immediate Repayment" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionCard"
              >
                <h3>36 Month Immediate Repayment</h3>
                <p>Monthly Payments: $333.10</p>
              </motion.div>
            </AnimatePresence>
          )}
          {loanTermLength === "36" && loanTermType === "Interest Only" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionCard"
              >
                <h3>36 Month Interest Only</h3>
                <p>Monthly Payments in School: $77.87</p>
                <p>Monthly Payments After Grace Period: $333.10</p>
              </motion.div>
            </AnimatePresence>
          )}
          {loanTermLength === "36" && loanTermType === "Deferred" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionCard"
              >
                <h3>36 Month Deferred Repayment</h3>
                <p>Monthly Payments in School: $0</p>
                <p>Monthly Payments After Grace Period: $363.10</p>
              </motion.div>
            </AnimatePresence>
          )}
          {loanTermLength === "60" && loanTermType === "Immediate Repayment" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionCard"
              >
                <h3>60 Month Immediate Repayment</h3>
                <p>Monthly Payments: $283.10</p>
              </motion.div>
            </AnimatePresence>
          )}
          {loanTermLength === "60" && loanTermType === "Interest Only" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionCard"
              >
                <h3>60 Month Interest Only</h3>
                <p>Monthly Payments in School: $97.17</p>
                <p>Monthly Payments After Grace Period: $283.10</p>
              </motion.div>
            </AnimatePresence>
          )}
          {loanTermLength === "60" && loanTermType === "Deferred" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="questionCard"
              >
                <h3>60 Month Deferred Repayment</h3>
                <p>Monthly Payments in School: $0</p>
                <p>Monthly Payments After Grace Period: $333.10</p>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </AnimatePresence>
      {(loanTermLength || loanTermType) && (
        <button className="btn back" onClick={handleBack}>
          &larr; Back
        </button>
      )}
    </EducationContainer>
  )
}

export default ProductEducation

const EducationContainer = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  color: ${({ theme }) => theme.black};
  overflow: hidden;
  border-top: ${({ theme }) => `5px solid ${theme.black}`};
  background: #f7f7f7;

  h2 {
    padding: 2rem 0;
  }

  select {
    width: 20rem;
  }

  .back {
    margin: 1rem auto;
    border: ${({ theme }) => `2px solid ${theme.black}`};
  }

  .questionCard {
    padding: 5rem 1rem;
    width: 20rem;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    font-size: 1rem;
    background: white;
  }
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;

  h3 {
    text-align: center;
  }

  .questionContainer {
    display: flex;
    justify-content: space-around;
    padding: 2rem 0;
  }
`

const Product = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  border-top: ${({ theme, loanTypeAvailable }) =>
    loanTypeAvailable ? `8px solid  ${theme.secondary}` : `8px solid #c4c4c4`};
  padding: 1rem;
`
