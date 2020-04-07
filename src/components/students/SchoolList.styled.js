import styled from "styled-components"
import { motion } from "framer-motion"

export const ListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem 0;
  background: white;
`

export const ListItem = styled.div`
  padding: 1rem 0;
  border-top: 1px solid lightgray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  display: flex;
  background: white;
  margin: 0.25rem 1rem;

  :last-of-type {
    border-bottom: 1px solid lightgray;
  }

  .btn {
    width: 15rem;
    text-align: center;
    margin: 1rem;
    align-self: center;
    background: black;
    color: white;

    :hover {
      color: black;
      background: white;
      border: 2px solid black;
    }
  }

  a {
    text-align: center;
    text-decoration: none;
    color: black;
  }

  p {
    font-size: 0.8rem;
    margin: 0 0 0.25rem 0;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: normal;
  }

  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
`

export const ListColumn = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;

  :first-of-type {
    display: block;

    div {
      :last-of-type {
        display: flex;
        flex-direction: column;
      }
    }
  }

  :last-of-type {
    justify-content: center;
  }

  img {
    filter: grayscale(100%);
  }

  form {
    margin-bottom: 1rem;
    text-align: center;
    background: white;
    padding-right: 1rem;

    label {
      font-weight: normal;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn {
      width: 6rem;
      margin: 0;
    }
  }

  .logo {
    width: 150px;
    margin: auto;
  }

  .hoverUnderline {
    :after {
      width: 30%;
      transition: width 300ms;
    }

    :hover:after {
      width: 35%;
    }
  }
`
