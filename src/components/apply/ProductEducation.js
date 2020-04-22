import React from "react"
import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import { breakpoint } from "../../utils/breakpoints"

const ProductEducation = ({
  loanTypeAvailable,
  schoolName,
  showCalculator,
}) => {
  return (
    <AnimatePresence initial={false}>
      {showCalculator && (
        <EducationContainer
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Find A Payment Option That Fits Your Budget</h2>
          <ProductContainer>
            <Product loanTypeAvailable={loanTypeAvailable}>
              <h3>Interest Only</h3>
              <p>
                Make interest-only payments while in the program. Three months
                after completion, begin full payments.
              </p>
              <p className="text-xs">
                {loanTypeAvailable
                  ? `Available at ${schoolName}`
                  : `Not available at ${schoolName}`}
              </p>
            </Product>
            <Product loanTypeAvailable={loanTypeAvailable}>
              <h3>Immediate Repayment</h3>
              <p>
                Start making full payments (interest + principal) about one
                month after disbursement.
              </p>
              <p className="text-xs">
                {loanTypeAvailable
                  ? `Available at ${schoolName}`
                  : `Not available at ${schoolName}`}
              </p>
            </Product>
            <Product loanTypeAvailable={loanTypeAvailable}>
              <h3>Deferred Tuition</h3>
              <p>
                Make no payments while in the program. Three months after
                completion, begin full payments.
              </p>
              <p className="text-xs">
                {loanTypeAvailable
                  ? `Available at ${schoolName}`
                  : `Not available at ${schoolName}`}
              </p>
            </Product>
            <Product loanTypeAvailable={loanTypeAvailable}>
              <h3>36 Months</h3>
              <p>Make 36 full monthly payments</p>
              <p className="text-xs">
                {loanTypeAvailable
                  ? `Available at ${schoolName}`
                  : `Not available at ${schoolName}`}
              </p>
            </Product>
            <Product loanTypeAvailable={loanTypeAvailable}>
              <h3>60 Months</h3>
              <p>Make 60 full monthly payments</p>
              <p className="text-xs">
                {loanTypeAvailable
                  ? `Available at ${schoolName}`
                  : `Not available at ${schoolName}`}
              </p>
            </Product>
          </ProductContainer>
        </EducationContainer>
      )}
    </AnimatePresence>
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

  select {
    width: 20rem;
  }
`

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 2rem;
  grid-gap: 1rem;
  @media ${breakpoint.md} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${breakpoint.lg} {
    grid-template-columns: repeat(5, 1fr);
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
