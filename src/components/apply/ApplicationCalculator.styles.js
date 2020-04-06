import styled from "styled-components"
import { motion } from "framer-motion"
import { breakpoint } from "../../utils/breakpoints"

export const CalculatorContainer = styled(motion.section)`
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

export const CalculatorCard = styled.div`
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

export const LoanCalculatorSlider = styled.div`
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

export const Payments = styled.div`
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

export const PaymentCard = styled.div`
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
