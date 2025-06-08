import React from 'react'
import "@/styles/AllBlogs.css";
import Image from "next/image";
import Link from "next/link";

import Windows_VS_Linux from "@/Img/Title/Windows_VS_Linux.png";
import VS_code from "@/Img/Title/VS_Code.png";
import Datatype_P1 from "@/Img/Title/Datatypes_in_python_part_1.png";
import Html from "@/Img/Title/Html.png";
import NextJSOptimization from "@/Img/Title/SeamlessPerformanceOptimizationInNext.js.png";

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
                </div>
                <hr />
                <div className='Row'>
                    <Link href="blogs/Visual_Studio_Code" >
                        <div className='Element'>
                            <Image src={VS_code} alt="error" className='E_IMG' />
                            <h1 className='E_Title'>VS Code the Ultimate Code editor</h1>
                        </div>
                    </Link>
                </div>
                <hr />
                <div className='Row'>
                    <Link href="blogs/Datatypes_in_python_Part_1" >
                        <div className='Element'>
                            <Image src={Datatype_P1} alt="error" className='E_IMG' />
                            <h1 className='E_Title'>Datatypes in python Part 1</h1>
                        </div>
                    </Link>
                </div>
                <hr />
                <div className='Row'>
                    <Link href="blogs/Html" >
                        <div className='Element'>
                            <Image src={Html} alt="error" className='E_IMG' />
                            <div>
                                <h1 className='E_Title'>Html (Hyper Text Markup Language) Beginner-to-Advance</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <hr />
                <div className='Row'>
                    <Link href="blogs/VercelE-commarceTemplateReviews" >
                        <div className='Element'>
                            <Image src={NextJSOptimization} alt="error" className='E_IMG' />
                            <div>
                                <h1 className='E_Title'>Seamless Performance Optimization In Next.js: Master ISR, PPR, and Prefetching</h1>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default page
