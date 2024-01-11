import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSideBar from './MobileSidebar'

const Navbar = () => {
  return (
    <div className='flex items-center p-4'>
        <MobileSideBar/>
        <div className='flex justify-end w-full'>
            {/* <UserButton afterSignOutUrl='/'/> */}
        </div>
    </div>
  )
}

export default Navbar