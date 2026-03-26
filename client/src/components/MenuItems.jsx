import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({setSidebarOpen}) => {

  return (
    <div className='px-6 text-[#6C757D] space-y-1 font-medium'>
        {
            menuItemsData.map(({to, label, Icon}) => (
                <NavLink key={to} to={to} end={to === '/'} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `px-3.5 py-2 flex items-center gap-3 rounded-lg ${isActive ? 'bg-[#1A4E8A]/10 text-[#1A4E8A]' : 'hover:bg-gray-50'}`} >
    
                    <Icon className='w-5 h-5' />
                    {label}

                </NavLink>
            ))

        }

    </div>
  )
}

export default MenuItems