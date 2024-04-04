export const fetchAllCategories = async () => {
  const results = await fetch("https://dummyjson.com/products/categories").then(
    (res) => res.json()
  );
  return results;
};

export const fetchProductsByCategory = async (category : string) => {
  const results = await fetch(
    `https://dummyjson.com/products/category/${category}`
  ).then((res) => res.json());
  return results;
};

export const fetchAllProducts = async () => {
  const results = await fetch("https://dummyjson.com/products?limit=0").then(
    (res) => res.json()
  );
  return results;
};
