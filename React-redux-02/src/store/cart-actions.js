import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice'; 


export const sendCartData = (cart) =>{
  return async (dispatch) =>{

    dispatch(uiActions.showNotification({
      state: 'Pendig',
      title: 'sending',
      message: 'Sending Cart data',
    }))

    const sendRequest = async () =>{
      const response = await fetch(`https://react-http-58f7a-default-rtdb.firebaseio.com/cart.json`,{
        method: 'PUT',
        body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
      });
  
      if(!response.ok){
        const error = new Error(response);
        throw error;
      }
    }
    try{
      await sendRequest();

      dispatch(uiActions.showNotification({
        state: 'success',
        title: 'Success!',
        message: 'Send To Cart data Success!',
      }))

    }catch(error){
      dispatch(uiActions.showNotification({
        state: 'error',
        title: 'Error!',
        message: 'Send Cart data Error!',
      }))
    }

  }
}

export const fetchCartData = () =>{
  return async (dispatch) =>{
    const fetchData = async () =>{
      const response = await fetch(`https://react-http-58f7a-default-rtdb.firebaseio.com/cart.json`);
      
      if(!response.ok){
        const error = new Error('데이터를 가져오기에 실패했습니다.');
        throw error;
      }
      const data = await response.json();
      return data;
    }
    try{
      const cartData = await fetchData();
      dispatch(cartActions.replaceData({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      }));
    }catch(error){
      dispatch(uiActions.showNotification({
        state: 'error',
        title: 'Error!',
        message: 'Fetching Cart data Error!',
      }))
    }
    
  }
}