import { useEffect } from 'react'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from "react-redux";
import Notification from './components/UI/Notification'
import { sendCartData,fetchCartData } from './store/cart-actions';

let isInital = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector(state => state.ui);
  const cart = useSelector(state => state.cart);
  const notification = cartVisible.notification;

  useEffect(() =>{
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(() =>{
   if(isInital){
    isInital = false;
    return;
   }
   // Redux Thunk 로 비동기 통신을 할 수 있게 해준다.
  // redux 툴킷에 기본으로 내장되어 있다.
  if(cart.changed){
    dispatch(sendCartData(cart))
  }
    
  },[cart,dispatch])

  return (
    <>
      {notification && <Notification 
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {cartVisible.cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
