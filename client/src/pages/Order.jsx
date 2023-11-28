import React from 'react'
import OrderItemList from '../components/OrderItemList'
import { observer } from 'mobx-react-lite'

const Order = observer(() => {
  return (
    <div>
      <OrderItemList />
    </div>
  )
})

export default Order