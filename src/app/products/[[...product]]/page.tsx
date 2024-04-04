"use client";
import React, { useState, useEffect } from "react";
import { fetchAllProducts, fetchProductsByCategory } from "@/services/products";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { AuroraBackground } from "@/components/ui/aurora-background";
const Page = ({ params }: { params: { product: string } }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let products;
      if (params.product) {
        products = await fetchProductsByCategory(params.product);
      } else {
        products = await fetchAllProducts();
      }

      setProducts(products.products);
    };
    fetchData();
  }, []);

  return (
    products.length > 0 && (
      <AuroraBackground>
        <div className="max-w-5xl mx-auto px-8 p-24">
          <HoverEffect items={products} />
        </div>
      </AuroraBackground>
    )
  );
};

export default Page;
