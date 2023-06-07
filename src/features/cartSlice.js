import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartItems } from '../cartItem';

const initialState = {
    cartItems: [],
    total: 0,
    amount: 0,
    isLoading: true,
}

const url = 'https://course-api.com/react-useReducer-cart-project'

export const getCartItems = createAsyncThunk('cart/getCartItems', 
    async () => {
        return fetch(url).then((res) => res.json()).catch((err)=>{console.log(err)})
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];

        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item)=>
                itemId !== item.id
            )
        },
        increaseItem: (state, action) =>{
            const itemId = action.payload
            const cartItem = state.cartItems.find((item) => item.id === itemId)
            cartItem.amount = cartItem.amount + 1
        },
        decreaseItem: (state, action) =>{
            const itemId = action.payload
            const cartItem = state.cartItems.find((item) => item.id === itemId)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotal: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((item)=>{
                amount += item.amount
                total += item.price * item.amount                 
            })
            state.amount = amount
            state.total = total
            console.log(state.amount)
            console.log(state.total)
        }
    },
    extraReducers:{
        [getCartItems.pending] : (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled] : (state, action) => {
            console.log(action.payload)
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected] : (state) => {
            state.isLoading = false
        }
    }
})

export const { clearCart, removeItem,decreaseItem, increaseItem, calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;