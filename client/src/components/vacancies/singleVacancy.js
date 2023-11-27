import { useEffect } from 'react';
import {  Box, Typography, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { API_BASE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { find } from 'lodash';
import { Applications } from '../applications/applications';
import { ApplicationForm } from '../applications/applicationForm';
import { setList } from '../../reducers/vacancies';

export const SingleVacancy = () => {
  const { vacancies = [], currentUser } = useSelector(({ vacancies, currentUser }) => ({
    vacancies: vacancies.list,
    currentUser
  }));
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vacancy = find(vacancies, { _id });

  useEffect(() => {
    if(!vacancies?.length){
      fetch(`${API_BASE}/vacancies?_id=${_id}`, { 
        headers: 
          { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `${currentUser?.token}`}
      }).then(res => res.json()).then(data => {
  
      if(data?.length){
        dispatch(setList(data));
      }
      })
    }
  }, [currentUser.token])

  const remove = async () => {
    const response = await fetch(`${API_BASE}/vacancies/${_id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `${currentUser?.token}`
      },
    })

    if(response.status == 200){
      navigate('/vacancies')
    }  
  }

  if(!vacancy) { 
    return 
  }

  return (
    <>{vacancy ? 
      <Box>
        {currentUser?.token && <>
          <Button variant="contained" sx={{ mr: 2, mb: 2, mt: 2 }} >
            <Link to={`/vacancies/${_id}/edit`}><EditIcon /></Link> 
          </Button>
          <Button variant="contained" color="error" sx={{ mr: 2, mb: 2, mt: 2  }} onClick={remove}>
            <Link to='#'><DeleteIcon /></Link>
          </Button>
        </>}
        <Typography component="h2" variant="h5">
          {vacancy.title }
        </Typography>
        <p>Created date: {vacancy.createdAt}</p>   
        <p>Short: {vacancy.short_content}</p>
        <p>Whole description: {vacancy.content}</p>
        <hr />
        <ApplicationForm />
        <Applications />
      </Box> : 
      <Typography component="h1" variant="h5">Vacancy not found</Typography>}
    </>  
  );
}