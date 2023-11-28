import React, { useContext } from 'react'
import { Context } from '../main'
import OrderItem from './OrderItem'
import { observer } from 'mobx-react-lite'

const OrderItemList = observer(() => {
	const { pizza } = useContext(Context)
	const items = pizza.cart
	const totalPrice = items.reduce((total, item) => total + item.price, 0)

  return (
	<div className='w-[80%] mx-auto mt-8'>
		<div className='flex items-center justify-between border-b-2 pb-8'>
			<h1 className='text-2xl md:text-3xl font-semibold'>Shopping Cart</h1>
			<p className='text-xl md:text-2xl font-semibold'>
				{items.length > 1
				? `${items.length} Items`
				: `${items.length} Item`}
			</p>
		</div>
		<div>
			{items.map((item, index) => (
				<OrderItem
					key={index}
					items={item}
				/>
			))}
		</div>
		<div className='flex flex-col md:flex-row items-center justify-center gap-4 my-8'>
			<div className='text-xl flex flex-col justify-between md:flex-row items-center border-2 rounded-lg w-60 h-24 py-2 md:py-0 px-4'>
				<span className='font-bold text-lg'>Delivery Price:</span>
				{items.length ? '₴50.00' : '₴0.00'}
			</div>
			<div className='text-xl flex flex-col justify-between md:flex-row items-center border-2 rounded-lg w-60 h-24 py-2 md:py-0 px-4'>
				<span className='font-bold text-lg'>Items Price:</span>
				₴{totalPrice}.00
			</div>
			<div className='text-xl flex flex-col justify-between md:flex-row items-center border-2 rounded-lg w-60 h-24 py-2 md:py-0 px-4'>
				<span className='font-bold text-lg'>Subtotal:</span>
				₴{items.length ? totalPrice + 50 : totalPrice}.00
			</div>
		</div>
		<div>
			<form className='flex flex-col md:flex-row items-center justify-between'>
				<div className='flex flex-col gap-3 mb-4'>
					<input
						type="text"
						required
						placeholder='Enter address...'
						className='text-xl border-2 rounded-lg py-1 px-4'
					/>
					<input
						type="text"
						required
						placeholder='Enter phone number...'
						className='text-xl border-2 rounded-lg py-1 px-4'
					/>
				</div>
				<button className='bg-orange-500 text-white text-xl md:text-2xl uppercase font-semibold hover:bg-orange-500/90 duration-200 rounded-xl py-4 px-8 my-4 md:my-0 md:mb-4'>Checkout</button>
			</form>
		</div>
	</div>
  )
})

export default OrderItemList