import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`

body {
  margin: 0;
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif; 
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.btn {
  width: 11rem;
  max-width: 11rem;
  padding: 0.5rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 300ms;
  text-decoration: none;
  font-weight: bold;
}

.btn:hover {
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4,
      4px 4px #c4c4c4;
      transform: translateX(-4px) translateY(-4px);
}

.btn:active {
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4;
  transform: translateX(-2px) translateY(-2px);
}

.btn--submit {
  background: #e96965;
  color: white;
  font-weight: bold;
  text-align: center;
  width: 11rem;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4;
  transform: translateX(-2px) translateY(-2px);
}

.btn--disabled {
  background-color: lightgray;
  color: black;
  opacity: 0.5;
}
.btn--disabled:hover {
  box-shadow: none;
  transform: translate(0);
}

.btn--nav {
  background-color: #e96965;
  color: white;
  z-index: 5;
  width: 6rem;
  font-size: 0.75rem;
  padding: 0.5rem;
  margin-right: 2rem;
  margin-top: 4px;
}

.btn--secondary {
  background-color: white;
  color: black;
  border: 2px solid black;
}

.hoverLink {
  text-decoration: none;
  color: black;
  transition: color 300ms;
}

.hoverLink:hover {
  color: #e96965;
}

.hoverUnderline {
    position: relative;
    cursor: pointer;
    display: inline;
    font-size: 0.75rem;

    :after {
      position: absolute;
      bottom: -25%;
      left: 0;
      right: 0;
      margin: auto;
      width: 85%;
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

input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-bottom: 2px solid lightgray;
  box-sizing: border-box;
  outline: none;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  border: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: #f7f7f7;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-webkit-slider-thumb {
  border: ${({ theme }) => `2px solid ${theme.secondaryDark}`};
  height: 20px;
  width: 20px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.secondary};
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5px;
}

.slider__label--container {
  position: relative;
  width: 100%;
  background: none;
}

.slider__label--label {
  position: absolute;
  top: 0;
  width: 100%;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #f7f7f7;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #f7f7f7;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-moz-range-thumb {
  border: ${({ theme }) => `2px solid ${theme.secondaryDark}`};
  border: 1px solid #000000;
  height: 20px;
  width: 20px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.secondary};
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-thumb {

  border: ${({ theme }) => `2px solid ${theme.secondaryDark}`};
  height: 20px;
  width: 20px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.secondary};
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #3071a9;
}
input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
}

.loanCalculator--input {
  background: none;
}

select {
  display: block;
  line-height: 1.3;
  padding: 0.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 2px solid lightgray;
  border-radius: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
label {
  font-size: 0.75rem;
}

#tooltip--tip {
  display: none;
  position: absolute;
  width: 15rem;
  background: #f7f7f7;
  top: 1.5rem;
  z-index: 5;
  padding: .25rem .5rem;
  color: black;
  font-size: .65rem;
  text-align: left;

  span {
    font-weight: bold;
  }
}

#tooltip--parent {
  margin: 0;
  padding: 0;
  position: relative;
  cursor: pointer;
}

#tooltip--parent:hover #tooltip--tip {
  display: block;

}

`
