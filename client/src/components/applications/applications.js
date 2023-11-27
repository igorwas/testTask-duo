import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE } from '../../constants'
import { setList } from "../../reducers/applications";
import { set } from "../../reducers/notification";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Typography } from "@mui/material";
import { parseResponseToNotification } from "../../utils/resToNotification";
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useParams } from "react-router-dom";

export const Applications = ({}) => {
  const { applications = [], currentUser } = useSelector(({ applications, currentUser }) => ({
    applications: applications.list,
    currentUser
  }));

  const dispatch = useDispatch();

  const { _id: vacancyId } = useParams();

  useEffect(() => {
    fetch(`${API_BASE}/applications/?vacancyId=${vacancyId}`, { 
      headers: 
        { 
          "Authorization": `${currentUser?.token}`},
    }).then(res => res.json()).then(data => {

     if(data?.length){
      dispatch(setList(data));
     }
    })

    return () => {
      dispatch(setList([]));
    }
  }, [currentUser?.token])

  const remove = async ( _id ) => {
    const response = await fetch(`${API_BASE}/applications/${_id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `${currentUser?.token}`
      },
    })

    const parsed = await response.json();

    const notification = parseResponseToNotification(parsed);

    dispatch(set(notification));
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 200
    },
    {
      field: 'cv',
      headerName: 'CV',
      width: 200
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200
    },
  ];

  if(currentUser?.token){
    columns.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={()=>{ remove(id) }}
            color="inherit"
          />,
        ];
      },
    })
  }

  return (
    <>{currentUser?.token && 
      <>
        <Typography component="h2" variant="h5">Applications</Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={applications?.map(u=>({...u, id: u._id}))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
      </>}
    </>
  )
}
