import React from 'react';
import "../styles/Navbar.css";
import Logo from "@/Img/Logo/LOGO.png";
import Image from 'next/image';
import Link from "next/link";

const Navbar = () => {
    return (
        <>
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
                </nav>
            </header>
            <hr />
        </>
    )
}

export default Navbar




// import Link from 'next/link'
// import Image from 'next/image'
// import { Search } from 'lucide-react'

// export default function Navbar() {
//     return (
//         <nav className="bg-white shadow-md">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                             <Image
//                                 src={Logo}
//                                 alt="Logo"
//                                 width={32}
//                                 height={32}
//                             />
//                         </div>
//                         <div className="hidden md:block">
//                             <div className="ml-10 flex items-baseline space-x-4">
//                                 <Link href="/" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
//                                     Home
//                                 </Link>
//                                 <Link href="/about" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
//                                     About
//                                 </Link>
//                                 <Link href="/contact" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
//                                     Contact
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="hidden md:block">
//                         <div className="ml-4 flex items-center md:ml-6">
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                                 </div>
//                                 <input
//                                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                     placeholder="Search"
//                                     type="search"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex items-center">
//                         <h1 className="text-xl font-bold text-gray-900">Website Title</h1>
//                     </div>
//                     <div className="-mr-2 flex md:hidden">
//                         <button type="button" className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
//                             <span className="sr-only">Open main menu</span>
//                             <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                             <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="md:hidden" id="mobile-menu">
//                 <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                     <Link href="/" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
//                         Home
//                     </Link>
//                     <Link href="/about" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
//                         About
//                     </Link>
//                     <Link href="/contact" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
//                         Contact
//                     </Link>
//                 </div>
//                 <div className="pt-4 pb-3 border-t border-gray-200">
//                     <div className="px-2">
//                         <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                             </div>
//                             <input
//                                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 placeholder="Search"
//                                 type="search"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }