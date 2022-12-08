import React from 'react'
import logo from '../images/logo-noir.png'
import Nav from './Nav'


export default function Header(props) {

  return (

    <header className='header d-flex flex-wrap justify-content-center align-items-center'>
<div className="container-fluid">
      <img className="logo mt-3"  src={logo} alt="logo" />
    <Nav/>
    </div>
    </header>
  )
}
