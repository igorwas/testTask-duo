import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { API_BASE } from '../constants';
import { useDispatch } from 'react-redux';
import { set } from '../reducers/notification'
import { set as setCurrentUser } from '../reducers/currentUser'
import { parseResponseToNotification } from '../utils/resToNotification'
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.email.value,
      email: event.target.email.value,
      password: event.target.password.value
    }

    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
    })

    const parsed = await response.json();
    const notification = parseResponseToNotification(parsed);

    dispatch(set(notification));
    dispatch(setCurrentUser(parsed));

    localStorage.setItem('accessToken', parsed.token);

    if(response.status == 200){
      navigate('/')
    }  
  }

return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          paddingTop: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}