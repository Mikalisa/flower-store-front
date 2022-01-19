import React, { Component, useState } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav, Container } from 'react-bootstrap';
import {
    NavLink,
    Routes,
    Route
} from "react-router-dom";



import { useHistory } from "react-router-dom";






function Navi({setState}) {


   const navigate  = useHistory();


 {/* UseState to show and hide the dropdown list*/}
   const [show, setShow] = useState(false);


   const userData = JSON.parse(localStorage.getItem('data'));


   const token = localStorage.getItem('token');




 {/* Show the dropDown list */}
   const showDropdown = (e)=>{
    setShow(!show);
  }

  const hideDropdown = e => {
    setShow(false);
  }



  {/* The output should be True or False*/}
  console.log(show);







  const searchItems = (searchValue) => {

    setState(searchValue); 

  {/* Display the key that the user searched*/}
     console.log(searchValue);

        };
    





const handleClick = async () => {

	
localStorage.removeItem('token');

localStorage.removeItem('data');

navigate.push("/signin");




}





  return (

<>

                <div>
      
                <Navbar className="color-nav" expand="lg">
  <Container fluid>
    <Navbar.Brand href="/">Roses Store</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">

      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll>

        <Nav.Link href="/">Home</Nav.Link>


        { (userData != null && userData.userLevel == "admin") ? (<Nav.Link href="/manage">Admin Page</Nav.Link>): ("")}
        


         <NavDropdown
          id="nav-dropdown-dark-example"
          title="Occasions"
          show={show}
          onMouseEnter={showDropdown} 
          onMouseLeave={hideDropdown}
        >


         <li> <Nav.Link href="/happyBirthday" >Happy Birthday</Nav.Link></li>
         <li> <Nav.Link href="/marriage">Marriage</Nav.Link></li>


          <li> <Nav.Link href="/graduation">Graduation</Nav.Link></li>




          
        </NavDropdown>

            
        {token ? (

        <>
        <Nav.Link onClick={() => { handleClick();}}>Sign out</Nav.Link>
        <Nav.Link href="/cart">Cart</Nav.Link>
        </>

       ) : (

<>

       <Nav.Link href="/signup">SignUp</Nav.Link>
        <Nav.Link href="/signin">SignIn</Nav.Link>





</>

       )}
 
        
      </Nav>

      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => searchItems(e.target.value)}

        />
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
                </div>
                <div>

                
                    
                </div>

    

</>

    );
}


export default Navi;
