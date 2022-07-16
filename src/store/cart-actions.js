import { uiActions } from "./ui-slice";
import {cartActions} from './cart-slice';

export const fetchCartData = () => {
  return async(dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://react-app-38514-default-rtdb.firebaseio.com/cart.json');
        if(!response.ok){
            throw new Error('couldn\'t fetch cart data!');
        }
        const data = response.json();
        return data
    };
    try{
        const cartData= await fetchData();
        dispatch(cartActions.replaceCart({
            items:cartData.items || [],
            totalQuantity: cartData.totalQuantity
        }));
    }catch(error){
        dispatch(
            uiActions.setNotification({
              status: "error",
              title: "Error!!!",
              message: "Fetching cart data Failed",
            })
         );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );
    //--------------------------------
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-app-38514-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
              items: cart.items,
              totalQuantity:cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Server Error");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success!!!",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!!!",
          message: "Sending cart data Failed",
        })
      );
    }
  };
};
