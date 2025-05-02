import React from 'react'
import Banner from "@/Components/Banner";
import "@/styles/Blog.css";
import Note from "@/Components/Note";
import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

const Page = () => {
    return (
        <>
            <Head>
                <NextSeo
                    title="Vercel’s E-commerce Template – My Personal Reviews"
                    description="Beginner-friendly review of Vercel's E-commerce template and advanced features like Caching ISR and Streaming PPR. Explained with clarity, real-world examples, and personal experience from Vercel’s Zoom session."
                    canonical="https://gs-tech-info.vercel.app/blogs/VercelE-commarceTemplateReviews"
                    openGraph={{
                        url: 'https://gs-tech-info.vercel.app/blogs/VercelE-commarceTemplateReviews',
                        title: "Vercel’s E-commerce Template – My Personal Reviews",
                        description: "Clear and beginner-friendly breakdown of Streaming PPR and Caching ISR, written by a 16-year-old passionate developer after attending Vercel's Zoom session.",
                        images: [
                            {
                                url: 'https://gs-tech-info.vercel.app/icon.png',
                                width: 800,
                                height: 600,
                                alt: 'Logo',
                                type: 'image/jpeg/png',
                            },
                        ],
                        site_name: 'GS Tech Info',
                    }}
                    twitter={{
                        handle: '@GS5288667485872',
                        site: '@GS5288667485872',
                        cardType: 'summary_large_image',
                    }}
                />
            </Head>
            {<Banner Title="Vercel's E-commarce Tamplate - My Personal Reviews" />}
            <div className="Main">
                <div className='gridContainer'>
                    <div className='gridItem'>1</div>
                    <div className='gridItem main_content'>
                        <div>
                            {<Note />}
                            <div>
                                <h1><strong>Welcome to Vercel's E-commarce Template Reviews.</strong></h1> <br />
                                <p>I attended the Zoom Session on April 25, 2025. It was "Building best-in-class" ecommarce apps with Next.js.</p> <br />
                                <p>In this Blogpost, I will share all about what I learnt from this session.</p> <br />
                                <p>This is the Part 1</p> <br />
                            </div>
                            <hr /><hr /><br />
                            <div>
                                <h2><strong>Advantages of Next.js in e-commarce websites</strong></h2>
                                <p><strong>Advanced Rendering and Performance Optimizations:</strong></p>
                                <ul className='ul_tag_Privacy'>
                                    <li className='li_tag_privacy'><strong>Caching ISR (Incremental Static Regeneration):</strong> <br /> <div className='LeftMargin'><strong>What is it?</strong> <br /> It is a method of regenerating a static page after it has been built or deployed, either after a specific time or on request. <br /> The main purpose is to update the page with the latest information without needing a full redeployment. <br /><br /> <strong>How does it work?</strong> <br /> It fetches the latest data from the server at specific intervals, automatically regenerates the page, and updates the cached version that users see. <br /><br /> <strong>Why is it useful?</strong> <br /> It provides lightning-fast speeds to dynamic pages. <br /> (Actually, it’s a static page that gets quietly regenerated behind the scenes — for example, every 30 seconds — so users always get updated information without waiting.) <br /> <br /> <strong>When to use it?</strong> <br /> Caching ISR is extremely useful for pages that update frequently, such as e-commerce sites. <br /> (Imagine 100 users buying items daily — without ISR, you’d either manually update the site or use dynamic pages, which slow things down and use more server resources. <br /> Caching ISR gives you the best of both worlds — speed and freshness.)</div></li>
                                    <li className='li_tag_privacy'> <hr /><strong>Streaming PPR</strong> <br /> Streaming PPR is not a single feature, but a combination of technologies in Next.js that enable progressive, performance-driven rendering. It enhances how content is streamed (sent to the client) through techniques like - <br /> <i>Streaming and Partial/Progressive Page Rendering (PPR)</i>. <br /> <br /> <strong>Streaming</strong>  <div className='LeftMargin'><strong>What is it?</strong> <br />In Next.js, streaming is a technique that allows you to progressively send the parts (chunks) of a webpage from the server to the client as soon as they are ready instead of waiting for the entire page to be rendered on the server. This process is often called Streaming Server-Side Rendering. <br /> <strong>How does it work?</strong> <br /> When a user sends a request to a page, Next.js starts rendering components (on the server). If a component needs to perform an asynchronous operation (such as fetching data from the API), then Next.js sends other components to the client (such as headers and footers). The React Suspense Component is the backbone of the Streaming PPR. (Wrap the component that will perform an asynchronous operation inside the suspense boundaries in our page or route.). In simple words, it sends the HTML of a page in parts. Once the asynchronous operation is completed, the server sends the remaining portion (remaining HTML) to the client. </div> <br /> <strong>PPR (Partial Prerendering):</strong> <div className='LeftMargin'><strong>What is it?</strong> <br />In Next.js, PPR is a technique that makes your page static as much as possible to enhance performance while still allowing some parts of the page to be dynamic when needed. (NOTE: Partial prerendering is an experimental feature only; please do not use it in your production). <br /> <strong>How does it work?</strong><br /> Next.js analyzes your React component tree for a given page. It identifies which components are rendered statically or dynamically, then it generates initial HTML for these statically rendered components, and Next.js renders a placeholder (empty spaces) for the dynamic components. The content inside React Suspense boundaries usually forms a placeholder. In simple words, you can create your page as static or dynamic as per your requirement. You don't need to make your page fully static or dynamic.</div> <br /> <strong>How these technologies work together to enhance the performance and user experience?</strong> <br /> First, the Partial/Progressive Prerendering generates the initial HTML of the static component and renders placeholders for dynamic content at build time, and when a user sends the request to access this page, the initial HTML (generated at build time with placeholders for dynamic content) is sent or rendered instantly to the user. At the same time, the server prepares the dynamic data for sending it to the client as soon as it is prepared and sends it progressively to the user, and then Next. JS performs the hydration process (making the page interactive). <br /> <br /> <strong>When should we need to use these techniques?</strong> <br />While you should need to use these techniques when your pages are static and dynamic at the same time, such as on an e-commerce website's products page, there are many components to render, such as images, titles, descriptions, etc. of products. This data is constant, meaning this data does not change frequently or every time you request it, so this is static data, which means you don't need any server-side rendering to render these components. At the same time, the same page contains some dynamic components, such as price, customer reviews, and availability of the product. These are dynamic content; they may change from time to time, so these components need server-side rendering to be rendered. So, it will be beneficial to use Streaming PPR in these types of situations. </li>
                                </ul>
                            </div>
                            <br /> <hr /> <hr /> <br />
                            <div>
                                <p>To know why this blog is published in two parts, <Link className='link_Item' target='_blank' href="/conclusion/WhyThisBlogIsInTwoParts">click here</Link></p> <br />
                            </div>
                        </div>
                    </div>
                    <div className='gridItem'>2</div>
                </div>
            </div>
        </>
    )
}

export default Page
