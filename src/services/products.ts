import { Product } from "../types/types";

export const fetchAllCategories = async () => {
  const results = await fetch("https://dummyjson.com/products/categories").then(
    (res) => res.json()
  );
  return results;
};


export const fetchAllProductsLimit = async (): Promise<any> => {
  const limit = 20;
  const totalProducts = 100;
  const fetchPromises = [];

  for (let skip = 0; skip < totalProducts; skip += limit) {
    fetchPromises.push(fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`));

  }
  return Promise.all(fetchPromises)
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(data => {
    const products: Product[] = data.flat(); 
    return products;
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    throw error; 
  });

}