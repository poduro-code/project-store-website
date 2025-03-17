import { Container, VStack, Heading, Box, useColorModeValue, useToast, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    brand: "",
    category: "",
    countInStock: "",
    rating: "",
    numReviews: "",
  });

const toast = useToast();

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const {success,message} = await createProduct(newProduct);
   if (!success) {
     toast({
       title: "Error",
       description: message,
       status: "error",
       duration: 5000,
       isClosable: true,
     });
   } else { 
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setNewProduct ({
      name: "",
      price: "",
      image: "",
      description: "",
      brand: "",
      category: "",
      countInStock: "",
      rating: "",
      numReviews: "",
    });
  };

  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size={"2xl"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>

        <Box w={"full"} bg={bgColor} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Input
              placeholder='Description'
              name='description'
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <Input
              placeholder='Brand'
              name='brand'
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
            />
            <Input
              placeholder='Category'
              name='category'
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <Input
              placeholder='Count in Stock'
              name='countInStock'
              type='number'
              value={newProduct.countInStock}
              onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
            />
            <Input
              placeholder='Rating'
              name='rating'
              type='number'
              value={newProduct.rating}
              onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
            />    
            <Input
              placeholder='Number of Reviews'
              name='numReviews'
              type='number'
              value={newProduct.numReviews}   
              onChange={(e) => setNewProduct({ ...newProduct, numReviews: e.target.value })}
              />
            
              
               <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;