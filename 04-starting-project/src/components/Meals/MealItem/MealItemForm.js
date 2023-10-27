import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Input from "../../Ul/Input";
import styles from "./MealItemForm.module.css"
const MealItemForm = (props) =>{
    const [amountIsValid,setAmountIsValid] = useState(true)
    const amountInputRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber)
    } 
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input 
            ref={amountInputRef}
            label="수량" 
            input={{
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '10',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ 추가</button>
            {!amountIsValid && <p>유효한 수량을 입력하세요</p>}
        </form>
    )
}
export default MealItemForm;