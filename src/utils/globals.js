import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
body {
  font-family: "forma-djr-micro", sans-serif;
  margin: 0;
  overflow-x: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

input {
  width: 11rem;
  padding: 0.5rem 1rem;
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
  box-shadow: 1px 3px 2px rgb(170, 170, 170);
}

.btn:active {
  box-shadow: 1px 1px 2px rgb(170, 170, 170);
}

.btn--submit {
  background: #9d1996;
  color: white;
  font-weight: bold;
  text-align: center;
}

.btn--disabled {
  background-color: lightgray;
  color: black;
  opacity: 0.5;
}
.btn--disabled:hover {
  box-shadow: none;
}

.btn--nav {
  background-color: #9d1996;
  color: white;
  z-index: 5;
  width: 6rem;
  font-size: 0.75rem;
  padding: 0.5rem;
  margin-right: 2rem;
  margin-top: 4px;
}

.btn--secondary {
  background-color: #0d606d;
  color: white;
}

.hoverLink {
  text-decoration: none;
  color: black;
  transition: color 300ms;
}

.hoverLink:hover {
  color: #9d1996;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid lightgray;
  box-sizing: border-box;
  outline: none;
}
select {
  display: block;
  line-height: 1.3;
  padding: 0.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
  border: 2px solid lightgray;
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

`
