import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../main'
import Item from './Item'

const ItemsList = observer(() => {
	const { pizza } = useContext(Context)
	const filteredPizzas = pizza.filterByType()

  return (
	<div>
		<div className='grid grid-cols-1 md:grid-cols-2 md:justify-items-center lg:grid-cols-3 gap-3 mb-8'>
			{filteredPizzas.map((product, index) => (
				<Item
					key={index}
					products={product}
				/>
			))}
		</div>
	</div>
  )
})

export default ItemsList