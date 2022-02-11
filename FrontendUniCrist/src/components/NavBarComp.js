import React, { useState } from 'react';
import { NavbarItems } from './NavbarItems';


//import logo from '../assets/images/logo.png';

export function NavBarComp(props) {
  const [isActive, setisActive] = useState(false)
  const [useAtiva, setAtiva] = useState(props.title)

  return (
    <nav className={`navbarItens ${useAtiva}`} >

      <div className='menu-icon' onClick={() => { setisActive(!isActive) }}>
        <i className={`fas fa-bars ${isActive ? `fas fa-times` : ''}`}></i>
      </div>
      <ul className={`nav-menu ${isActive ? `nav-menu active` : ''}`}>
        {NavbarItems.map((item, index) => {
          return (
            <li key={index}><a className={item.cName} href={item.url}>{item.title}</a></li>
          )
        })}
      </ul>
    </nav>
  )
}