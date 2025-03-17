import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
const {fetchProducts, products} = useProductStore();

useEffect(() => {
  fetchProducts();
}, [fetchProducts]);

console.log("Products in store:", products);
const validProducts = Array.isArray(products)
? products.filter(product => product && product._id)
: [];

  return (
    <Container maxW='container.sm' py={12}>
      <VStack spacing={8}>
        <Text 
          fontSize={"30"} 
          fontWeight={"bold"} 
          bgGradient={"linear(to-r, cyan.400, blue.500)"} 
          bgClip={"text"} 
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
        {validProducts.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
        </SimpleGrid>


        {validProducts.length === 0 && (
       <Text fontSize='xl' fontWeight={"bold"} textAlign={"center"} color='gray.500'>
          No products found 😢{" "}
          <Link to="/create">
            <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
              Create a product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;