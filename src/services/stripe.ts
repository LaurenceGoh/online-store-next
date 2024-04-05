require('dotenv').config({path : '../../.env'})

import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)

export const fetchAllProducts = async () => {
    const products = await stripe.products.list({limit : 100})
    return products;
}

export const fetchProductsByCategory = async (category : string) => {
    const products = await stripe.products.search({
        query : `active:\'true\' AND metadata[\'category\']:\'${category}\'`
    })
    return products;
}

export const fetchDefaultPriceById = async (priceId : string) => {
    const price = await stripe.prices.retrieve(priceId);
    return price;
}

export const makePayment = async (priceId : string) => {
    

    const session = await stripe.checkout.sessions.create({
        mode : 'payment',
        line_items :[
            {
                price : priceId,
                quantity : 1,
            }
        ],
        success_url : 'http://localhost:3000',
        cancel_url : 'http://localhost:3000',
    })
    return session.url;
}