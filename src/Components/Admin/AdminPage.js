import React, {useState, useEffect} from 'react';

import axios from "axios";


import { useLocation } from "react-router-dom";


export default function AdminPage() {


  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [occasionType, setOccasionType] = useState("");


  const location = useLocation();



  const [id, setId] = useState("");




useEffect( () => {

    if(location.state != null){

    setId(location.state.detail);

  }


  }, []);

  






  // get Item stored in localStorage
  const token = localStorage.getItem('token');



  console.log(title);



  const changeTitle = (e) => {


    setTitle(e);

  }

   const changePrice = (e) => {


    setPrice(e);
    
  }

   const changeImgLink = (e) => {


    setImgLink(e);
    
  }

   const changeOccasionType = (e) => {


    setOccasionType(e);

    
  }


  // Add new product
  const addProducts = async ()=>{


    try{


    const result = await axios.post(

      "https://flower-sto.herokuapp.com/products",

      {
        title: title,
        price: price,
        imgLink: imgLink,
        occasionType: occasionType,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }


    );


    if(result.status == 200){

      alert("Flower was added");

    }



  } catch (error) {


    console.log(error);

  }


  }



  const editProducts = async ()=>{


    try

    {


      console.log(id);

    const result = await axios.put(

      "https://flower-sto.herokuapp.com/products",

      {

        id: id,
        title: title,
        price: price,
        imgLink: imgLink,
        occasionType: occasionType,

      }, {

        headers: { authorization: `Bearer ${token}` },
      }

    );



    console.log(result);



    if(result.status == 200) {

      alert("Flower was edited");

    }





  } catch (error) {

    console.log(error);

  }


  }



  return (

<div style={{margin: "30px"}}>

      

      <table>


      <tbody>
            
              

      <div className="row">



          


<tr>
          <h2>Add Products</h2>
                <td><input placeholder="Title" onChange={ (e) => {changeTitle(e.target.value); }} /></td>

                <td><input placeholder="Price" onChange={ (e) => {changePrice(e.target.value); }} /></td>

          

                <td><input  placeholder="Image Link" onChange={ (e) => {changeImgLink(e.target.value); }} /></td>


                <td><input  placeholder="Occasion Type" onChange={ (e) => {changeOccasionType(e.target.value); }} /></td>



                 <td> <button className="btn btn-primary" onClick= {() => {addProducts();}}> Submit</button> </td>


          </tr>
     
          {id!=null ? (



            <tr>

          <h2>Edit Products</h2>

                <td><input placeholder="Title" onChange={ (e) => {changeTitle(e.target.value); }} /></td>

                <td><input placeholder="Price" onChange={ (e) => {changePrice(e.target.value); }} /></td>

          

                <td><input  placeholder="Image Link" onChange={ (e) => {changeImgLink(e.target.value); }} /></td>


                <td><input  placeholder="Occasion Type" onChange={ (e) => {changeOccasionType(e.target.value); }} /></td>



                 <td> <button className="btn btn-primary" onClick= {() => {editProducts();}}> Submit</button> </td>


          </tr>





            ) : (



            ""




            )}




      </div>


      </tbody>

      </table>
</div>

  );


}
