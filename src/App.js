import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotal,
  clearCart,
  decreaseItem,
  getCartItems,
  increaseItem,
  removeItem,
} from "./features/cartSlice";
import { useEffect } from "react";
import { closeModal, openModal } from "./features/modal";

function App() {
  const dispatch = useDispatch();
  const { amount, cartItems, total, isLoading } = useSelector((store) => store.cart);

  const { isOpen } = useSelector((store) => store.modal);

  useEffect(()=>{
    dispatch(getCartItems())
  },[])

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  return (
    <>
      <div>
        <p>Redux Toolkit</p>
        <p>No of Items : {amount}</p>
        <hr />
      </div>
      <div>
        {cartItems.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.id}</p>
              <div>
                <p>{item.title}</p>
                <button
                  onClick={() => {
                    dispatch(removeItem(item.id));
                  }}
                >
                  remove item
                </button>
              </div>
              <p>Price : {item.price}</p>
              <p>Amount : {item.amount}</p>
              <button
                onClick={() => {
                  dispatch(increaseItem(item.id));
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  if (item.amount === 1) {
                    dispatch(removeItem(item.id));
                    return;
                  }
                  dispatch(decreaseItem(item.id));
                }}
              >
                Sub
              </button>
              <hr />
            </div>
          );
        })}
      </div>
      <hr />
      Total Amount : {total.toFixed(2)}
      <br />
      <br />
      <button
        onClick={() => {
          dispatch(openModal());
        }}
      >
        Clear Cart
      </button>
      <br />
      <br />
      <br />
      { isOpen ?
          <div>
            <p>Delete all items?</p>
            <button onClick={() => {
          dispatch(clearCart());
          dispatch(closeModal())
        }}>Confirm</button>
            <button onClick={() => {
          dispatch(closeModal());
        }}>Cancel</button>
          </div> : null
        }
        <br />
      <br />
      <br />
    </>
  );
}

export default App;
