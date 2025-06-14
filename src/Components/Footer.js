import React from 'react'
import Link from 'next/link'
import "../styles/Footer.css"

const Footer = () => {
    return (
        <>
            <hr />
            <div className='Footer'>
                <div className="logo">
                    <p className='GS_Logo'>GS_tech-info</p>
                </div>
                <div>
                    <div>
                        <ul className='ul_tag'>
                            <li className='li_tag'>
                                <Link className='link' href="/Privacy">Privacy Policy</Link>
                            </li>
                            <li className='li_tag'>
                                <Link className='link' href="/Term_of_service">Terms of Services</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>&copy; 2024</div>
            </div>
            <hr />
        </>
    )
}

export default Footer
