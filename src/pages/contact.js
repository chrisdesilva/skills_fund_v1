import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout/Layout"
import TextInput from "../components/common/TextInput"
import SelectInput from "../components/common/SelectInput"
import { breakpoint } from "../utils/breakpoints"
import SEO from "../components/layout/SEO"

const Contact = () => {
  const [formState, setFormState] = useState({})

  const handleChange = e => {
    const { value, name } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...formState,
      }),
    })
      .then(() => {
        setFormState({})
      })
      .catch(error => console.log(error))
  }

  let idOptions = (
    <>
      <option value="default">---</option>
      <option value="School Representative">School Representative</option>
      <option value="Student">Student</option>
      <option value="Other">Other</option>
    </>
  )

  let refOptions = (
    <>
      <option value="default">---</option>
      <option value="Brochure or advertisement">
        Brochure or advertisement
      </option>
      <option value="A school's website">A school's website</option>
      <option value="A search engine">A search engine</option>
      <option value="Personal referral">Personal referral</option>
      <option value="We currently partner with Skills Fund">
        We currently partner with Skills Fund
      </option>
      <option value="Social media">Social media</option>
      <option value="Other">Other</option>
    </>
  )

  return (
    <Layout>
      <SEO title="General Inquiry" />
      <ContactContainer>
        <h1>Contact Us</h1>
        <h2>General Inquiry</h2>
        <p>
          We're here to help for every step of your journey. Whether you have
          questions around selecting the right partner school, financing your
          education, or simply about your loan application, please complete the
          form below or <Link to="/resources">check out our blog</Link>. Thank
          you!
        </p>
        <p>
          <strong>School Representatives:</strong> For any School Partnership
          inquiries, please <Link to="/partners">click here</Link>.
        </p>
        <form
          onSubmit={handleSubmit}
          name="general-contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="general-contact" />
          <label htmlFor="name">Name</label>
          <TextInput
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Your name"
            required={"required"}
          />
          <label htmlFor="email">Email address</label>
          <TextInput
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Your email"
            required={"required"}
          />
          <label htmlFor="identity">I am a...</label>
          <SelectInput
            id="identity"
            name="identity"
            defaultValue={"default"}
            value={formState.identity}
            onChange={handleChange}
            onBlur={handleChange}
            options={idOptions}
          />
          <label htmlFor="reference">How did you learn of Skills Fund?</label>
          <SelectInput
            id="reference"
            name="reference"
            defaultValue={"default"}
            value={formState.reference}
            onChange={handleChange}
            onBlur={handleChange}
            options={refOptions}
          />
          <label htmlFor="comment">Questions and/or comments</label>
          <TextInput
            type="text"
            name="comment"
            id="comment"
            value={formState.comment}
            onChange={handleChange}
            placeholder="Questions and/or comments"
          />
          <TextInput
            type="submit"
            value="Submit"
            className="btn btn--secondary"
          />
        </form>
      </ContactContainer>
    </Layout>
  )
}

export default Contact

const ContactContainer = styled.div`
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
  form {
    margin: 1rem auto;
    box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4,
      4px 4px #c4c4c4;
    border: 2px solid #c4c4c4;
    padding: 2rem;
    @media ${breakpoint.lg} {
      max-width: 50%;
    }

    input {
      margin: 0 auto 1rem auto;
      display: block;
    }
  }
`
