import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const PracticeMutation = () => {

    const mutation = useMutation({
        mutationFn: (newTodo) => {
            return axios.post('https://dummyjson.com/posts/adds', newTodo)
        }
    })

    // const { data } = useQuery({
    //     queryKey: ['Todos'],
    //     queryFn: async () => {
    //         const data = await fetch(`https://dummyjson.com/posts/2`).then(elem => elem.json());
    //         return data;
    //     }
    // })
    // console.log(data);

    const CreateNewPost = () => {

        const data = {
            title: 'I am in love with someone.',
            userId: 115,
        }

        mutation.mutate(data);

    }










    return (



        <div className=" flex  flex-col">
            PracticeMutation
            <div className='justify-center'>
                <button onClick={CreateNewPost} className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                    Add Post
                </button>
            </div>

            {/* Conditionally render the success message */}
            {mutation.isSuccess && (
                <p>Todo Added</p>
            )}

            {/* Other conditional renders for mutation states */}
            {mutation.isPending && (
                <p>Pending Todo...</p>
            )}
            {mutation.isError && (
                <p style={{ color: "red" }} onClick={() => mutation.reset()}>
                    {mutation.error.message || 'An error occurred. Click to reset.'}
                </p>
            )}




        </div>
    )
}

export default PracticeMutation