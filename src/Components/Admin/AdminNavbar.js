import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/esm/Container'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

export const AdminNavbar = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };


  
    return (
    
        <>
         
          
          <Navbar collapseOnSelect  bg="danger" variant="danger"   expand="lg" sticky='top'>
                <Container fluid>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav  className="ms-auto">
                      
                      <Nav.Link href="/home"><Button variant='outline-light'>Home</Button></Nav.Link>
                      <Nav.Link href="/admin/graph"><Button variant='outline-light'>Graph</Button></Nav.Link>
                      
                      
                    </Nav>

                   
                  <Nav.Link href="/">
                   <Button variant="outline-light" onClick={handleLogout}>LOGOUT</Button>
                 </Nav.Link>

                 <Form className="d-flex m-2">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
    


                    
                    
                  </Navbar.Collapse>
                </Container>
    
            </Navbar>
        </>
    )
  
}
