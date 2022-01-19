import { Card } from 'react-bootstrap';




function Product({title, price, img, addToCart}) {

  console.log(price);


  const userData = JSON.parse(localStorage.getItem('data'));

  
  return (
    <Card style={{ width: '18rem' }}>

  <Card.Img variant="top" src={img}/>

  <Card.Body>

    <Card.Title>{title}</Card.Title>

    <Card.Text>

    {price}$
    </Card.Text>

        
  </Card.Body>


  <button onClick={() => {addToCart({"title": title, "price": price, "user": userData._id});}}>
    Add to Cart
  </button>



</Card>
  );
}



export default Product;