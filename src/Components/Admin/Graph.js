import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AdminNavbar } from './AdminNavbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../Utils/Apiroute';

export const UserCountGraph = () => {
    
  const [totalUsers, setTotalUsers] = useState();
  const [totalClicks, setTotalClicks] = useState();
  const [lastLoginDate, setLastLoginDate] = useState('');
  const [chartData, setChartData] = useState([]);


  const fetchDashboardData = () => {
    axios
      .get(`${API}/api/users/admin-home`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      })
      .then((response) => {
        const { totalUsers, totalClicks,lastLoginDate  } = response.data.data;
        console.log(response.data.data)
        
        
        setTotalUsers(totalUsers);
        setTotalClicks(totalClicks);
        setLastLoginDate(lastLoginDate)
        const chartDataArray = [
          { name: 'Total Users', count: totalUsers },
          { name: 'Total Clicks', count: totalClicks },
           // Add monthly data if needed
        ];

        if (lastLoginDate) {
          chartDataArray.push({ name: 'Last Login Date', date: lastLoginDate }); // Add last login date to chart data
        }
        setChartData(chartDataArray);
        
        toast.success("Admin Dashboard shown  Successfully")
      })
      .catch((error) => {
        console.error(error);
        toast.error("Admin Dashboard are not Shown. Please try to connect it.....")
      });
  };

  
  useEffect(() => {
    fetchDashboardData();
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
         <Row className='text-center'>
          <Col sm={6} className='m-auto p-3'>
            <Card>
              <Card.Body>
                <Card.Title>
                  <div>
                   <h5>Total Users Count</h5>
                  </div>
                </Card.Title>
                <Card.Text>
                 <span style={{fontSize:"45px"}} className='text-warning'><b>{totalUsers}</b></span>
                </Card.Text>
              </Card.Body>
            </Card>
            
          
          </Col>
          <Col sm={6} className='m-auto p-3'>
            <Card>
              <Card.Body>
                <Card.Title>
                  <div>
                   <h5>Total Click Counts</h5>
                  </div>
                </Card.Title>
                <Card.Text>
                 <span style={{fontSize:"45px"}} className='text-success'><b>{totalClicks}</b></span>
                </Card.Text>
              </Card.Body>
            </Card>
            
          
          </Col>
          
           
            
         

        </Row>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="click" tickFormatter={formatDOB(lastLoginDate)} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

         </Container>
        </>
        
        
          
        
        
      );
    
    
};


