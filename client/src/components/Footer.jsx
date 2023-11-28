import React from 'react'
import {
	AiOutlineClockCircle,
	AiOutlinePhone,
	AiOutlineInstagram,
	AiOutlineFacebook
} from 'react-icons/ai'
import { CiLocationOn } from 'react-icons/ci'

const Footer = () => {
  return (
	<footer className='bg-black/90 text-white'>
		<div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:justify-items-center'>
			<div className='flex flex-col'>
				<h1 className='text-2xl md:text-3xl uppercase font-bold mb-4'>Information</h1>
				<div className='border-orange-500 border-t-2 w-[15%]'></div>
				<p className='text-lg cursor-pointer mt-4'>Delivery and payment</p>
				<p className='text-lg cursor-pointer'>Public offer contract</p>
				<p className='text-lg cursor-pointer'>Privacy Policy</p>
			</div>
			<div className='flex flex-col'>
				<h1 className='text-2xl md:text-3xl uppercase font-bold mb-4'>Follow Us</h1>
				<div className='border-orange-500 border-t-2 w-[15%]'></div>
				<div className='flex gap-4 mt-4'>
					<AiOutlineInstagram size={45} className='hover:bg-[#f00075] duration-200 cursor-pointer px-2 rounded-full' />
					<AiOutlineFacebook size={45} className='hover:bg-[#1778f2] duration-200 cursor-pointer px-2 rounded-full'/>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<h1 className='text-2xl md:text-3xl uppercase font-bold mb-4'>How to find us?</h1>
				<div className='border-orange-500 border-t-2 w-[15%]'></div>
				<div className='flex items-center gap-2 mt-4'>
					<AiOutlineClockCircle size={25} />
					<p className='text-lg uppercase'>Monday - Thursday: 11:00 - 21:00</p>
				</div>
				<div className='flex items-center gap-2'>
					<AiOutlineClockCircle size={25} />
					<p className='text-lg uppercase'>Friday - Sunday: 11:00 - 21:30</p>
				</div>
				<div className='flex items-center gap-2'>
					<CiLocationOn size={25} />
					<p className='text-lg uppercase'>Sumy, Shevchenko 12/3</p>
				</div>
				<div className='flex items-center gap-2'>
					<AiOutlinePhone size={25} />
					<p className='text-lg'>+380501111111</p>
				</div>
			</div>
		</div>
	</footer>
  )
}

export default Footer