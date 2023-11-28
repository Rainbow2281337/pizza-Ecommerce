import React, { useContext, useEffect } from 'react'
import TypeBar from '../components/TypeBar'
import PriceFilter from '../components/PriceFilter'
import ItemsList from '../components/ItemsList'
import { observer } from 'mobx-react-lite'
import { Context } from '../main'
import { fetchProducts } from '../http/pizzaAPI'

const Shop = observer(() => {
  const { pizza } = useContext(Context)

  useEffect(() => {
    fetchProducts().then(data => pizza.setPizzas(data))
  }, [])

  return (
    <div>
        <div>
          <div className='mt-6'>
              <TypeBar />
          </div>

          <div>
            <PriceFilter />
          </div>

          <div className='w-[80%] mx-auto'>
            <div className='mt-8'>
              <ItemsList />
            </div>
          </div>

        </div>
    </div>
  )
})

export default Shop