import React, { useState } from "react";
import * as FaIcons from "react-icons/fa"
import * as AIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSideBar = () => setSidebar(!sidebar);
    return (
        <>
            <IconContext.Provider value={{ color: '#white' }}>
                <div className="navbar">
                    <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSideBar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSideBar}>
                        <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
