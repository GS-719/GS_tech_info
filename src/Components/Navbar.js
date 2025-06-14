'use client';
import React from 'react';
import "../styles/Navbar.css";
import Logo from "@/Img/Logo/LOGO.png";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedMode = localStorage.getItem('theme');
        if (storedMode === 'dark') {
            setDarkMode(true);
        }
    }, []);
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <>
            <hr />
            <header>
                <Link href="/" className='link'>
                    <div className="logo">
                        <Image src={Logo} className='Logo_img' alt='Logo image' />
                        <p className='GS_Logo' >GS Tech Info</p>
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
                    </ul>
                    <button className='drTBtn' aria-label="Toggle dark mode" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? '🌞' : '🌙'}
                    </button>
                </nav>
            </header>
            <hr />
        </>
    )
}

export default Navbar
