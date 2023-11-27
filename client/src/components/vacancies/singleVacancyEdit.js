import * as React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { API_BASE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { find } from 'lodash';
import { parseResponseToNotification } from '../../utils/resToNotification';
import { set } from '../../reducers/notification';

export const SingleVacancyEdit = () => {
  const { vacancies = [], currentUser } = useSelector(({ vacancies, currentUser }) => ({
    vacancies: vacancies.list,
    currentUser
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id } = useParams();

  const vacancy = find(vacancies, { _id });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: event.target.title.value,
      short_content: event.target.short_content.value,
      content: event.target.content.value
    }
    const method = _id ? 'PUT' : "POST";
    const response = await fetch(`${API_BASE}/vacancies${_id ? `/${_id}` : ''}`, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `${currentUser?.token}`
      },
      body: JSON.stringify(_id ? {...data, _id } : data)
    })
    const parsed = await response.json();

    const notification = parseResponseToNotification(parsed);

    dispatch(set(notification));

    if(!_id){
      navigate(`/vacancies`)
    } else {
      navigate(`/vacancies/${_id}`)

    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            required
            fullWidth
            label="Title"
            autoFocus
            defaultValue={vacancy?.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Short content"
            name='short_content'
            defaultValue={vacancy?.short_content}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Content"
            name='content'
            defaultValue={vacancy?.content}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {_id ? 'Edit' : 'Create'}
      </Button>
  </Box>
  );
}