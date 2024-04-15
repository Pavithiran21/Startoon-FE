/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { AdminNavbar } from './AdminNavbar';
import { toast } from 'react-toastify';
import { API } from '../Utils/Apiroute';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const EmployeeTable = () => {

  const [Alluser, SetAlluser] = useState([]);
  const Navigate = useNavigate();
  
  const AllUsers = () => {
    axios
      .get(`${API}/api/users/all-users`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.data.status) {
          SetAlluser(response.data.data);
          toast.success('Student List Shown Successfully');
        } else {
          toast.error('Student List cannot be shown. Please check it');
          Navigate('/admin-dashboard');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong. Please check it!');
      });
  };

  useEffect(() => {
    AllUsers();
  }, []);


  const formatDOB = (dobString) => {
    const dob = new Date(dobString);
    const day = dob.getDate().toString().padStart(2, '0');
    const month = (dob.getMonth() + 1).toString().padStart(2, '0');
    const year = dob.getFullYear();

    return `${day}-${month}-${year}`;
  };
  

  return (
    <>
     <AdminNavbar/>
     <Container fluid>
      <Row className='mt-3 p-4'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login Date</th>
              <th>Counts</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {Alluser.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{formatDOB(employee.LastLoginDate)}</td>
                <td>{employee.count}</td>
                <td>{employee.gender}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>


      

     </Container>
    </>
    
  );
};
