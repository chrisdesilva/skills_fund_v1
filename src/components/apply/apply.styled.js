import styled from "styled-components"
import { breakpoint } from "../../utils/breakpoints"

export const ApplyContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 30vh;
  margin: 2rem 0 4rem 0;
  width: 100%;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
`

export const ApplyCard = styled.div`
  border-top: 1px solid lightgray;
  border-left: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  padding-top: 2rem;

  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .financingAvailable {
    transition: opacity 300ms;
    opacity: ${({ showCalculatorText }) => (showCalculatorText ? "1" : "0")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 0.25rem;
    text-align: center;

    @media ${breakpoint.lg} {
      flex-direction: row;
    }

    svg {
      transition: opacity 300ms, transform 500ms;
      opacity: ${({ showCalculatorText }) => (showCalculatorText ? "1" : "0")};
      transform: ${({ showCalculatorText }) =>
        showCalculatorText ? "scale(1.25)" : "scale(0)"};
      color: green;
      margin-top: 0.5rem;

      @media ${breakpoint.lg} {
        margin-left: 0.5rem;
        margin-top: 0;
      }
    }
  }

  .calculator {
    transition: opacity 300ms;
    opacity: ${({ showCalculatorText }) => (showCalculatorText ? "1" : "0")};
    text-align: center;
    margin: 0.25rem 0;
    border: none;
    background: transparent;

    :last-of-type {
      margin-bottom: 2rem;
    }

    :not(.uppercase) {
      position: relative;
      cursor: pointer;

      :after {
        position: absolute;
        bottom: -25%;
        left: 0;
        right: 0;
        margin: auto;
        width: 90%;
        content: ".";
        color: transparent;
        background: black;
        height: 1px;
        transition: width 300ms;
      }
      :hover:after {
        width: 95%;
      }
    }
  }
`

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  @media ${breakpoint.xl} {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
  }

  form {
    display: flex;
    flex-direction: column;

    input[type="submit"] {
      margin: 1rem auto;
    }
  }
  .input {
    width: 20rem;
    display: flex;
    flex-direction: column;

    select {
      margin: 0;
    }

    svg {
      font-size: 2rem;
      align-self: center;
      margin-top: 1rem;
    }
  }
`

export const ApplySubmit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;

  input {
    @media ${breakpoint.lg} {
      margin: 3rem 0 0 0;
    }
  }

  p {
    display: ${({ thankYou }) => (thankYou ? "block" : "none")};
  }
`

export const ApplyPayments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
