import React from 'react'
import "../styles/AllBlogs.css"
import Image from "next/image";
import Windows_VS_Linux from "../../Img/Title/Windows_VS_Linux.png";
import VS_code from "../../Img/Title/VS_code.png";
import Link from "next/link";

const page = () => {
    return (
        <>
            <div className='Main_AllBlogs'>
                <div className='Row'>
                    <Link href="blogs/window-vs-linux" >
                        <div className='Element'>
                            <Image src={Windows_VS_Linux} alt="error" className='E_IMG' />
                            <h1 className='E_Title'>Window VS Linux for programmer in 2024</h1>
                        </div>
                    </Link>
                    <Link href="blogs/Visual_Studio_Code" >
                        <div className='Element'>
                            <Image src={VS_code} alt="error" className='E_IMG' />
                            <h1 className='E_Title'>VS Code the Ultimate Code editor</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default page
