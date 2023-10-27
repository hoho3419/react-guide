import { useState } from 'react'


const useInput = (validateValue) =>{
  const [enterdValue,setEnterdValue] = useState('');
  const [isTouched,setIsTouched] = useState(false);
  
  const valueChangeHandler = (event) =>{
    setEnterdValue(event.target.value);
  }
  
  const inputBlurHandler = (event) =>{
    setIsTouched(true);
  }
  
  const reset = () =>{
    setEnterdValue('');
    setIsTouched(false);
  }

  const valueIsValid = validateValue(enterdValue);
  const hasError = !valueIsValid && isTouched;

  return {
    value: enterdValue,
    isValid: valueIsValid,
    hasError,
    reset,
    valueChangeHandler,
    inputBlurHandler
  }
}

export default useInput;