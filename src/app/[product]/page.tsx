"use client";
import React, { useState, useEffect } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { motion } from "framer-motion";
import { fetchDefaultPriceById, makePayment } from "@/services/stripe";
import Stripe from "stripe";
const Page = ({
  searchParams,
}: {
  searchParams: { itemJSON: string };
}) => {
  const [price, setPrice] = useState<Stripe.Price | null>(null)

  let item : any;
  if (searchParams.itemJSON) {
    try {
      item = JSON.parse(searchParams.itemJSON);
    } catch (error) {
      console.error("Error parsing itemJSON:", error);
    }
  }

  const images = item.images.slice(1, -1);

  // price of product
  useEffect(()=> {
    const fetchPriceData = async () => {
      const priceId = item.default_price;
      const data = await fetchDefaultPriceById(priceId);
      setPrice(data)
    }
    fetchPriceData();
  },[])
  console.log(item);
  console.log(price)


  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (price) {
      const data = await makePayment(price.id);
      window.location.assign(data as string)
    }
    
  }


  return item && price && (
    <div className="flex min-h-screen  mx-auto px-8 pt-24 mt-10">
      <ImagesSlider className="h-[50rem]" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            {item.name}
          </motion.p>
          <p>{item.description}</p>
      
            <button onClick={handlePayment} className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
              <span>Buy Now for ${(price?.unit_amount ?? 0)/100} →</span>
              <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
            </button>
         
        </motion.div>
      </ImagesSlider>
    </div>
  );
};

export default Page;
