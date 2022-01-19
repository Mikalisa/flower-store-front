import React, {  useState, useEffect } from 'react';
import Product from './product.js';

import { Row, Col} from "react-bootstrap";

import { useHistory } from "react-router-dom";


import axios from "axios";

const baseURL = "https://flower-sto.herokuapp.com";





export default function Home({item, setCartItem}) {



{/* Create filtered results if a search is done*/}
const [filteredResults, setFilteredResults] = useState([]);


const key = item


const [data, setData] = useState([]);


const navigate = useHistory();




// Get user data after login
const userData = JSON.parse(localStorage.getItem('data'));


// Get the stored token
const token = localStorage.getItem('token');




useEffect(() => {

    axios.get(`${baseURL}/products`).then((response) => {

      setData(response.data);

    });

  }, []);



{/* Check to see if the key search passed proberly */}
console.log(item);







useEffect(() => {


  if (key !== '') {
  {/* Search in the current items, and filter if you find the key passed*/}
    const filteredData = data.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(key.toLowerCase())
    })
    
    setFilteredResults(filteredData)
    console.log(filteredData);
  }


  else{
    setFilteredResults(data);

    console.log(data);
  }

})





const deleteProduct = async (id, index)=>{


	console.log(id);


	const result =  await axios.delete(`https://flower-sto.herokuapp.com/products/${id}`,{

      headers:{authorization: "Bearer " + token},

    });


 

    console.log(result);

    if (result.statusText == "ok"){
      const copiedArr= [...data];
    copiedArr.splice(index,1);
    setData(copiedArr);
    }
}


const editProduct = (id) => {

	console.log(id);

	navigate.push({

		pathname: '/manage',
		state: { detail: id }

		
	})

}


const addCart =  (data)=>{

  


  if(token){

    SaveDataToLocalStorage(data);
  }

  else {

    alert("رجاءا قم بتسجيل الدخول اولا");

  }
}


function SaveDataToLocalStorage(data)
{
    var a = [];

    a = JSON.parse(localStorage.getItem('flowers')) || [];

    a.push(data);

    alert(" الى الكارت"+data.title+" تم اضافة");

    localStorage.setItem('flowers', JSON.stringify(a));
}



console.log(token);

       return (
   <>




<div style={{ display: 'block', padding: 30 }}>


        <Row style={{padding: 50 }}>


{/* Check if key search is not null and greater than 1*/}

{token ? (

(userData != null && userData.length != 0 && userData.userLevel == "admin") ? (

  

  key.length > 1 ? (filteredResults.map((productItem, i) => {
  
  
  
                          return (
                           
                            <Col md={3} >
  
                            <div className="product" >
  
                                  <Product
                                   id = {productItem._id}
                                   i = {i}
  
                                   title={productItem.title}
                                   price = {productItem.price}
                                   img = {productItem.imgLink}
  
  
                                   /* Pass the data to addCart function from the product*/
                                   addToCart={(data) => addCart(data)}
  
  
                                  
  
                                   />
  
  
                                 <button className="btn btn-primary" onClick={() => {  deleteProduct(productItem._id, i); }}> delete </button>
  
                                 <button className="btn btn-primary" onClick={() => {  editProduct(productItem._id); }}> edit </button>
  
  
                             </div>
  
                             </Col>
  
  
                          )
                      })) 
  
                     : 
  
                  (data.map((productItem, i) => {
  
                      return (
                        <Col md={3}>
  
                          <div className="product">
  
                               <Product 
                               
                               title={productItem.title}
                               price = {productItem.price}
                               img = {productItem.imgLink}
  
  
                
  
                               /* Pass the data to addCart function from the product*/
                               addToCart={(data) => addCart(data)}
                   
                               />
  
  
                               <button className="btn btn-primary" onClick={() => {  deleteProduct(productItem._id, i); }}> delete </button>
  
                               <button className="btn btn-primary" onClick={() => {  editProduct(productItem._id); }}> edit </button>
  
  
  
                         </div>
                         </Col>
        
                      )
  
                  }))



) : (


  key.length > 1 ? (

    filteredResults.map((productItem) => {

        return (
         
          <Col md={3} >

          <div className="product" >

                <Product 
                 
                 title={productItem.title}
                 price = {productItem.price}
                 img = {productItem.imgLink}

                 /* Pass the data to addCart function from the product*/
                 addToCart={(data) => addCart(data)}

                 
              
                 />


           </div>

           </Col>


        )
    })
  ) : (

  data.map((productItem) => {

    return (
      <Col md={3}>

        <div className="product">

             <Product 
             
             title={productItem.title}
             price = {productItem.price}
             img = {productItem.imgLink}


             /* Pass the data to addCart function from the product*/
             addToCart={(data) => addCart(data)}

 
             />

       </div>
       </Col>

    )

})
)))

: 

(


  key.length > 1 ? (

    filteredResults.map((productItem) => {

        return (
         
          <Col md={3} >

          <div className="product" >

                <Product 
                 
                 title={productItem.title}
                 price = {productItem.price}
                 img = {productItem.imgLink}

                 addToCart={(data) => addCart(data)}
                 
              
                 />


           </div>

           </Col>


        )
    })
  ) : (

  data.map((productItem) => {

    return (
      <Col md={3}>

        <div className="product">

             <Product 
             
             title={productItem.title}
             price = {productItem.price}
             img = {productItem.imgLink}
             addToCart={(data) => addCart(data)}

 
             />

       </div>
       </Col>

    )

})
))


}



</Row>

</div>

          </>
    
  );
}