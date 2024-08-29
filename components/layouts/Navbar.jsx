import React from 'react'
import { Button } from '../ui/button'
import { AudioLines } from 'lucide-react'

const Navbar = () => {
    return (
        <div className='w-full'>
            <div className='w-full text-center py-3 px-6 md:px-20 bg-rose-200 text-sm'>Flat 15% off on premium plans 🎉</div>
            <nav className='flex items-center justify-between w-full h-16 px-6 md:px-20'>
                <div className='p-4 flex items-center gap-2'><AudioLines /> Suno.ai</div>
                <div className='hidden md:flex items-center gap-8'>
                    <Button variant="link" className='rounded-full px-6'>Home</Button>
                    <Button variant="link" className='rounded-full px-6'>About</Button>
                    <Button variant="link" className='rounded-full px-6'>Pricing</Button>
                </div>
                <div className='flex items-center gap-4'>
                    <Button variant="link" className='rounded-full px-6'>Sign In</Button>
                    <Button className='hidden md:flex rounded-full px-6'>Sign Up</Button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar