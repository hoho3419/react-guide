import React from "react"
import styles from "./Modal.module.css"
import ReactDom from "react-dom"

const Backdrop = (props) =>{
    return <div onClick={props.onClick} className={styles.backdrop} />
}

const ModalOverlay = props =>{
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}

const Modal = props => {
    return (
        <>
            {ReactDom.createPortal(<Backdrop onClick={props.onClick} />,document.getElementById('overlays'))}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
        </>
    )
}
export default Modal;