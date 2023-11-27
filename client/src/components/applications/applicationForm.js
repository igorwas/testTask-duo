import * as React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { API_BASE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { parseResponseToNotification } from '../../utils/resToNotification';
import { set } from '../../reducers/notification';
import { setList } from '../../reducers/applications';

export const ApplicationForm = () => {
  const { applications, currentUser } = useSelector(({ applications, currentUser }) => ({
    applications: applications.list,
    currentUser
  }));
  const dispatch = useDispatch();

  const { _id: vacancyId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      vacancyId,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      cv: event.target.cv.value,
    }

    const response = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `${currentUser?.token}`
      },
      body: JSON.stringify(data)
    })
    const parsed = await response.json();

    const notification = parseResponseToNotification(parsed);

    dispatch(set(notification));
    dispatch(setList([...applications, parsed.application]));
  }

  return (
    <>
      <Typography component="h2" variant="h5">Send application</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              required
              fullWidth
              label="Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Phone"
              name='phone'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="CV(Text)"
              name='cv'
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>
      </Box>
    </>
  );
}