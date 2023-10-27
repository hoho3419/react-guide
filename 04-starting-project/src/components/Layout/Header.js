import React from "react"
import mealsImge from "../../assets/meals.jpg"
import styles from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton"

const Header = props => {
    return (
        <>
        <header className={styles.header}>
            <h1>React meals</h1>
            <HeaderCartButton onShowCart={props.onShowCart} />
        </header>
        <div className={styles["main-image"]}>
            <img  src={mealsImge}  alt="테이블 이미지"/>
        </div>
        </>
    )
}
export default Header;