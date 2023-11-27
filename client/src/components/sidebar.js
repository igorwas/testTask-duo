import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from '@mui/material';
import { remove } from "../reducers/notification";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const { currentUser } = useSelector(({ currentUser }) => ({
    currentUser
  }));

  return (
    <>
      <ButtonGroup 
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
        sx={{
          width: '100%',
          textAlign: 'left'
        }}>
          <Button><Link to="/vacancies">Vacancies</Link></Button>
          {currentUser?.token && 
            <Button><Link to="/vacancy/new">Add vacancy</Link></Button>
          }
      </ButtonGroup>
    </>
  );
}
