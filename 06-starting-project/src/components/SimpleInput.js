import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enterdName, // 이런식으로 받는 쪽에서 하면 enterdName로 retrun 받는 값을 할당 받겠다는 의미이다.
    isValid: enterdNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const emailValidation = (emailText) => {
    // const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regex = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
    if (!emailText || regex.test(emailText) === false) {
      return false;
    }
    return true;
  };

  const {
    value: enterdEmail,
    isValid: enterdEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => emailValidation(value));

  // const [enterdName,setEnterdName] = useState(''); 원래 로직
  // const [enterdNameTouched,setEnterdNameTouched] = useState(false);

  // const [enterdEmail,setEnterdEmail] = useState('');
  // const [enterdEmailTouched,setEnterdEmailTouched] = useState(false);

  

  // const enterdNameIsValid = enterdName.trim() !== ''; 원래 로직
  // const nameInputIsValid = !enterdNameIsValid && enterdNameTouched;

  // const enterdEmailIsValid = emailValidation(enterdEmail);
  // const emailInputIsValid = !enterdEmailIsValid && enterdEmailTouched;
  
  let formIsValid = false;

  if(enterdNameIsValid && enterdEmailIsValid){
    formIsValid = true;
  }

  // const nameInputChangeHandler = (event) =>{
  //   setEnterdName(event.target.value);
  //   setEnterdNameTouched(true);
  // }
  // const nameInputBlurHandler = (event) =>{
  //   setEnterdNameTouched(true);
  // }

  // const emailInputChangeHandler = (event) =>{
  //   setEnterdEmail(event.target.value);
  //   setEnterdEmailTouched(true);
  // }
  // const emailInputBlurHandler = (event) =>{
  //   setEnterdEmailTouched(true);
  // }

  const formSubmissionHandler = (event) =>{
    event.preventDefault();

    if(!enterdNameIsValid && !enterdEmailIsValid){
      return;
    }
    // name.current.value = ''; 이 방식은 돔을 직접 조작하는 방식이기 때문에 지양해야 한다.
    // setEnterdEmail('');
    // setEnterdEmailTouched(false);
    resetEmailInput();

    // setEnterdName('');
    // setEnterdNameTouched(false);
    resetNameInput();
  }
  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler} value={enterdName}/>
      </div>
      {nameInputHasError && <p className='error-text'>이름칸을 빈칸으로 둘 수 없습니다.</p>}
      <div className={emailInputClasses}>
        <label htmlFor='name'>Your E-mail</label>
        <input type='text' id='name' onChange={emailChangeHandler} onBlur={emailBlurHandler} value={enterdEmail}/>
      </div>
      {emailInputHasError && <p className='error-text'>이메일을 빈칸으로 둘 수 없습니다.</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
