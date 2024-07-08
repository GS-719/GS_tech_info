import React from 'react';
import "../styles/Navbar.css";
import Logo from "../../public/LOGO.png";
import Image from 'next/image';
import Link from "next/link";

const Navbar = () => {
    return (
        <>
            <header>
                <Link href="/" className='link'>
                    <div className="logo">
                        <Image src={Logo} className='Logo_img' />
                        <p className='GS_Logo'>GS_tech-info</p>
                    </div>
                </Link>
                <nav>
                    <ul className='ul_tag'>
                        <li className='li_tag'>
                            <Link className='link' href="/">Home</Link>
                        </li>
                        <li className='li_tag'>
                            <Link className='link' href="/AllBlogs">Blogs</Link>
                        </li>
                        <li className='li_tag'>
                            <Link className='link' href="mailto:gstechinfo719@gmail.com">Contact US</Link>
                        </li>
                        <li className='li_tag'>
                            <Link className='link' href="/Privacy">Privacy Policy</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <hr/>
        </>
    )
}

export default Navbar
