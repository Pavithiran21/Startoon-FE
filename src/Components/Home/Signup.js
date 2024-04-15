import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axios from 'axios';

import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API } from '../Utils/Apiroute.js';


export const Signup = () => {
  
    const validate = yup.object({
        name: yup.string().min(6, "Please enter a valid username").required("Username is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        password: yup.string().min(5, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
        gender: yup.string().required("Gender is required.Select Anyone!!!")
    });
    
    const Navigate = useNavigate();
    
    const SubmitHandler = async (data) => {
        try {
            let response = await axios.post(`${API}/api/users/register`, data);
          
            if(response.data.status){
                toast.success("User registered successfully. Please Check the mail to activate account");
                console.log(response.data);
                Navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please check it");
        }
    };
    
    
    return (
        <Container fluid className='bg-main d-flex justify-content-center align-items-center'>
            <Row>
                <Col>
                    <h1 className='text-white text-center'>Employee Details</h1>
                    <div>
                        <Formik 
                            initialValues={{
                                name:'',
                                email:'',
                                password:'',
                                confirmPassword:'',
                                gender: ''
                            }}
                            validationSchema={validate}
                            onSubmit={values => {
                                console.log(values);
                                SubmitHandler(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="form-value form-group">
                                    <h2 className="text-center">SIGN UP</h2>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <Field
                                            name="name"
                                            className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder="Enter the Name"
                                            required
                                        />
                                        {errors.name && touched.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
                                        )}
                                    </div>
    
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
    
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <Field
                                            name="confirmPassword"
                                            type="password"
                                            className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                                            placeholder="Enter the Confirm Password"
                                            required
                                        />
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                        )}
                                    </div>
    
                                    


                                    <div className="form-group row">
                                        <label className='col-sm-2 col-form-label mt-3'>Gender:</label>
                                        <div className="col-sm-10 p-4">
                                            <div className="form-check form-check-inline">
                                            <Field
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                className={`form-check-input ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                                            />
                                            <label className="form-check-label ">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                            <Field
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                className={`form-check-input ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                                            />
                                            <label className="form-check-label">Female</label>
                                            </div>
                                            {errors.gender && touched.gender && (
                                            <div className="error">{errors.gender}</div>
                                            )}
                                        </div>
                                    </div>
    

                                    <div className="text-center">
                                        <Button variant="primary" type='submit' className='m-2'>Submit</Button>
                                        <Button variant='danger' type='reset' className=''>Reset</Button>
                                    </div>
    
                                    <p className="text-center">
                                        Already Registered? <a href="/" className="success" style={{textDecoration:"none"}}>Click here to Login</a>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Container>
    );
    
};

