import { Box, Button, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { Notification } from "./components/notification";
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from "react";
import { API_BASE } from "./constants";
import { useDispatch } from 'react-redux';
import { set as setCurrentUser, remove as removeCurrentUser } from './reducers/currentUser'
import { Sidebar } from "./components";
import { set } from "./reducers/notification";
import { parseResponseToNotification } from "./utils/resToNotification";

export default () => {
  const { currentUser } = useSelector(({ currentUser }) => ({
    currentUser
  }));

  const dispatch = useDispatch();

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const loginWithToken = async () => {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({token}),
      })
      const parsed = await response.json();
      dispatch(setCurrentUser(parsed));

      localStorage.setItem('accessToken', parsed.token);
    }

    if(token && !currentUser.token){
      loginWithToken()
    }
  }, [])

  const logout = async () => {
    const response = await fetch(`${API_BASE}/logout`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `${currentUser?.token}`
      },
      body: JSON.stringify({ _id: currentUser?._id }),
    })
    const parsed = await response.json();

    const notification = parseResponseToNotification(parsed);

    dispatch(set(notification));
    dispatch(removeCurrentUser());
    localStorage.removeItem('accessToken');
  }

  return (
    <>
      <header>
        <Box sx={{
          width: 'auto',
          padding: '20px', 
          background: 'black',
          color:'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end'
        }}>
          {currentUser?.token ? 
            <>{currentUser.email} <PersonIcon/> <Button variant="text" onClick={logout}>Logout</Button></> : 
            <>
              <Button variant="text"><Link to="/login">Login</Link></Button>
              <Button variant="text"><Link to="/register">Register</Link></Button>
            </>}
        </Box>
      </header>
      <main>
          <Grid container>
            <Grid className='sidebar' item xs={3}>
              <Sidebar />
            </Grid>
            <Grid sx={{ background: 'gray', padding: '20px' }} item xs={9}>
              <Container sx={{
                background: 'white',
                borderRadius: '20px'
              }}>
                <Outlet />
              </Container>   
            </Grid>
          </Grid>
      </main>
      <Notification />
    </>
  );
}