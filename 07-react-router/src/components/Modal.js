import React, { useState,useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkblue;
  }

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    animation: ${fadeIn} 0.3s ease-in;
    opacity: 1;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    animation: ${fadeOut} 0.3s ease-out;
    opacity: 0;
  }
`;

const ModalExam = () => {
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <>
      <StyledButton onClick={() => setClicked((prev) => !prev)} ref={buttonRef}>토글 버튼</StyledButton>
      <CSSTransition
        in={clicked}
        timeout={300}
        classNames="fade"
        unmountOnExit
        
        onExited={() => setClicked(false)}
      >
        <StyledButton onClick={handleClick} >
          {clicked ? 'Clicked!' : 'Click Me'}
        </StyledButton>
    </CSSTransition>
    </>
  );
};


export default ModalExam;