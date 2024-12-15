import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Pagination = () => {


    let [SearchParams, SetSearchParams] = useSearchParams();
    
    let skip = Number(SearchParams.get("skip") || 0);
    let limit = Number(SearchParams.get("limit") || 4);
    console.log(skip)

    const optionsSelect = [4, 8, 12]

    // console.log(SearchParams.get('skip'))

    // let [Skip, SetSkip] = useState(0)
    // let [total, settotal] = useState();
    const { data: products } =
        useQuery({
            queryKey: ['Products', skip, limit],
            queryFn: async () => {
                const data = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`) // Get data without loading element 
                // settotal(data.total);
                return data.json();
            },
            placeholderData: keepPreviousData, // keep old data till , when new data will not loaded
            staleTime: 20000
        })
    //console.log(products);


    // For Next Button
    const NextEvent = () => {
        // SetSkip(prev => prev + 4)

        SetSearchParams({ skip: skip + 4, limit: limit });
    }

    // For Previous Button
    const PrviousEvent = () => {
        // if (Skip <= 1) {
        //     Skip = 0
        // } else {
        //     SetSkip(prev => prev - 4)
        //     console.log(Skip)
        // }
        if (skip <= 4) {
            SetSearchParams({ skip: 0, limit: limit });
        } else {
            SetSearchParams({ skip: skip - 4, limit: limit });
        }


    }


    return (
        <>
            <div style={{ margin: "20px" }}  >
                <h5>Select Limit You Want To Show</h5>
                <select onChange={(e) => { SetSearchParams({ limit: e.target.value }) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2">
                    {
                        optionsSelect.map((elem, index) => {
                            return (
                                <option key={index} value={elem}>{elem}</option>
                            )
                        })
                    }

                </select>

            </div>

            <div className='container mx-auto px-4 py-4'>
                <div className='grid grid-cols-4 gap-4 '>

                    {
                        products?.products?.map((elem) => { // Get data when data exists (?.map) shows when data exists then show
                            return (

                                <div className="p-4" key={elem.id} style={{ border: "1px solid #DDDDDD" }}>
                                    <a className="block relative h-48 rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={elem.thumbnail} />
                                    </a>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xl tracking-widest title-font mb-1">{elem.category}</h3>
                                        <h2 className="text-gray-900 title-font text-xl font-medium">{elem.title}</h2>
                                        <p className="mt-1">{elem.price}</p>
                                    </div>
                                </div>

                            )
                        })
                    }

              


                </div>
                <div className="flex space-x-4 mt-5">
                    <button onClick={PrviousEvent} disabled={skip < 4} className="px-8 py-2 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                        Previous
                    </button>
                    <button onClick={NextEvent} className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                        Next
                    </button>

                </div>
            </div>













        </>








    )
}

export default Pagination