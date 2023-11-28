import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../main'

const Auth = observer(() => {
  const navigate = useNavigate()
  const { user } = useContext(Context)
  const location = useLocation()
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLogin = location.pathname === LOGIN_ROUTE

  const click = async (e) => {
    e.preventDefault()

    try {
      let data;

      if (isLogin) {
        data = await login(id, email, password)
      } else {
        data = await registration(id, email, password)
      }

      user.setUser(data)
      user.setIsAuth(true)

      navigate(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
	  <div className='flex justify-center items-center min-h-screen'>
        <div className='w-full md:w-[600px] border-2 border-black rounded-lg p-8 mx-4 md:mx-0'>
          <h2 className='text-xl md:text-2xl font-bold text-center mb-6'>{isLogin ? 'Authorization' : 'Registration'}</h2>
            <form className='flex flex-col gap-3'>
                {!isLogin && (
                  <input
                  type="number"
                  placeholder='Choose ID...'
                  min={1}
                  className='text-xl tracking-wide border-2 p-3 rounded-xl'
                  value={id}
                  onChange={e => setId(e.target.value)}
                />
                )}
                <input
                  type="email"
                  placeholder='Enter email...'
                  className='text-xl tracking-wide border-2 p-3 rounded-xl'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder='Enter password...'
                  className='text-xl tracking-wide border-2 p-3 rounded-xl'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <div className='flex flex-col items-center justify-center py-2'>
                  <button
                    className='text-lg md:text-xl font-semibold tracking-wide bg-orange-500 hover:bg-orange-500/90  text-white rounded-lg py-2 px-14 self-center duration-200'
                    onClick={click}
                  >
                    {isLogin ? 'Login' : 'Registration'}
                  </button>

                 {isLogin ?
                    <div className='mt-2 text-lg tracking-wide font-medium'>
                      Don't have an account? <NavLink className='text-blue-700' to={REGISTRATION_ROUTE}>Registration</NavLink>
                    </div>
                    :
                    <div className='mt-2 text-lg tracking-wide font-medium'>
                      Already have an account? <NavLink className='text-blue-700' to={LOGIN_ROUTE}>Login</NavLink>
                    </div>
                 }
                </div>
            </form>
        </div>
    </div>
  )
})

export default Auth