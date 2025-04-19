import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {  FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { changeStateValue, closeNotificationsDialog } from 'src/redux/slices/notificationSlice';
import axios from 'axios';
import { HOST_API } from 'src/config-global';



const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

export default function NotificationDialog() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state?.NotificationsSlice?.openNotification);
  const target = useSelector((state: RootState) => state?.NotificationsSlice?.target);
  const title = useSelector((state: RootState) => state?.NotificationsSlice?.title);
  const content = useSelector((state: RootState) => state?.NotificationsSlice?.content);

  const handleClose = () => {
    dispatch(closeNotificationsDialog());
  };

  const handleConfirm =async () => {
    // dispatch(closeDialog());
    console.log({target, title, content});
    const requestBody = {
      type: 'general',
      title,
      message: 'We have added a new service!',
      body: content,
      // data: { discount: '10%' },
      targetGroup: target, 
      targetIds: [], 
    };
  
    try {
      const token = sessionStorage.getItem('accessToken');
  
      const response = await axios.post(`${HOST_API}notifications`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Notification created:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (

      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Send a notification</DialogTitle>
        <DialogContent
        sx={{
          pb: 3
        }}
        >
          <FormControl sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 3
          }} fullWidth>
          <FormControl sx={{width: '50%'}}>

          <InputLabel id="SendTo-simple-select-label">Send to</InputLabel>
          <Select
            
            labelId="SendTo-simple-select-label"
            id="SendTo-simple-select"
            label="Send To"
            name="SendTo"
            value={target}
            onChange={(event) => dispatch(changeStateValue({ type: 'target', value: event.target.value }))}
          >
            <MenuItem value='ALL_BOOKED_CUSTOMERS'>All booked customers</MenuItem>
            <MenuItem value='CUSTOMERS_BOOKED_SERVICE'>Service</MenuItem>
            <MenuItem value='CUSTOMERS_SPECIFIC_CLASS'>Specific class</MenuItem>
          </Select>
          </FormControl>
        <TextField
          fullWidth
          type='text'
          placeholder='Notification title'
          name="title"
          value={title}
          onChange={(event) => dispatch(changeStateValue({ type: 'title', value: event.target.value }))}
        />
        <TextField
          fullWidth
          type='text'
          multiline
          rows={3}
          placeholder='Notification content'
          name="content"
          value={content}
          onChange={(event) => dispatch(changeStateValue({ type: 'content', value: event.target.value }))}
        />

        </FormControl>

        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            border: '1px dashed #919EAB33'
          }}
        >

          <Button
            sx={{
              backgroundColor: '#212B36',
              color: '#fff',
              border: '1px solid #212B36',
              '&:hover': {
                backgroundColor: 'transparent',
                border: '1px solid #212B36',
                color: '#212B36',
              }
            }}
            onClick={handleConfirm}
            >Send notification
          </Button>
          <Button
          sx={{
            border: '1px solid #ccc',
          }}
          onClick={handleClose}
          >Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}
