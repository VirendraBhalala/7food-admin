import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialStates from "./state";
import { AxiosApi } from "../../helpers/AxiosApi";
import { toast } from "react-toastify";

export const pincodeDeliveryCharge = createAsyncThunk('pincodeDeliveryCharge', async (data, { rejectWithValue }) => {
    try {
        const response = await AxiosApi.put(`/adminAuth/update-pincode`, data)
        return response.data
    } catch (error) {
        if (!error) {
            throw error.response;
        }
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data);
    }
})

export const getPincodeDeliveryCharge = createAsyncThunk('getPincodeDeliveryCharge', async (_, { rejectWithValue }) => {
    try {
        const response = await AxiosApi.get(`/adminAuth/get-pincode`)
        return response.data
    } catch (error) {
        if (!error) {
            throw error.response;
        }
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data);
    }
})


const pincodeSlice = createSlice({
    name: 'pincode',
    initialState: initialStates,

    extraReducers: {
        // Pincode Delivery Charge
        [pincodeDeliveryCharge.pending]: (state) => {
            state.loading = true
        },
        [pincodeDeliveryCharge.fulfilled]: (state, action) => {
            state.loading = false
            state.pincodeDeliveryChargeStatus.data = action.payload.data
        },
        [pincodeDeliveryCharge.rejected]: (state) => {
            state.loading = false
            state.error = true
        },

        // Get Pincode Delivery Charge
        [getPincodeDeliveryCharge.pending]: (state) => {
            state.loading = true
        },
        [getPincodeDeliveryCharge.fulfilled]: (state, action) => {
            state.loading = false
            state.getPincodeDeliveryChargeStatus.data = action.payload.data
        },
        [getPincodeDeliveryCharge.rejected]: (state) => {
            state.loading = false
            state.error = true
        }
    }
})

export default pincodeSlice.reducer