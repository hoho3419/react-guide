import { useReducer } from 'react'

const initalInputState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state,action) =>{
  if(action.type === 'INPUT'){
    return {
      // isTouched: state.isTouched,  이방식 밑에 방식 사용 가능. 여러개 일때 밑에 방식을 사용
      ...state,
      value: action.value, 
    }
  }
  if(action.type === 'BLUR'){
    return {
      // value: state.value,
      ...state,
      isTouched: true,
    }
  }
  if(action.type === 'RESET'){
    return {
      isTouched: false, value: ''
    }
  }
  return initalInputState
}

const useValid = (inputValidation) => {
  const [inputState, dispatch] = useReducer(inputStateReducer,initalInputState)

  // const [enteredValue,setEnterdValue] = useState('');
  // const [isTouched,setIsTouched] = useState(false);

  const inputChangeHandler = (event) =>{
    dispatch({type: 'INPUT',value: event.target.value})
    // setEnterdValue(event.target.value);
  }
  const inputBlurHandler = (event) =>{
    dispatch({type: 'BLUR'})
    // setIsTouched(true);
  }
  const reset = () =>{
    dispatch({type: 'RESET'})
    // setEnterdValue('');
    // setIsTouched(false);
  }
  const valueIsValid = inputValidation(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;


  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  }

}

export default useValid;