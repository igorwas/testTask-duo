import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE } from '../../constants'
import { setList } from "../../reducers/vacancies";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Add as AddIcon } from '@mui/icons-material';;

export const Vacancies = () => {
  const { vacancies = [], currentUser } = useSelector(({ vacancies, currentUser }) => ({
    vacancies: vacancies.list,
    currentUser
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/vacancies`, { 
      headers: 
        { "Authorization": `${currentUser?.token}`}
    }).then(res => res.json()).then(data => {

     if(data?.length){
      dispatch(setList(data));
     }
    })
  }, [currentUser?.token])

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 200
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200
    },
    {
      field: 'short_content',
      headerName: 'Short content',
      width: 200
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200
    },
  ];

  return (
    <>{currentUser?.token &&
      <Button variant="contained" color="success" sx={{ mr: 2, mb: 2, mt: 2 }} >
        <Link to={`/vacancy/new`}><AddIcon color="white"/></Link> 
      </Button>}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={vacancies?.map(u=>({...u, id: u._id}))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[10]}
          onRowClick={ (
            params,
            event,
            details,
          ) => {
            navigate(`/vacancies/${params.id}`)
          }} 
        />
      </Box>
    </>
  )
}
