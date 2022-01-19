import React, {  useState, useEffect } from 'react';
import Product from '../Home/product.js';

import { Row, Col} from "react-bootstrap"


import axios from "axios";


const baseURL = "https://flower-sto.herokuapp.com";



export default  function Marriage(props) {

{/* Create filtered results if a search is done*/}
const [filteredResults, setFilteredResults] = useState([]);


const key = props.item


const [data, setData] = useState([]);



useEffect(() => {
    axios.get(`${baseURL}/products`).then((response) => {




      setData(response.data);


    });

  }, []);


{/* Check to see if the key search passed proberly */}
console.log(props.item);




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

       return (
   <>




<div style={{ display: 'block', padding: 30 }}>


        <Row>
{/* Check if key search is not null and greater than 1*/}
{key.length > 1 ? (

                    filteredResults.map((productItem) => {

                    	if(productItem.occasionType == "Marriage"){

                    		return (
                         
                          <Col md={3}>
                            <div className="product">
                                <Product 
                                 
                                 title={productItem.title}
                                 price = {productItem.price}
                                 img = {productItem.imgLink}
                              
                                 />
                           </div>
                           </Col>

                 
          
                        )



                    	}
                        
                    })
                ) : (
                  data.map((productItem) => {
                    if(productItem.occasionType == "Marriage"){

                    		return (
                         
                          <Col md={3}>
                            <div className="product">
                                <Product 
                                 
                                 title={productItem.title}
                                 price = {productItem.price}
                                 img = {productItem.imgLink}
                              
                                 />
                           </div>
                           </Col>

                 
          
                        )



                    	}
                        
                })
                )}

</Row>

</div>

          </>
    
  );
}
