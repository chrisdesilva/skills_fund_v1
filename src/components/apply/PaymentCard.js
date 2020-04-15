import React from "react"
import { PaymentCardContainer } from "./ApplicationCalculator.styled"
import { FaQuestionCircle } from "react-icons/fa"
import EditableInput from "../common/EditableInput"

const PaymentCard = ({
  boxes,
  loanType,
  program,
  onChange,
  interestRate,
  paymentTerm,
  interestPayments,
  monthlyPayments,
  totalPayments,
  APR,
}) => {
  const formatterCents = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })
  return (
    <PaymentCardContainer boxes={boxes}>
      <div className="card--info">
        <div id="tooltip--parent">
          <h3>
            {loanType} Loan <FaQuestionCircle className="text-xs" />
          </h3>
          <div id="tooltip--tip">
            <p>
              {loanType === "Interest Only" ? (
                <>
                  <span>Interest Only</span> - Make interest-only payments while
                  in the program. Two months after completion, begin full
                  payments.
                </>
              ) : (
                <>
                  <span>Immediate Repayment</span> - Start making full payments
                  (interest + principal) about one month after disbursement.
                </>
              )}
            </p>
          </div>
        </div>
        <h4>{paymentTerm} Payment Term</h4>
        {program && (
          <div id="tooltip--parent">
            <p className="text-xs">
              <EditableInput
                onChange={onChange}
                type="number"
                value={interestRate}
                color="white"
                maxWidth="15%"
                step=".01"
              />
              % Interest Rate, {APR}% APR{" "}
              <FaQuestionCircle className="text-xs" />
            </p>
            <div id="tooltip--tip">
              <p>
                The Annual Percentage Rate (APR) shown is estimated based on the
                loan type, origination fee, and approximate program length. The
                actual APR may be slightly different than the example provided
                based on loan type and program length. To learn how an Annual
                Percentage Rate (APR) is calculated, visit our{" "}
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
              {interestRate < 4
                ? "---"
                : formatterCents.format(interestPayments)}
            </p>
            <p className="mb-0 mt-1 text-xs">Monthly Payments in School</p>
          </>
        )}
        <p className="mb-0 mt-4 text-2xl font-bold">
          {interestRate < 4 ? "---" : formatterCents.format(monthlyPayments)}
        </p>
        <p className="mb-0 mt-1 text-xs">
          Monthly Payments
          {loanType === "Interest Only" && " After Graduation"}
        </p>
        <p className="mb-0 mt-4 text-2xl font-bold">
          {interestRate < 4 ? "---" : formatterCents.format(totalPayments)}
        </p>
        <p className="mb-0 mt-1 text-xs">Total Lifetime Cost of Loan</p>
      </div>
    </PaymentCardContainer>
  )
}

export default PaymentCard
