import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const Products = () => {



    let GetAllProducts = async () => {
        let Data = await fetch(`https://dummyjson.com/products`);
        let response = await Data.json();
        return response.products
    }

    const { isLoading, error, data: Products } =
        useQuery({
            queryKey: ['Products'],
            queryFn: GetAllProducts,
            staleTime: 10000
        })


    if (isLoading) {
        return <h3 className="mt-1">Loading....</h3>
    }
    if (error) {
        return <h3>{error.message}</h3>
    }


    return (
        <section className="text-gray-600 body-font">
            <div className="container  py-24 mx-auto">
                <div className="flex flex-wrap ">
                    {
                        Products.map((elem) => {
                            return (
                                <div className="lg:w-1/4 md:w-1/2 p-4 w-full " key={elem.id} style={{ border: "1px solid #DDDDDD" }}>
                                    <a className="block relative h-48 rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={elem.thumbnail} />
                                    </a>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{elem.category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{elem.title}</h2>
                                        <p className="mt-1">{elem.price}</p>
                                    </div>
                                    <Link className="flex  mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" to={`/product/${elem.id}`}>Learn More</Link>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </section>

    )
}

export default Products