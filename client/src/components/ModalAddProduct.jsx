import React, { useContext, useState } from 'react'
import { createProducts } from '../http/pizzaAPI'

const ModalAddProduct = () => {
	const [type, setType] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState(null)
	const [notification, setNotification] = useState(null)

	const selectFile = (e) => {
		setFile(e.target.files[0])
	}

	const addProduct = (e) => {
		e.preventDefault()

		const formData = new FormData()

		formData.append('name', type)
		formData.append('description', description)
		formData.append('price', `${price}`)
		formData.append('img', file)

		createProducts(formData)
		.then(() => {
			setNotification('Product added successfully')

			setTimeout(() => setNotification(null), 5000);
		})
		.catch((error) => {
			setNotification('Error adding the product: ' + error.message)

			setTimeout(() => setNotification(null), 5000);

		})
	}

  return (
	<div className='flex items-center justify-center'>
		<div>
			<h1 className='text-xl md:text-2xl font-bold text-center mb-4'>Add Product</h1>
			<form className='flex flex-col gap-3'>
				<select
					value={type}
					onChange={(e) => setType(e.target.value)}
					className='text-xl tracking-wide border-2 p-3 rounded-xl'
				>
					<option value='' disabled>Select type...</option>
					<option value='Drinks'>Drinks</option>
					<option value='Pizza'>Pizza</option>
					<option value='Sushi'>Sushi</option>
				</select>
				<input
					type="text"
					placeholder='Enter description...'
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='text-xl tracking-wide border-2 p-3 rounded-xl'
				/>
				<input
					type="number"
					placeholder='Enter price...'
					required
					value={price}
					onChange={(e) => setPrice(Number(e.target.value))}
					min={1}
					className='text-xl tracking-wide border-2 p-3 rounded-xl'
				/>
				<input
					type="file"
					name='img'
					onChange={selectFile}
				/>
				 <button
                    className='text-lg md:text-xl uppercase font-semibold tracking-wide bg-[#610C9F] hover:bg-[#DA0C81]  text-white rounded-lg py-2 px-14 self-center duration-200 my-4'
					onClick={addProduct}
                  >
                   Add
                  </button>

				  {notification && (
					<p className={`text-xl md:text-2xl text-center mb-4 ${notification.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{notification}</p>
				  )}
			</form>
		</div>
	</div>
  )
}

export default ModalAddProduct