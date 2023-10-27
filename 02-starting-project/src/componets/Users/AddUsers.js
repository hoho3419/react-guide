import React, {useState,useRef} from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css"
import ErrorModal from "../UI/ErrorModal";
const AddUsers = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // const [userValue, setUserValue] = useState('')
    // const [ageValue, setAgeValue] = useState('')
    const [error,setError] = useState();
    const AddUserHandler = (event) =>{
        event.preventDefault()
        const userName = nameInputRef.current.value
        const userAge = ageInputRef.current.value
        if(userName.trim().length === 0 || userAge.trim().length === 0){
            setError({
                title: '이름에 공백이 들어올 수 없습니다',
                message: '공백이 아닌 메세지를 입력하세요'
            })
            return
        }
        if(+userAge < 1){
            setError({
                title:'나이 입력이 잘못됐습니다',
                message: '나이는 0살일 수 없습니다.'
            })
            // setAgeValue(1)
            return
        }
        props.onAddUser(userName,userAge)
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
        // setUserValue('')
        // setAgeValue('')
    }
    // const usernameChangHandler = (event) =>{
    //     setUserValue(event.target.value)

    // }
    // const ageChangHandler = (event) => {
    //     // if(event.target.value < 1){
    //     //     alert("0 은 입력할 수 없습니다.")
    //     //     setAgeValue(1)
    //     //     return
    //     // }
    //     console.log(typeof(+event.target.value))
    //     setAgeValue(event.target.value)
    // }

    const errorHandler = () =>{
        setError(null)
    }
    return (
        <>
            {error && <ErrorModal onDelete={errorHandler} title={error.title} message={error.message}/>}
            <Card className={styles.input}>
                <form onSubmit={AddUserHandler}>
                    <label htmlFor="username">이름</label>
                    <input type='text' id="username" ref={nameInputRef}/>
                    <label htmlFor="age">나이</label>
                    <input type='number' id="age" ref={ageInputRef}/>
                    <Button type={'submit'}>추가+</Button>
                </form>
            </Card>
        </>
        
    );
}
export default AddUsers