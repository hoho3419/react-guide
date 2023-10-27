import React,{useContext} from "react";
import styles from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon"
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    
    const numberOfCartItems = cartCtx.items.reduce((curNum,item) =>{
        return curNum + item.amount;
    },0);
    return (
        <button onClick={props.onShowCart} className={styles.button}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>
                장바구니
            </span>
            <span className={styles.badge}>
                {numberOfCartItems}개
            </span>
        </button>
    )
}
export default HeaderCartButton;