import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import {
  AiOutlineUser,
  AiOutlineAppstore,
  AiOutlineMinus,
  AiOutlinePlus
} from 'react-icons/ai'
import { deleteProducts, fetchProducts } from '../http/pizzaAPI'
import { deleteUsers, fetchUsers } from '../http/userAPI'
import { observer } from 'mobx-react-lite'

const ShowModal = lazy(() => import('../components/ModalAddProduct'))

const Admin = observer(() => {
   const [type, setType] = useState('users')
   const [isModal, setIsModal] = useState(false)
   const [items, setItems] = useState([])
   const [users, setUsers] = useState([])

   useEffect(() => {
      fetchProducts().then(data => setItems(data))
      fetchUsers().then(data => setUsers(data))
   }, [])

   const handleClick = (type) => {
      setType(type)
   }

   const handleShowModal = () => {
      setIsModal(!isModal)
   }

   const deleteItem = (id) => {
      deleteProducts(id).then(data => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('Error deleting product:', data);
        }
      })
   }

    const deleteUser = (id) => {
      deleteUsers(id).then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Error deleting user:', data);
        }
      })
   }

  return (
	<div>
    <div className='mt-8 mb-4'>
      <div className='flex flex-wrap items-center justify-center gap-6'>
        <div onClick={() => handleClick('users')} className='flex flex-col items-center bg-[#F05941] hover:bg-[#F05941]/90 duration-200 cursor-pointer rounded-2xl p-4'>
          <AiOutlineUser size={35} className='text-white' />
          <p className='text-white font-bold'>Total of Users</p>
          <p className='text-white font-semibold'>{users.length}</p>
        </div>
        <div onClick={() => handleClick('items')} className='flex flex-col items-center bg-[#BE3144] hover:bg-[#BE3144]/90 duration-200 cursor-pointer rounded-2xl p-4'>
          <AiOutlineAppstore size={35} className='text-white' />
          <p className='text-white font-bold'>Total of Products</p>
          <p className='text-white font-semibold'>{items.length}</p>
        </div>
      </div>
    </div>
    {type === 'users' && (
      <div className='w-[80%] mx-auto mt-8'>
        <h2 className='text-center text-2xl md:text-3xl font-semibold'>Users Information</h2>
        <ul className='w-full mt-6'>
          {users.map(user => (
            <li key={user._id} className='flex flex-col md:flex-row items-center gap-3 my-4 border-b-2 p-3 border-black'>
              <div className='flex-1'>
                <p className='text-xl md:text-2xl'>
                  <span className='font-bold tracking-wider uppercase'>Email</span>
                  : {user.email}
                </p>
              </div>
              <div className='flex-1'>
                <p className='text-xl md:text-2xl'>
                  <span className='font-bold tracking-wider uppercase'>Role</span>
                  : {user.role}
                </p>
              </div>
              <div className='flex-2'>
                <AiOutlineMinus size={25} title='Remove User' onClick={() => deleteUser(user._id)} className='text-red-600 cursor-pointer' />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
    {type === 'items' && (
      <div className='w-[80%] mx-auto mt-8'>
        <h2 className='text-center text-2xl md:text-3xl font-semibold'>Products Information</h2>
        <ul className='w-full mt-6'>
          {items.map(item => (
            <li key={item._id} className='flex flex-col md:flex-row items-center gap-3 my-4 border-b-2 p-3 border-black'>
              <div className='flex-1'>
                <p className='text-xl md:text-2xl'>
                  <span className='font-bold tracking-wider uppercase'>Type</span>
                  : {item.name}
                </p>
              </div>
              <div className='flex-1'>
                <p className='text-xl md:text-2xl'>
                  <span className='font-bold tracking-wider uppercase'>Description</span>
                  : {item.description}
                </p>
              </div>
              <div className='flex-1'>
                <p className='text-xl md:text-2xl'>
                  <span className='font-bold tracking-wider uppercase'>Price</span>
                  : {item.price}
                </p>
              </div>
              <div className='flex-2'>
                <AiOutlineMinus size={25} title='Remove Product' onClick={() => deleteItem(item._id)} className='text-red-600 cursor-pointer' />
              </div>
            </li>
          ))}
          {items.length === 0 ?
            <li className='flex items-center justify-center'>
              <AiOutlinePlus
                onClick={handleShowModal}
                size={35}
                title='Add Product'
                className='text-green-600 cursor-pointer'
              />
            </li>
          :
            <li className='mb-4'>
              <AiOutlinePlus
                onClick={handleShowModal}
                size={35}
                title='Add Product'
                className='text-green-600 cursor-pointer'
              />
            </li>
          }
        </ul>
      </div>
    )}
    {isModal && (
      <Suspense fallback='Loading...'>
        <ShowModal />
      </Suspense>
    )}
  </div>
  )
})

export default Admin