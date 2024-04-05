"use client";
import React, { useState, useEffect } from "react";
import { fetchAllProducts, fetchProductsByCategory } from "@/services/stripe";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Stripe from "stripe";



const Page = ({ params }: { params: { category: string } }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let products : any
      if (params.category) {
        products = await fetchProductsByCategory(params.category);
        console.log(products)
      } else {
        products = await fetchAllProducts();
        console.log(products)
      }

      setProducts(products.data);


    };
    fetchData();
  }, []);

  return (
    products.length > 0 && (
     
        <div className="max-w-5xl mx-auto px-8 p-24">
          <HoverEffect items={products} />
        </div>
     
    )
  );
};

export default Page;
