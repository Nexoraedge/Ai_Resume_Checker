import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='navbar max-w-[1200px] mx-auto'>
        <Link to="/">
        <p className='text-2xl font-semibold text-gradient'>Resumind</p>
        </Link>
        <Link to="/upload">
        <p className='primary-button w-fit'>
          Upload Resume
        </p>
        </Link>

    </nav>
  )
}

export default Navbar