import styled, { css } from "styled-components"
import { motion } from "framer-motion"

export const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
}

export const CardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  justify-content: center;
  padding: 2rem 0;
  background: white;
`

export const CardSide = css`
  /* position: absolute; */
  width: 100%;
  min-width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 2px solid gray;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;

  .click {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
  }
`

export const CardFront = styled.div`
  ${CardSide}
  font-weight: bold;
  z-index: 0;
  transition: border 800ms;
  border: 2px solid lightgray;
  background: white;

  :hover:not(.noMatches) {
    border: ${props => `2px solid ${props.theme.secondary}`};
  }

  form {
    margin-bottom: 1rem;
    text-align: center;
    background: white;

    label {
      font-weight: normal;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn {
      width: 8rem;
      margin: 0;
    }
  }

  .noMatches {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    .gatsby-image-wrapper {
      width: 100%;
    }
  }
`

export const CardBack = styled.div`
  ${CardSide}
  transform: rotateY(-180deg) translate(100%, 0);
  background: #ffebd9;
  z-index: 1;
  cursor: pointer;

  p {
    font-size: 0.65rem;
    margin: 0 0 0.25rem 0;
    line-height: 1.1;
  }

  h4 {
    font-size: 0.65rem;
    margin-bottom: 0.25rem;
  }

  .card-back--list {
    padding: 0.5rem;
  }

  .card-back--image {
    width: 25%;
    margin: 0 auto;

    .gatsby-image-wrapper {
      width: 100%;
      padding: 0;
    }
  }

  .hoverUnderline {
    text-align: center;
  }

  .card-back--info {
    display: flex;
    justify-content: space-evenly;
  }
`

export const CardInner = styled.div`
  flex: 1;
  display: flex;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  &.flipped {
    transform: rotateY(180deg);
  }
`

export const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  transition: z-index, transform 800ms;
  transition-delay: 800ms, 0s;
  z-index: 0;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  transform-style: preserve-3d;

  &.flipped {
    transition-delay: 0s;
    z-index: 1;
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
      transform: translate(0);
      box-shadow: none;
    }
  }

  a {
    text-decoration: none;
    color: black;
  }
`

export const CardLogo = styled.div`
  margin: auto;
  background: white;
  width: 150px;
  height: 92px;
  transition: border 300ms;
  border-bottom: 2px solid transparent;

  :hover:not(.noMatches) {
    border-bottom: ${props => `2px solid ${props.theme.secondary}`};
  }

  img {
    filter: grayscale(100%);
  }
`

export const CardInfo = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;

  div {
    display: flex;
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0 0 0.25rem 0;
    font-size: 0.8rem;
    line-height: 1.1;
  }

  .click {
    margin-top: auto;
  }
`

export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;

  p {
    text-align: left;
    font-weight: normal;
  }
`
