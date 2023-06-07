import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}

const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true
            console.log(state.isOpen)
        },
        closeModal: (state) => {
            state.isOpen = false
            console.log(state.isOpen)
        }
    }
})

export const {openModal, closeModal} = modal.actions

export default modal.reducer