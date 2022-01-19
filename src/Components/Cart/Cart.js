import React, {useEffect, useState} from 'react';

import "./s.css";

import axios from "axios";

export default function Cart() {


  const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem("flowers")));
  
  
  // Get user data after login
  const userData = JSON.parse(localStorage.getItem('data'));


  // Get the stored token
  const token = localStorage.getItem('token');



  


  const remove = (item) => {




    const index = cartItem.indexOf(item);

    const copiedArr = [...cartItem];


    console.log(index);


    copiedArr.splice(index, 1);

    setCartItem(copiedArr);

    localStorage.setItem("flowers", JSON.stringify(copiedArr));

    }


  const pay = async () => {


    try{


    const result = await axios.post(

      "https://flower-sto.herokuapp.com/cart",

      {
        cartItem: cartItem,
        userId: token.userId,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }


    );


    if(result.status == 200){

      alert("Payment is done");

    }



  } catch (error) {


    console.log(error);

  }


  }



  const countItem = (item) => {

    var count = 0;

    for (let index = 0; index < cartItem.length; index++) {

      if(cartItem[index].title === item.title){

        count +=1;
      }
      
    }

    return count;

  }




  return (

<>

      <h2>Cart</h2>

      <table id="table">


      <tbody>

      <tr>
        <th>اسم المنتج</th>
        <th>السعر</th>
        <th>الكمية</th>
      </tr>
              

        {cartItem.map((item) => (



          <tr>
                <td>{item.title}</td>
                <td>{item.price}$ </td>

                <td>{countItem(item)}</td>

                <td><button onClick={() => {remove(item);}}> Remove </button></td>

          </tr>

        ))}





      </tbody>

      <button style={{margin:"16px"}} onClick={() => {pay();}}> Pay </button>

      </table>


      </>
  );


}
