/*
    Ensure that Stripe product catalog is empty first before populating.
    Run commands to populate product catalog in Stripe :
    tsc stripe.ts
    node stripe.js
*/
require('dotenv').config({path : '../../.env'})

import Stripe from 'stripe'

import { fetchAllProductsLimit } from '../services/products';
import { Product } from '../types/types';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

const addProductsToStripe = async () => {
  
    // Returns products in batches of 20
    const productsLimit = await fetchAllProductsLimit(); 

    for (const productsData of productsLimit) {
        try {
            const { products } = productsData;
            // Formatting to Product object
            const stripeProducts = products.map((product : Product)=> ({
                id : product.id,
                name : product.title,
                default_price_data : {
                    currency : 'SGD',
                    unit_amount  : product.price * 100
                },
                images : product.images,
                description : product.description,
                metadata : {
                    category : product.category,
                    brand : product.brand,
                    thumbnail : product.thumbnail
                }
            }))
            
            // Populate 20 products to Product catalog
            for (const product of stripeProducts) {
                await stripe.products.create(product)
            }
            console.log('Successfully populated 20 batches')
        } catch (error : any) {
            console.log('Failed to populate 20 batches.' , error)
        }
       

    }
}

addProductsToStripe()