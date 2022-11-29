import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { GROUP_HEADER } from './../constant/header';
import { useNavigate } from 'react-router-dom';

export default function Groups() {

  //fakeData
  const data = [
    {
      _id: '1',
      name: 'Ae bet thủ',
      owner: 'hehe', //uerName
    },
    {
      _id: '2',
      name: 'Ae bet thủ',
      owner: 'hehe', //uerName
    },
    {
      _id: '3',
      name: 'Ae bet thủ',
      owner: 'hehe', //uerName
    },
    {
      _id: '4',
      name: 'Ae bet thủ',
      owner: 'hehe', //uerName
    },
    {
      _id: '5',
      name: 'Ae bet thủ',
      owner: 'hehe', //uerName
    },
    {
      _id: '6',
      name: 'Ae bet thủ',
      owner: 'hehe', //uerName
    },
    {
      _id: '7',
      name: 'Ae bet thủ',
      owner: 'hehe', //uerName
    },
  ]
  const navigate = useNavigate()

  const handleChooseDetail = (id) => {
    navigate(`/groups/${id}`)
  }

  return (
    
    <Box
      component="main"
    >
      <Table>
        <TableHead>
          <TableRow> 
            {
              GROUP_HEADER.map((header) => (
                <TableCell sx={{fontWeight: '900'}}>
                  {
                    header.name
                  }
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(da => (
              <TableRow onClick={() => handleChooseDetail(da._id)}>
                <TableCell>
                  {
                    da.name
                  }
                </TableCell>
                <TableCell>
                  {
                    da.owner
                  }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Box>
  );
}
