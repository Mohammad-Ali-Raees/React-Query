import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Products from './ReactPracticeQuery/Products';
import Product from './ReactPracticeQuery/Product';
import Pagination from './ReactPracticeQuery/Pagination';
import PracticeMutation from './Mutation/PracticeMutation';

const App = () => {
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/products' element={<Products/>} />
      <Route path='/product/:id' element={<Product/>} />
      <Route path='/pagination' element={<Pagination/>} />
      <Route path='/mutationPractice' element={<PracticeMutation/>} />
    </Routes>
    </BrowserRouter>
   
  )
}

export default App