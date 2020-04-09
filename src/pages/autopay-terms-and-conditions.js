import React from "react"
import styled from "styled-components"
import Layout from "../components/layout/Layout"

const AutoPayTAC = () => {
  return (
    <Layout>
      <NoticeContainer>
        <h1>Autopay Terms and Conditions</h1>
        <p>
          These Terms and Conditions are applicable to eligible loan
          applications received on or after 12/27/2019.
        </p>
        <ul>
          <li>
            The current offered Automatic Payment Discount is an interest rate
            reduction of 0.25%.
          </li>
          <li>
            Eligibility for the Automatic Payment Discount is limited to
            borrowers that have a Skills Fund Loan that is serviced by Launch
            Servicing, the borrowers are enrolled in and making automatic debit
            payments from their personal checking account, and the amount is
            successfully withdrawn from the authorized bank account each month
            with the loan servicer.
          </li>
          <li>
            The loan must be current. Loans in a delinquency and/or default or
            charge-off status are not eligible.
          </li>
          <li>
            Your required minimum monthly payment amount must be made on time.
          </li>
          <li>
            You are not eligible for the Automatic Payment Discount if your
            monthly debited payment amount is less than $1.00.
          </li>
        </ul>
      </NoticeContainer>
    </Layout>
  )
}

export default AutoPayTAC

const NoticeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin: 3rem 0;
    text-align: center;
  }

  a:not(.btn) {
    text-decoration: none;
    color: black;
    transition: background-position 120ms;
    background-image: linear-gradient(
      transparent 0%,
      transparent calc(50% - 9px),
      rgba(255, 164, 161, 0.5) calc(50% - 9px),
      rgba(255, 164, 161, 0.5) 100%
    );
    background-size: 100% 225%;
    background-position: 0px 0px;

    :hover {
      background-image: linear-gradient(
        transparent 0%,
        transparent calc(50% - 9px),
        rgba(233, 105, 101, 1) calc(50% - 9px),
        rgba(233, 105, 101, 1) 100%
      );
      background-position: center center;
    }
  }
`
