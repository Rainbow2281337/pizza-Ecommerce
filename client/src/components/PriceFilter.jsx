import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { Context } from '../main'

const PriceFilter = observer(() => {
	const { pizza } = useContext(Context)

	const handleClickFilterPrice = (priceFilter) => {
		pizza.setPriceFilter(priceFilter)
	}

  return (
	<div>
		<ul className='flex items-center justify-center mt-4'>
			<li
				className='font-semibold tracking-wide cursor-pointer hover:text-orange-500 duration-200'
				onClick={() => handleClickFilterPrice('expensive')}
				title='From expensive to cheap'
			>
					<AiOutlineArrowDown size={35} />
			</li>
			<li
				className='font-semibold tracking-wide cursor-pointer hover:text-orange-500 duration-200'
				onClick={() => handleClickFilterPrice('cheap')}
				title='From cheap to expensive'
			>
					<AiOutlineArrowUp size={35} />
			</li>
		</ul>
	</div>
  )
})

export default PriceFilter