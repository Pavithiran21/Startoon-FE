import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import { API } from '../Utils/Apiroute';


export const SignIn = () => {
    const validate = yup.object({
        email: yup.string().email("Email is invalid").required("Email is required"),
        password: yup.string().min(5, "Password must be at least 6 characters").required("Password is required"), 
      });
    
      const Navigate = useNavigate();
    
      const SubmitHandler = async (data) => {
        try {
          let response = await axios.post(`${API}/api/users/login`, data);
          console.log(response);
          
          if (response.data.status) {
            
            
            // Store token and username in local storage
            window.localStorage.setItem('token', response.data.user_token);
    
            if (response.data.data.isAdmin){
              console.log(response.data.data.isAdmin);
              toast.success('Admin Logged In Successfully');
              Navigate('/home');
            } else if(!response.data.data.isAdmin){
              toast.success('User Logged In Successfully');
              Navigate('/');

            }
            
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong. Please check it");
        }
      };
    
      return (
        <>
        <Container fluid className='bg-main justify-content-center  align-items-center d-flex'>
        
          <Row>
          <h1 className="text-white text-center">Employee Details</h1>
          
            <Col>
            
            
              <div>
                
              
                
           
                <Formik 
                  initialValues={{ email:'', password:''}}
                  validationSchema = {validate}
                  onSubmit = {values =>{
                  console.log(values);
                  let data = {
                    
                    email:values.email,
                    password:values.password,
                  };
                  SubmitHandler(data);
                  }}
                >
                {({ errors, touched  }) => (
                  <Form className="form-value form-group">
                  <h2 className="text-center">SIGN IN</h2>
  
                  <div className="form-group">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      placeholder="Enter the Email"
                      required
                    />
                    {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
  
                  <div className="form-group">
                    <label>Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                      placeholder="Enter the Password"
                      required
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
  
                 
  
                 
                  <div className="text-center">
                    
                    <Button variant="primary" type='submit' className='m-2'>Submit</Button>
                    <Button variant='warning' type='reset' className=''>Reset</Button>
                    
                  </div>
  
                  <p className="text-center">
                    Not Registered? <a href="/sign-up" className="success" style={{textDecoration:"none"}}>Click here to Sign Up</a>
                  </p>
                 </Form>
                )}
                
  
                
                </Formik>
  
              </div>
             
            </Col>
            <Col>
            <div className='bg-white form-value  text-center m-5'>
                <p>Admin and User Credetionals</p>
                <p><b> For Admin</b>:
                 <p>Email:admin@12gmail.com</p>
                 <p>Password:12345</p>
                
                </p> 
                 
          </div>
            </Col>
          </Row>
         
  
        </Container>
      </>




       
    );
}
