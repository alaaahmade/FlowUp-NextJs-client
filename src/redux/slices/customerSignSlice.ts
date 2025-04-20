import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { HOST_API } from 'src/config-global';

interface SignDialogState {
  open: boolean;
  customers: any[];
  openStatus: boolean;
  status: string;
  code: string
}

const initialState: SignDialogState = {
  open: false,
  openStatus: false,
  customers:[],
  status: '',
  code: ''
};

export const gitCustomers = async () => {
  const customer = await axios.get(`${HOST_API}users/customers`,) 
  return customer.data.users
}

export const deleteCustomer = async (id: string) => {
  const customer = await axios.delete(`${HOST_API}users/customers/${id}`,)
  return customer.data
}

const signDialogSlice = createSlice({
  name: 'signDialog',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.open = true; 
    },
    closeDialog: (state) => {
      state.open = false; 
    },
    changeCode : (state, action) => {      
      state.code = action.payload.code;
    },
    openStatus: (state) => {
      state.openStatus = true;
    },
    closeStatus : (state) => {
      state.openStatus = false;
    },

    changeStatus : (state, action) => {
      state.status = action.payload.status;
    },

    setCustomer : (state, action) => {
      state.customers = action.payload.customers;
    }
    
  },
});

export const { openDialog, closeDialog, changeCode, openStatus, closeStatus, changeStatus, setCustomer } = signDialogSlice.actions;

export default signDialogSlice.reducer;
