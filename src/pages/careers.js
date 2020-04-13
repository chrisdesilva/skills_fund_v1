import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout/Layout"
import SEO from "../components/layout/SEO"

const Careers = () => {
  const data = useStaticQuery(graphql`
    {
      career: allContentfulCareers {
        nodes {
          description {
            childMdx {
              body
            }
          }
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Careers" />
      <Container>
        <h1>Join The Skills Fund Team</h1>
        <p>
          Named one of the top 50 startups to watch by Built In Austin, Skills
          Fund is a rapidly growing startup merging education tech and financial
          tech to revolutionize higher ed.
        </p>
        <p>
          More importantly, we can't wait to come into work every day. Why?
          Because we emphatically believe in our mission to transform the lives
          of students by leveling the playing field for access to high-quality,
          skills training and education. We have a real opportunity to create
          real change.
        </p>
        <p>
          We’re always looking for exceptional talent to join our growing team.
          If you’re interested in joining us, we encourage you to read Who
          Should Join Skills Fund and The Skills Code to see if you'd be a great
          fit for our culture.
        </p>
        <h2>Benefits Summary</h2>
        <p>
          We strive to create an environment in which our high-performing team
          members have the ability to be competitively compensated while
          achieving their greatest personal and professional potential. We also
          take pride in fostering a close-knit work culture and giving back to
          the community. We take the health and happiness of our employees
          seriously, with a comprehensive benefits offering including:
        </p>
        <ul>
          <li>
            Health insurance plan options that include medical, dental, and
            vision coverage
          </li>
          <li>Company provided Health Savings Account contributions</li>
          <li>Company provided life, accident and disability insurance</li>
          <li>
            Voluntary benefits options including life, accident, flexible
            spending accounts and much more!
          </li>
          <li>
            Unlimited paid vacation with an incentivized bonus to encourage
            rejuvenation and employee balance by truly unplugging
          </li>
          <li>Reasonable schedule flexibility</li>
          <li>Tuition reimbursement for continuing education</li>
          <li>401K retirement plan with company match</li>
          <li>Company match for charitable contributions</li>
        </ul>
        <h2>Current Openings</h2>
        {data.career.nodes.map(post => (
          <JobDescription>
            {post.title !== "No Openings" ? <h2>{post.title}</h2> : null}
            <MDXRenderer>{post.description.childMdx.body}</MDXRenderer>
          </JobDescription>
        ))}
      </Container>
    </Layout>
  )
}

export default Careers

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

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

const JobDescription = styled.section`
  border: 2px solid lightgray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  padding: 1rem;
  margin: 1rem 0;

  h2 {
    text-align: center;
  }
`
