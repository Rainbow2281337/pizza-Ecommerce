import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { AiOutlineMinus } from 'react-icons/ai'
import { Context } from '../main';

const OrderItem = observer(({ items }) => {
	const [showFullDescription, setShowFullDescription] = useState(false);
	const { pizza } = useContext(Context)

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	}

	const handleDeleteItem = () => {
		pizza.deleteFromCart(items)
	}

	const descriptionToShow = showFullDescription
		? items.description
		: items.description.slice(0, 30) + '...'

  return (
	<div>
		<div className='flex flex-col'>
			<div className='mt-8'>
				<ul className='flex flex-col gap-3 md:flex-row md:gap-0 items-center mb-4 justify-between'>
					<li className='w-[150px] h-[150px]'>
						<img src={import.meta.env.VITE_REACT_APP_API_URL + items.img}  alt={items.name} />
					</li>
					<li className='text-xl md:text-2xl font-medium'>
						{items.name}
					</li>
					<li onClick={toggleDescription} className='text-lg font-medium mx-5 cursor-pointer'>
						{descriptionToShow}
					</li>
					<li className='text-xl md:text-2xl font-medium'>
						₴{items.price}
					</li>
					<li>
						<AiOutlineMinus
							size={25}
							onClick={handleDeleteItem}
							className='text-red-500 cursor-pointer'
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
  )
})

export default OrderItem