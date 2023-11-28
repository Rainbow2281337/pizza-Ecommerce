import React, { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { fetchOneProduct } from '../http/pizzaAPI'

const ItemPage = () => {
  const [item, setItem] = useState([])
  const { id } = useParams()
  const [count, setCount] = useState(1)

  useEffect(() => {
    fetchOneProduct(id).then(data => setItem(data))
  }, [])

  return (
	<div className='w-[80%] mx-auto'>
    <div className='flex flex-col md:flex-row items-center justify-center gap-12 min-h-[100vh]'>
      <div className='flex flex-col'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider self-center'>{item.name}</h1>
        <p className='md:text-xl text-gray-600 font-semibold w-[80%] mx-auto my-6'>{item.description}</p>
        <div className='flex flex-col md:flex-row items-center gap-6 w-[80%] mx-auto mt-4'>
          <button className='bg-orange-500 shadow-lg shadow-orange-500 hover:bg-orange-500/90 duration-200 text-white text-lg font-semibold py-2 px-8 rounded-full cursor-pointer'>Add to Cart</button>
          <div className='flex items-center gap-3 text-lg font-bold bg-[#f5f5f5] rounded-full py-1 px-4'>
            <AiOutlinePlus size={25} onClick={() => setCount(count + 1)} className='cursor-pointer' />
            {count === 0 ? setCount(1) : count}
            <AiOutlineMinus size={25} onClick={() => setCount(count - 1)} className='cursor-pointer' />
          </div>
          <p className='text-2xl md:text-3xl'>₴{count === 1 ? item.price : item.price * count}</p>
        </div>
      </div>
      <div className='mt-8 md:mt-0'>
        <img src={import.meta.env.VITE_REACT_APP_API_URL + item.img} alt={item.name} />
      </div>
    </div>
  </div>
  )
}

export default ItemPage