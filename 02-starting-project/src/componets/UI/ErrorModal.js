import React from "react";
import styles from './ErrorModal.module.css'
import Card from "./Card";
import Button from "./Button";
import ReactDom from 'react-dom';
const Backdrop = (props) => {
    return <div onClick={props.onDelete} className={styles.backdrop} />;
}
const ModalOverlay = (props) =>{
    return (
        <Card className={styles.modal}>
                <header className={styles.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={styles.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={styles.actions}>
                    <Button onClick={props.onDelete} props>Okay</Button>
                </footer>
            </Card>
    )
}
const ErrorModal = (props) =>{
    return (
        <>
            {ReactDom.createPortal(<Backdrop onDelete={props.onDelete} className={styles.backdrop}/>,
            document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<ModalOverlay title={props.title} message={props.message} onDelete={props.onDelete} />, 
            document.getElementById('overlay-root'))}
        </>
    )
}
export default ErrorModal;