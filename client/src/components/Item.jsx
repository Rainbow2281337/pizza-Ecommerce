import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { Context } from '../main'
import { ITEM_ROUTE } from '../utils/consts'

const Item = ({ products }) => {
  const navigate = useNavigate()
  const { pizza } = useContext(Context)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    pizza.addToCart(products)
  }

  return (
	<div onClick={() => products._id && navigate(ITEM_ROUTE + '/' + products._id)} className='border-2 hover:border-black duration-200 rounded-2xl w-full'>
    <div className='w-full inline-flex flex-col items-center justify-center gap-4 py-6 px-8 rounded-2xl duration-200 cursor-pointer'>
      <div>
        <img
          src={import.meta.env.VITE_REACT_APP_API_URL + products.img}
          alt={products.name}
          className='w-[250px] h-[250px]'
          loading="lazy"
        />
      </div>
      <div className='flex flex-col items-start'>
        <p
          className='text-xl md:text-2xl lg:text-3xl mb-3 font-semibold self-center'
        >
          {products.name}
        </p>
        <p
          className='text-lg mb-3 font-semibold self-center text-center'
        >
          {products.description}
        </p>
        <p
          className='text-xl md:text-3xl font-semibold self-center'
        >
          ₴{products.price}
        </p>
      </div>
      <div>
        <button
          onClick={(e) => handleAddToCart(e)}
          className='text-xl md:text-2xl py-1 px-6 rounded-2xl font-medium text-white bg-orange-500 hover:bg-orange-500/90 duration-200 cursor-pointer'
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  )
}

export default Item