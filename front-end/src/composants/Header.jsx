import React from 'react'
import logo from '../images/logo-noir.png'


export default function Header(props) {

  return (
    
    <div className='header'>
      <img className="logo" src={logo} alt="logo" />
    </div>
  )
}
