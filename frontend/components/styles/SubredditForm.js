import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  padding: 20px;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 800;
  letter-spacing: 0.5px;
  position: relative;
  left: -45px;
  top: -20px;
  color: blue;
  margin-top: -25px;
  text-transform: lowercase;
  .lower-form-text {
      font-weight: 400;
      position: relative;
      top: -5px;
      color: gray;
      width: 100%;
      font-size: .8rem;
      letter-spacing: initial;
  }
  label {
    display: block;
    border:5px solid white;
    padding: 20px 20px;
    width: 600px;
    background-color: #cee3f8;
    margin-bottom: 1rem;

  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-top: 5px;
    border: 1px solid black;
  }
  button,
  input[type='submit'] {
    width: auto;
    background: white;
    color: black;
    text-transform: lowercase;
    border: 0;
    font-size: .8rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    border-radius: 5px;
    left: 5px;
    position: relative;
    border:1px solid grey;

  }
  fieldset {
    border: 0;
    padding: 0;
  }
  .error-field {
      border:2px solid red;
  }
  textarea {
    height:350px;
  }
`;

export default Form;