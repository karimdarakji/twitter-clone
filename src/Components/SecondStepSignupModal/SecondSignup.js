import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import logo from '../../public/logo.png'
import { Formik} from 'formik';
import * as yup from 'yup';
import '../SignupModal/SignupModal.css'
import axios from 'axios'

export default function SecondSignup(props) {

        const schema = yup.object().shape({
        username: yup.string().required('Invalid username'),
        password: yup.string().required('Required'),

        });
       

        const add_user = (values, {setErrors} ) => {
            const userObject = {
                username: values.username,
                email: props.data.email,
                password: values.password,

            };
    
            axios.post('http://localhost:5000/register/update', userObject)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.errors && res.data.errors.username === "User Name already exists")
                    setErrors({username: "Username already exists"})
                    else if(res.data === '"password" length must be at least 6 characters long')
                    setErrors({password: "Password must be more than 6 characters"})
                    else {
                        props.onHide()
                        props.history.push('/login')
                    }
                }).catch((error) => {
                    console.log(error)
                });
    
        }


        
    
    return (
        <Modal
        {...props}
        
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign:'center', width:'100%'}}>
                    <img src={logo} alt="" style={{width:'40px'}}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding:'8%'}}>
            <h4 style={{fontWeight:'bold'}}>Create your account</h4>
                <Formik
                validationSchema={schema}
                onSubmit={add_user}
                initialValues={{
                    username: '',
                  
                    password:'',
                   
                }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        status,
                        isValid,
                        errors,
                    }) => (
            
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                    
                    <Form.Control
                    className="mt-4 py-4"
                    placeholder="username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                  {errors.username}
                 
                </Form.Control.Feedback>
                </Form.Group>
            

                <Form.Group>
                    
                    <Form.Control
                    className="mt-4 py-4"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                </Form.Group>
               
                <Button disabled={!isValid || values.username.length === 0} type="submit" className="mt-4 py-2" style={{background:'#1da1f2', width:'100%',fontWeight:'bold', borderRadius:'30px'}}>Sign up</Button>

            </Form>
                    )}
            </Formik>
            </Modal.Body>
        </Modal>
    )
}
