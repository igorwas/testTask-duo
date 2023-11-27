import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from '@mui/material';
import { remove } from "../reducers/notification";

export const Notification = () => {
  const { notification } = useSelector(({ notification }) => ({
    notification
  }));
  
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(()=>{dispatch(remove());}, 5000)
  }, [notification])

  return (
    <>
      <Snackbar open={notification?.message}>
        <Alert severity={notification.type}>{notification.message}</Alert>
      </Snackbar>
    </>
  );
}
