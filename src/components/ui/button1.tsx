import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    text: string;
    onClick:()=>void
  }
  
const Button1:React.FC<ButtonProps> = ({text,onClick}) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    color: white;
    height:10px;
    text-decoration: none;
    font-size: 25px;
    border: none;
    background: none;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }

  button::before {
    margin-left: auto;
  }

  button::after, button::before {
    content: '';
    width: 0%;
    height: 2px;
    background: #f44336;
    display: block;
    transition: 0.5s;
  }

  button:hover::after, button:hover::before {
    width: 100%;
  }`;

export default Button1;
