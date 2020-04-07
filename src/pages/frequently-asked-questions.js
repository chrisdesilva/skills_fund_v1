import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"
import FAQ from "../components/faq/FAQ"
import { Container, FAQSection } from "./FAQ.styled"

const FAQs = () => {
  return (
    <Layout>
      <SEO title="Frequently Asked Questions" />
      <Container>
        <h1>Frequently Asked Questions</h1>
        <FAQSection>
          <h2>Payments</h2>
          <FAQ
            question="I have been financially affected by COVID-19. What are my repayment options?"
            answer={
              <p>
                For customers financially impacted by COVID-19, our servicers
                offer forbearance options. If your job or income has been
                affected by COVID-19 and you are concerned about your ability to
                make loan payments, we encourage you to reach out to your loan
                servicer to learn about your options. Skills Fund works with two
                loan servicers, and both are ready to help those who have been
                financially impacted. If you’re not sure how to get in touch
                with your servicer, please{" "}
                <a href="https://skills.fund/students/pay-your-loan">
                  visit our payment guide
                </a>
                ,
              </p>
            }
          />
          <FAQ
            question="How do I make payments on my Skills Fund loan?"
            answer={
              <>
                <p>
                  Aspire and Launch are the loan servicers for Skills Fund’s
                  loans. This means Aspire or Launch will collect your monthly
                  payments during the repayment phase of your loan. All loans
                  applied for
                  <strong> before December 26th, 2019</strong> will be serviced
                  by Aspire. All loans applied for{" "}
                  <strong>on or after December 26th, 2019</strong> will be
                  serviced by Launch.
                </p>
                <p>
                  {" "}
                  Need to pay your loan? Have a question about repayment on an
                  existing loan?
                </p>
                <ul>
                  <li>
                    If you applied for your loan before December 26th, 2019,
                    visit{" "}
                    <a
                      href="https://www.aspireservicingcenter.com/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Aspire online
                    </a>{" "}
                    or at <a href="tel:1-800-243-7552">1-800-243-7552</a>.
                  </li>
                  <li>
                    If you applied for your loan on or after December 26th,
                    2019, visit{" "}
                    <a
                      href="https://prod.launchservicing.com/Borrower/Login.aspx"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Launch Online
                    </a>{" "}
                    or at <a href="tel:877-354-2629">877-354-2629</a>.
                  </li>
                </ul>
                <p>The timing of your payments depends on your loan type.</p>
                <ul>
                  <li>
                    For <strong>Interest-only Loans</strong>, you will make
                    interest-only payments while in program and for two months
                    of grace. You will start making full (interest + principal)
                    payments two months after your program ends.
                  </li>
                  <li>
                    For <strong>Immediate Repayment Loans</strong>, you will
                    start making payments roughly one month after your loan is
                    disbursed (which occurs on the second Wednesday after
                    program start.)
                  </li>
                </ul>
                <p>
                  You can find more information about repayment amounts and
                  scheduling on your specific school's partner website.
                </p>
                <p>
                  For more info, go to:{" "}
                  <a href="https://skills.fund/students/pay-your-loan">
                    How Do I Pay Back My Skills Fund Loan
                  </a>
                </p>
              </>
            }
          />
          <FAQ
            question="Why should I enroll in Autopay?"
            answer={
              <>
                <p>
                  For loans originated starting in 2020, students have the
                  option to enroll in Autopay with our payment processor, Launch
                  Servicing. There are numerous benefits for enabling Autopay:
                </p>
                <ul>
                  <li>
                    Save on interest. You will receive a .25% reduction in the
                    interest rate on your loan as long as you remain signed up
                    for Autopay.
                  </li>
                  <li>
                    Avoid late fees. With Autopay, your monthly loan payments
                    are automatic, so you never have to worry about missing a
                    payment and incurring late fees.
                  </li>
                  <li>
                    Protect your credit. By ensuring on-time payments, Autopay
                    protects your credit from missed payments.
                  </li>
                </ul>
                <p>
                  And remember, there are no restrictions on pre-payment, so in
                  addition to your automatic payments, you can also pay down
                  your loan early which will reduce the total amount of interest
                  you will pay over the life of the loan.
                </p>
                <p>
                  Interest rate reduction of 0.25% applies only when the
                  borrower and/or cosigner sign up for automatic payments and
                  the payment amount is successfully deducted from the
                  designated bank account each month. Interest rate reduction(s)
                  will not apply during periods when no payment is due,
                  including periods of in-school, deferment, grace or
                  forbearance, unless a regular payment amount has been arranged
                  with the servicer. If you have two (2) consecutive returned
                  payments for Nonsufficient Funds, we may cancel your automatic
                  debit enrollment and you will lose the interest rate
                  reduction. You will then need to re-qualify and re-enroll in
                  automatic debit payments to receive the interest rate
                  reduction. (See{" "}
                  <a href="https://skills.fund/autopay-terms-and-conditions">
                    Automatic Payment Discount Terms & Conditions
                  </a>
                  .)
                </p>
              </>
            }
          />
          <FAQ
            question="Can I pay off my loan faster than the initial term?"
            answer={
              <p>Yes, you can pre-pay your loan at any time without penalty.</p>
            }
          />
          <FAQ
            question="What happens to my loan if I drop out of my program?"
            answer={
              <>
                <p>
                  While it is our hope that every student graduates and finds an
                  awesome job in your chosen field, we understand that other
                  circumstances may intervene.
                </p>
                <p>
                  <strong>Regarding your tuition:</strong> You are responsible
                  for the full amount you borrow, plus accrued interest and
                  fees. If you are owed a refund by your partner school, the
                  refund transaction will be made to Skills Fund in the amount
                  of the refund due (but in no event greater than what that we
                  paid to the school on your behalf). If there is a balance on
                  your loan after any applied refund, you will be required to
                  immediately start making monthly payments for the balance.
                </p>
                <p>
                  <strong>Regarding your cost of living:</strong> Because you've
                  received the funds, you're responsible for repaying them to
                  Skills Fund. If there is a balance on your loan after any
                  applied refund, you will be required to immediately start
                  making monthly payments for the balance.
                </p>
              </>
            }
          />
          <FAQ
            question="How can I cancel my loan?"
            answer={
              <p>
                If you applied for a loan before December 26th, 2019, please
                email{" "}
                <a href="mailto:customertrust@skills.fund">
                  CustomerTrust@Skills.Fund
                </a>{" "}
                to request a loan cancellation. If you applied for your loan on
                or after December 26th, 2019, log in to your Skills Fund account
                to cancel your loan.
              </p>
            }
          />
        </FAQSection>
        <FAQSection>
          <h2>Application Process</h2>
          <FAQ
            question="How do I apply for a Skills Fund loan?"
            answer={
              <p>
                After you've been accepted into a Skills Fund partner school
                program, you’ll apply for a Skills Fund loan on our specific{" "}
                <Link to="/students">partnership site</Link> for that school.
                Learn more{" "}
                <a href="https://skills.fund/students/how-to-apply-for-a-loan">
                  about our loan application
                </a>
                .
              </p>
            }
          />
          <FAQ
            question="Who can use Skills Fund?"
            answer={
              <p>
                U.S. citizens and Permanent Residents are eligible to apply for
                a Skills Fund loan.
              </p>
            }
          />
          <FAQ
            question="Will I qualify for a Skills Fund loan?"
            answer={
              <p>
                You might qualify for a Skills Fund loan if you meet our basic
                underwriting criteria, including: you are a U.S. citizen or
                green card holder, you haven’t defaulted on an educational loan,
                and you have an established credit history with fair credit or
                better. We also offer cosigner options, and we don’t consider
                your employment status or current salary in your credit
                decision. Learn more about our{" "}
                <a href="https://skills.fund/students/will-my-loan-application-be-approved">
                  loan approval criteria
                </a>
                .
              </p>
            }
          />
          <FAQ
            question="What are your interest rates?"
            answer={
              <p>
                We work with our partner schools to ensure their students have
                access to competitive financing. Please see your specific
                school’s Skills Fund site for further details.
              </p>
            }
          />
          <FAQ
            question="What information do I need to provide to Skills Fund?"
            answer={
              <>
                <p>
                  During the loan application process, we will ask you for the
                  following information:
                </p>
                <ul>
                  <li>Full name</li>
                  <li>Email address and other contact information</li>
                  <li>Social Security Number</li>
                  <li>Date of birth</li>
                  <li>Loan amount requested</li>
                  <li>One personal reference</li>
                  <li>
                    Cosigner name and contact information (if applying with a
                    cosigner)
                  </li>
                  <li>Citizenship / Permanent Resident (Green Card) status</li>
                  <li>Current income (not a factor in credit decision)</li>
                  <li>
                    Current employment status (not a factor in credit decision)
                  </li>
                </ul>
              </>
            }
          />
          <FAQ
            question="I need financing for tuition and the cost of living. How do I select the amount for each?"
            answer={
              <p>
                Within the loan application, you will find two fields for
                financing: one for tuition and one for cost of living. Within
                each field, you can enter the precise amount you would like to
                borrow. Students are required to take at least $2,000 in tuition
                financing in order to receive any cost of living financing. Cost
                of living financing is not available for some schools.
              </p>
            }
          />
          <FAQ
            question="Can I apply for a loan for the cost of living only?"
            answer={
              <p>
                No, students must apply for at least $2,000 in tuition financing
                in order to add cost of living financing. However, at select
                schools, a student is only eligible to borrow cost of living
                funds. Please see your specific school's Skills Fund site for
                further information.
              </p>
            }
          />
          <FAQ
            question="What is the status of my application?"
            answer={
              <p>
                After completing your loan application, you will receive a
                conditional credit decision in your loan application window. If
                you are credit approved, your loan will then be certified by
                your school. If you are not credit approved, you may be given
                the opportunity to strengthen your application with a cosigner.
              </p>
            }
          />

          <FAQ
            question="Will Skills Fund check my credit?"
            answer={
              <p>
                Skills Fund conducts a hard credit check only after you submit
                your application, but we'll tell you your estimated monthly
                payment before you even submit your application via our Loan
                Calculator. Once your application is complete, we will check
                your credit, including your credit score.
              </p>
            }
          />
          <FAQ
            question="When can I apply for a loan?"
            answer={
              <p>
                You can apply for the loan after your acceptance into a program.
                Your program cohort must begin within 90 days of the date that
                you apply for a loan.
              </p>
            }
          />
          <FAQ
            question="Do I need a cosigner?"
            answer={
              <>
                <p>
                  If you do not meet the loan underwriting criteria, you may be
                  invited to add a cosigner and reapply. You can (1) apply
                  individually, and should you not be approved, you may be
                  offered the ability to reapply with a cosigner, or (2)
                  initiate your loan process with a cosigner.
                </p>
                <p>
                  <strong>Please note:</strong> we recommend you to apply
                  individually to begin, and should you not be credit approved,
                  you may be given the opportunity to amend your application
                  with a cosigner.
                </p>
              </>
            }
          />
          <FAQ
            question="How and when will I receive my funds?"
            answer={
              <p>
                We send your funds (tuition + any living expense funds) on the
                second Wednesday after your program starts. On that day, the
                tuition portion of your loan is sent directly to your school and
                any living expense funds are sent directly to you. Please see
                your specific school's Skills Fund site for further information,
                as this may vary for your school.
              </p>
            }
          />
          <FAQ
            question="Can I get a loan if I have a scholarship?"
            answer={
              <>
                <p>
                  Yes, you may apply for financing in parallel to applying for
                  your scholarship. If you are awarded your scholarship prior to
                  the disbursement of your tuition financing to your school,
                  please email{" "}
                  <a href="mailto:customertrust@skills.fund">
                    CustomerTrust@Skills.Fund
                  </a>{" "}
                  with the amount of your scholarship, and your loan for tuition
                  will be downward adjusted.
                </p>
                <p>
                  Should you receive your scholarship following the second
                  Wednesday after program start, you can apply your funds to
                  your loan balance at any time without pre-payment penalty.
                </p>
                <p>
                  <strong>Please note:</strong> Should you want to apply for a
                  scholarship, it is recommended to apply for max tuition
                  financing, and once your scholarship is awarded, Skills Fund
                  can downward adjust your requested tuition financing. This
                  will prevent you having to apply for additional funds, should
                  you not be awarded your scholarship, as loans may not be
                  upward adjusted. Simply email CustomerTrust@Skills.Fund with
                  your approved scholarship amount.
                </p>
              </>
            }
          />
          <FAQ
            question="I’m attending an online program. Why does my loan application say I’ll be attending a campus location?"
            answer={
              <p>
                Don’t worry – this means everything is working correctly! The
                location is a default for our loan application. If you select an
                online program, our loan application automatically assigns the
                school’s corporate location as the campus location. Once you
                finish up the rest of the application, you’ll be all set for
                your online program.
              </p>
            }
          />
        </FAQSection>
        <FAQSection>
          <h2>Financial Literacy</h2>
          <FAQ
            question="What’s the difference between fixed rates and variable rates?"
            answer={
              <p>
                Your interest rate is the base cost of borrowing money for the
                duration of your loan and is a percentage of the principal loan
                amount. It can be fixed (it will not change) or variable (it
                could change over time). Variable interest rates can increase or
                decrease throughout the life of your loan, which may result in
                your monthly payment changing over time. All Skills Fund loans
                are fixed rate – your rate won’t go up! You can use our loan
                calculator to preview your rate and payment amounts before you
                apply.
              </p>
            }
          />
        </FAQSection>
        <FAQSection>
          <h2>About Skills Fund</h2>
          <FAQ
            question="Who is Skills Fund?"
            answer={
              <p>
                We are a team of higher ed, consumer protection, and student
                loan industry leaders, committed to revolutionizing higher
                education for the benefit of students of all backgrounds and
                walks of life. Our goal is simple: build the best financing
                tools for the best outcomes-focused schools and their students.
                In partnership with leading skills training programs, Skills
                Fund created a financing platform that is both transparent and
                student-first, to provide all students an experience radically
                different than traditional student loans. In order for all
                educational actors to keep an eye to student success, our model
                uniquely requires skin in the game from the school, lender, and
                quality assurance entity.
              </p>
            }
          />
          <FAQ
            question="How do you pick schools to work with?"
            answer={
              <p>
                We start by asking schools the right questions about their
                application process, acceptance rates, curriculum, the
                qualifications of their staff, and student outcomes. Then,
                together with our strategic financing partner, Goal Solutions,
                we perform an extensive evaluation to ensure every school we
                partner with is setting the bar high and paving the way for
                student success.
              </p>
            }
          />
          <FAQ
            question="Have you ever stopped working with a school?"
            answer={
              <>
                <p>
                  Yes, several of them. While we’re mindful of the fact that
                  Skills Fund isn't a government regulator or an accreditor, we
                  commit to doing our absolute best to ensure we're only
                  partnering with schools that deliver a tangible Return On
                  Education. (That’s our way of saying you get your money’s
                  worth and can start a better future.)
                </p>
                <p>
                  Despite our diligent efforts, sometimes we're just not a fit -
                  culturally or operationally. Other times, we have concerns
                  that a school will not be able to deliver on the promises
                  they’ve made to students.
                </p>
                <p>
                  For this reason, our quality assurance efforts are continuous
                  and never ending. We’re always checking up on our partners. We
                  believe every student deserves their maximum Return On
                  Education, and we're committed to making it happen for
                  students from across the country.
                </p>
              </>
            }
          />
          <FAQ
            question="Who is Richland State Bank and how is it related to Skills Fund?"
            answer={
              <p>
                Richland State Bank is the lender for all Skills Fund loans.
              </p>
            }
          />
          <FAQ
            question="Who are Aspire and Launch, how are they related to Skills Fund?"
            answer={
              <>
                <p>
                  Aspire and Launch are the loan servicers for Skills Fund
                  loans. This means Aspire or Launch will collect your monthly
                  payments during the repayment phase of your loan. All loans
                  applied for before December 26th, 2019 will be serviced by
                  Aspire. All loans applied for on or after December 26th, 2019
                  will be serviced by Launch.
                </p>
                <p>
                  Need to pay your loan? Have a question about repayment on an
                  existing loan?
                </p>
                <p>
                  If you applied for your loan before December 26th, 2019, visit{" "}
                  <a
                    href="https://www.aspireservicingcenter.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Aspire online
                  </a>{" "}
                  or at <a href="tel:1-800-243-7552">1-800-243-7552</a>.
                </p>
                <p>
                  If you applied for your loan on or after December 26th, 2019,
                  visit{" "}
                  <a
                    href="https://prod.launchservicing.com/Borrower/Login.aspx"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Launch Online
                  </a>{" "}
                  or at <a href="tel:877-354-2629">877-354-2629</a>.
                </p>
              </>
            }
          />
          <FAQ
            question="I have more questions, who can I ask?"
            answer={
              <p>
                Our Customer Trust team is here to help. For any additional
                questions, please complete the{" "}
                <Link to="/contact">General Inquiry Form</Link>.
              </p>
            }
          />
        </FAQSection>
      </Container>
    </Layout>
  )
}

export default FAQs
