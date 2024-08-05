import React from 'react';
import "./styles/Home_page.css";
import Image from "next/image";
import Home_1 from "../public/Home_1.jpg";
import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <>
      <Head>
        <NextSeo
          title="GS Tech Info"
          description="The GS_tech-info provides you 100% true information about computers"
          canonical="https://gs-tech-info.vercel.app/"
          openGraph={{
            url: 'https://gs-tech-info.vercel.app/',
            title: 'GS Tech Info',
            description: 'The GS_tech-info provides you 100% true information about computers',
            images: [
              {
                url: 'https://gs-tech-info.vercel.app/LOGO.png',
                width: 800,
                height: 600,
                alt: 'Logo',
                type: 'image/jpeg/png',
              },
            ],
            siteName: 'GS Tech Info',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <meta property="og:url" content="https://gs-tech-info.vercel.app/" />
      </Head>
      <div className='Main'>
        <section className='Left_Section'>
          <h1 className='Main_title'> The GS_tech-info provides you 100% true information about computers</h1>
          <p className='Text'>The GS_tech-info serves you the 100% accurate information about computer technologies, and sky rocket your computer journey</p>
          <Link href="/AllBlogs">
            <button className='Blog_Btn'>Blogs</button>
          </Link>
        </section>
        <section className='Right_Section'>
          <Image src={Home_1} alt="Error" className='Home_1_img' />
        </section>
      </div>
    </>
  )
}

export default Home
