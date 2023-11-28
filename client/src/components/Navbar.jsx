import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'
import { NavLink, useNavigate } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { RxHamburgerMenu } from "react-icons/rx";
import {
	AiOutlineLogout,
	AiOutlineUser,
	AiOutlineShoppingCart,
	AiOutlineClose
} from 'react-icons/ai'
import {
	RiArrowDropDownLine,
	RiAdminLine
} from 'react-icons/ri'

const Navbar = observer(() => {
	const { user } = useContext(Context)
	const { pizza } = useContext(Context)
	const [dropdown, setDrowdown] = useState(false)
	const [nav, setNav] = useState(false)
	const navigate = useNavigate()

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
	}

	const handleShowDropdown = () => {
		setDrowdown(!dropdown)
	}

	const handleNav = () => {
		setNav(!nav)
	}

  return (
	<nav className='w-[80%] mx-auto'>
		<div className='flex items-center justify-between pt-4'>
			<div>
				<NavLink to={SHOP_ROUTE}>
					<p className='text-2xl md:text-3xl lg:text-4xl font-bold'>
						Pizza
						<span className='text-orange-500'>Hub</span>
					</p>
				</NavLink>
			</div>
			<div className='hidden md:block'>
				{user.isAuth ?
					<ul className='flex items-center gap-4'>
						<li
							className='flex items-center cursor-pointer relative'
							onClick={handleShowDropdown}
						>
							<AiOutlineUser size={35} />
							<span className='text-lg md:text-xl ml-3'>Hi, User</span>
							{dropdown ? <RiArrowDropDownLine size={25} className='rotate-180 duration-200' /> : <RiArrowDropDownLine size={25} className='duration-200' />}

							{dropdown && (
							<div className='absolute top-full left-0 mt-2 bg-white border border-black rounded-xl shadow-lg'>
								<ul>
									<li
										className='flex items-center gap-2 p-2 hover:bg-orange-500 rounded-t-xl hover:text-white duration-200'
										onClick={() => navigate(ADMIN_ROUTE)}
									>
										<RiAdminLine size={18} />
										<span className='text-lg md:text-xl'>Admin</span>
									</li>
									<li
										onClick={() => logOut()}
										className='flex items-center gap-2 p-2 hover:bg-orange-500 rounded-b-xl hover:text-white duration-200'
									>
										<AiOutlineLogout size={18}  />
										<span className='text-lg md:text-xl'>Logout</span>
									</li>
								</ul>
							</div>
						)}
						</li>

						<li
							onClick={() => navigate(ORDER_ROUTE)}
							className='hover:text-orange-500 duration-200 cursor-pointer relative'
							title='Cart'
						>
							<AiOutlineShoppingCart size={35} />
							<div
								className='absolute top-[-8px] right-[-10px] rounded-full bg-orange-500 text-white px-2'
							>
								{pizza.cart.length ? pizza.cart.length : '0'}
							</div>
						</li>
					</ul>
				:
					<ul className='flex items-center gap-2'>
						<li
							onClick={() => navigate(LOGIN_ROUTE)}
							className='text-xl md:text-2xl lg:text-3xl font-semibold hover:text-orange-500 duration-300 cursor-pointer tracking-wide'
						>
							Sign In
						</li>
					</ul>
				}
			</div>
			<div className='block md:hidden'>
				<RxHamburgerMenu size={30}
					onClick={handleNav}
					className='cursor-pointer'
				/>
			</div>

			{/* mobile navbar */}

			{nav && (
				<div className='fixed top-0 right-0 w-screen h-screen bg-orange-500'>
					<div className='relative'>
						<div className='absolute top-0 right-0 p-2'>
							<AiOutlineClose
								size={30}
								onClick={handleNav}
								className='text-white cursor-pointer'
							/>
						</div>
						<div className='text-center mb-6'>
							<p
								className='text-4xl text-white font-semibold p-4'
							>
								PizzaHub
							</p>
						</div>
						<div className='ml-8'>
							{user.isAuth ?
								<ul className='flex flex-col gap-2'>
									<li
										className='flex items-center gap-2 text-white hover:text-[#000080] cursor-pointer duration-200'
										onClick={() => navigate(ADMIN_ROUTE)}
									>
										<RiAdminLine size={30} />
										<span className='text-3xl'>Admin</span>
									</li>
									<li
										onClick={() => navigate(ORDER_ROUTE)}
										className='flex items-center gap-2 text-white hover:text-[#000080] cursor-pointer duration-200'
									>
										<AiOutlineShoppingCart size={30} />
										<span className='text-3xl'>Cart</span>
									</li>
									<li
										className='flex items-center gap-2 text-white hover:text-[#000080] cursor-pointer duration-200'
									>
										<AiOutlineLogout size={30} />
										<span className='text-3xl'>Logout</span>
									</li>
								</ul>
							:
								<ul>
									<li
										onClick={() => navigate(LOGIN_ROUTE)}
										className='text-xl md:text-2xl lg:text-3xl font-semibold hover:text-orange-500 duration-300 cursor-pointer tracking-wide'
									>
										Sign In
									</li>
								</ul>
							}
						</div>
					</div>
				</div>
			)}
		</div>
	</nav>
  )
})

export default Navbar