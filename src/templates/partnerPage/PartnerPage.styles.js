import styled from "styled-components"
import { breakpoint } from "../../utils/breakpoints"

export const ApplyContainer = styled.section`
  display: flex;
  justify-content: center;
  background: #f7f7f7;
  min-height: 30vh;
  margin: 2rem 0 4rem 0;
`

export const ApplyCard = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  padding-top: 2rem;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;

  @media ${breakpoint.lg} {
    margin: 0 5rem;
  }

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
      transition-delay: 1000ms;
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
    transition-delay: 2000ms;
    opacity: ${({ showCalculatorText }) => (showCalculatorText ? "1" : "0")};
    text-align: center;
    margin: 0.25rem 0;

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

export const ApplySplit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem 0;

  @media ${breakpoint.lg} {
    flex-direction: row;
  }
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;

  @media ${breakpoint.lg} {
    width: 50%;
    padding: 0 2rem;
  }

  .content--logo {
    width: 33%;
    margin: 0 auto;
  }

  .content--content {
    margin: 0 auto;
  }
`

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${breakpoint.lg} {
    width: 50%;
  }

  .input {
    width: 20rem;
    display: flex;
    flex-direction: column;

    select {
      margin: 0;
    }

    svg {
      font-size: 1.5rem;
      align-self: center;
      margin: 1rem 0;
    }
  }
  form {
    div {
      display: flex;
      flex-direction: row;
    }
  }
`

export const ApplySubmit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  margin: 2rem 0;

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
