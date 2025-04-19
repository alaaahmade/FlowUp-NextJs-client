import { createSlice } from '@reduxjs/toolkit';

interface INotificationsSlice {
  openNotification: boolean;
  target: string;
  title: string;
  content: string;
}

const initialState: INotificationsSlice = {
  openNotification: false,
  target: '',
  title: '',
  content: '',
};

const NotificationsSlice = createSlice({
  name: 'signDialog',
  initialState,
  reducers: {
    openNotificationsDialog: (state) => {
      state.openNotification = true; 
    },
    closeNotificationsDialog: (state) => {
      state.openNotification = false; 
    },

    changeStateValue: (state, action: { payload: { type: keyof INotificationsSlice; value: any } }) => {
      (state[action.payload.type] as typeof action.payload.value) = action.payload.value;
  },}
});

export const { openNotificationsDialog, changeStateValue, closeNotificationsDialog } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
