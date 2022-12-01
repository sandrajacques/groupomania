import React from 'react'
import logo from '../images/logo-noir.png'
import Nav from './Nav'


export default function Header(props) {

  return (

    <header className='header d-flex justify-content-between align-items-center'>
      <img className="logo" src={logo} alt="logo" />
    <Nav/>
    </header>
  )
}
