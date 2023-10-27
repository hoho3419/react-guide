import useValid from "../hooks/use-test-input";
// formik 은 form 전용 라이브러리이기 떄문에 참고하면 좋음

const emailValidation = (emailText) => { // 이렇게 밖에 선언하면 컴포넌트가 재렌더링해도 이 함수는 재 생성되지 않는다.
  // const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const regex = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
  if (!emailText || regex.test(emailText) === false) {
    return false;
  }
  return true;
};


const BasicForm = (props) => {
  const {
    value: enterdFirstName,
    isValid: enterdFirstNameIsValid,
    hasError: firstHasError,
    inputChangeHandler: firstChangHandler,
    inputBlurHandler: firstBlurHanler,
    reset: firstNameReset,
  } = useValid((value) => value.trim() !== ''); 

  const {
    value: enterdLastName,
    isValid: enterdLastNameIsValid,
    hasError: lastHasError,
    inputChangeHandler: lastChangHandler,
    inputBlurHandler: lastBlurHanler,
    reset: lastNameReset,
  } = useValid((value) => value.trim() !== ''); 

  const {
    value: enterdEmail,
    isValid: enterdEmailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangHandler,
    inputBlurHandler: emailBlurHanler,
    reset: emailReset,
  } = useValid((value) => emailValidation(value)); 

  const formSubmitHandler = (event) =>{
    event.preventDefault();
    if(!enterdFirstNameIsValid && !enterdLastNameIsValid && !enterdEmailIsValid){
      return;
    }
    console.log(enterdFirstName);
    firstNameReset();
    lastNameReset();
    emailReset();
  } 

  const firstNameClasses = firstHasError ? 'form-control invalid' : 'form-control'; 
  const lastNameClasses = lastHasError ? 'form-control invalid' : 'form-control'; 
  const eamailClasses = emailHasError ? 'form-control invalid' : 'form-control'; 

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input 
          type='text'
          id='name'
          value={enterdFirstName}
          onChange={firstChangHandler}
          onBlur={firstBlurHanler}
           />
          {firstHasError && <p className='error-text'>성을 빈칸으로 둘 수 없습니다.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input 
          type='text'
          id='name'
          value={enterdLastName}
          onChange={lastChangHandler}
          onBlur={lastBlurHanler}
           />
          {lastHasError && <p className='error-text'>이름을 빈칸으로 둘 수 없습니다.</p>}
        </div>
      </div>
      <div className={eamailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
        type='text'
        id='name'
        value={enterdEmail}
        onChange={emailChangHandler}
        onBlur={emailBlurHanler}
        />
        {emailHasError && <p className='error-text'>이메일을 빈칸으로 둘 수 없습니다.</p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
