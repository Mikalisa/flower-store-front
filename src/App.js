import React, { useEffect, useState } from "react";
import {Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/SignUp/Login';
import Navi from "./Components/Navbar/Navi";


import HappyBirthday from "./Components/Ocassions/Birthday";
import Marriage from "./Components/Ocassions/Marriage";


import Graduation from "./Components/Ocassions/Graduation";


import AdminPage from "./Components/Admin/AdminPage";



import Cart from "./Components/Cart/Cart";



export default function App() {



  const [token, setToken] = useState("");


  {/* useState to store the key search, so it can be passed to another page*/}
  const [searchedItem, setSearchedItem] = useState("");



   {/* useState to store the cart items*/}
   const [cartItem, setCartItem] = useState([]);







  return (

    
    <div>

      {/* Store the token after recieve it.*/}
      <Navi token={token} setToken={setToken} setState={setSearchedItem} />




    {/* Route for home page that contains the roses.*/}
      <Route
        exact
        path="/"
        render={() => {
        {/* Pass the token and key search*/}
          return <Home token={token} item={searchedItem} setCartItem={setCartItem}/>;
        }}

      />



     <Route   exact path="/signup" component={SignUp} />


     {/* After sign in (Log In) the token recieved from the back end will be set, so other routes can use it. (Second step) */}
     <Route
        exact
        path="/signin"
        render={() => {
          {/* set the token using setToken */}
          return <Login setToken={setToken} />;
        }}
      />



      <Route
        exact
        path="/happyBirthday"
        render={() => {
        {/* Pass the token and key search*/}
          return <HappyBirthday item={searchedItem}/>;
        }}
      />



      <Route
        exact
        path="/marriage"
        render={() => {
        {/* Pass the token and key search*/}
          return <Marriage item={searchedItem}/>;
        }}
      />


      <Route
        exact
        path="/graduation"
        render={() => {
        {/* Pass the token and key search*/}
          return <Graduation item={searchedItem}/>;
        }}
      />


      <Route
        exact
        path="/manage"
        render={() => {
        {/* Pass the token and key search*/}
          return <AdminPage token={token} />;
        }}
      />
      
      
      <Route
        exact
        path="/cart"
        render={() => {

          return <Cart token={token}/>;

        }}

      />

   
    </div>
  );
}

