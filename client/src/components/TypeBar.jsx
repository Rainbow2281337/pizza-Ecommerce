import { observer } from 'mobx-react-lite'
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../main'
import { CiPizza } from "react-icons/ci";
import { BiSushi } from "react-icons/bi";
import { GiWaterFlask } from "react-icons/gi";
import { MdOutlineFilterListOff } from "react-icons/md";

const TypeBar = observer(() => {
	const { pizza } = useContext(Context)
	const [isFixed, setIsFixed] = useState(false);

	const handleTypeClick = (type) => {
		pizza.setSelectedType(type)
	}

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;

			setIsFixed(offset > 0);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

  return (
	<div className={`${isFixed ? 'w-full fixed top-0 bg-white p-4 border-b-2' : ''}`}>
		<ul className='flex flex-wrap items-center justify-center mt-3 gap-2'>
			<li
				className='flex items-center gap-2 text-xl md:text-2xl lg:text-3xl uppercase font-semibold tracking-wide cursor-pointer hover:bg-orange-500 hover:text-white rounded-full py-1 px-4 duration-200 '
				onClick={() => handleTypeClick('All')}
			>
				<MdOutlineFilterListOff />
				All
			</li>
			<li
				className='flex items-center gap-2 text-xl md:text-2xl lg:text-3xl uppercase font-semibold tracking-wide cursor-pointer hover:bg-orange-500 hover:text-white rounded-full py-1 px-4 duration-200 '
				onClick={() => handleTypeClick('Pizza')}
			>
				<CiPizza />
				Pizza
			</li>
			<li
				className='flex items-center gap-2 text-xl md:text-2xl lg:text-3xl uppercase font-semibold tracking-wide cursor-pointer hover:bg-orange-500 hover:text-white rounded-full py-1 px-4 duration-200'
				onClick={() => handleTypeClick('Sushi')}
			>
				<BiSushi />
				Sushi
			</li>
			<li
				className='flex items-center gap-2 text-xl md:text-2xl lg:text-3xl uppercase font-semibold tracking-wide cursor-pointer hover:bg-orange-500 hover:text-white rounded-full py-1 px-4 duration-200'
				onClick={() => handleTypeClick('Drinks')}
			>
				<GiWaterFlask />
				Drinks
			</li>
		</ul>
	</div>
  )
})

export default TypeBar