import React from 'react'
import "../../styles/Blog.css";
import Banner from "../../Components/Banner";
import Note from "../../Components/Note"
import Head from 'next/head';
import { NextSeo } from 'next-seo';

const page = () => {
    return (
        <>
        <Head>
                <NextSeo
                    title="Windows VS Linux"
                    description="Windows VS Linux For Programmers in 2024"
                    canonical="https://gs-tech-info.vercel.app/blogs/window-vs-linux"
                    openGraph={{
                        url: 'https://gs-tech-info.vercel.app/blogs/window-vs-linux',
                        title: 'Windows VS Linux',
                        description: "Windows VS Linux For Programmers in 2024",
                        type: "GS Tech Info Blog Page",
                        images: [
                          {
                            url: 'https://gs-tech-info.vercel.app/icon.png',
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
            </Head>
            {<Banner Title="Windows VS Linux For Programmers in 2024" />}
            <div className='main'>
                <div className='gridContainer'>
                    <div className='gridItem'>1</div>
                    <div className='gridItem main_content'>
                        <div>
                            {<Note />}
                            <p>The operating system is depend on your requirement. There are a lot of points to compare in windows 11 and ubuntu (a type of Linux).	Now we, compare some points of both operating systems.</p>

                            <br />
                            <br />
                            {/* Security */}
                            <h2>Security:</h2>
                            <h3>Linux:</h3>
                            <p>Linux is more secure than windows. because Linux use privilege separation, this separation can separate the user-level and system level-privileges, so user typically have limited privileges So, the system become more secure.</p>
                            <br />
                            <p>Linux use permission based structure So, Linux prevents regular users from performing administrative actions, and each app needs authorization by the superuser (root) before it executed.</p>
                            <br />
                            <h3>Windows:</h3>
                            <p>Virus and treat protection allows user to see when their system was last scanned, if any threats were found, and to run a scan or view protection history. Protection settings includes: Real-time protection, cloud-delivered protection, Tamper protection, and ransomware protection.</p>
                            <br />
                            <p>Window Defender is a next generation antivirus protection solution for windows devices that includes feature like: Microsoft defender smart-screen, windows firewall, bluetooth security, and wifi security.</p>

                            <br />
                            <br />
                            {/* Performance */}
                            <h2>Performance:</h2>
                            <h3>Linux:</h3>
                            <p>Linux is generally faster than windows, because Linux have a light-weight core, a well organized file system, and efficient kernel: Linux have a more efficient file system that can handle a large amount of data without compromising system performance. Linux use Ext4 file system which is more faster than windows default NTFS file system.</p>
                            <br />
                            <h3>Windows:</h3>
                            <p>Windows is slower than Linux, because Linux is light-weight core, organized file system, and efficient kernel: windows use NTFS file system which is slower in certain operations compared to Linux's default Ext4 file system. NTFS file system is mainly designed with features like journaling and encryption, which add overhead.	​	​System updates:	​ windows frequently update its system which can be intrusive and slow down the system.	​	​Security software: 	​Antivirus and anti-malware: windows users often run antivirus and anti-malware programs that  continuously scan for threads consuming CPU and memory resources. Linux, due to its  architecture and lower popularity on the desktop, generally requires less such software, through its not immune to threads.</p>

                            <br />
                            <br />
                            {/* User friendly */}
                            <h2>User Friendly:</h2>
                            <h3>Linux:</h3>
                            <p>Linux is not user friendly, Linux is mostly console based, so may it is hard for beginners to operate.</p>
                            <br />
                            <h3>Windows:</h3>
                            <p>Windows is full of GUI (Graphical User Interface), which makes it easy to use and user friendly, But graphic needs more computation power, and it becomes slower.</p>

                            <br />
                            <br />
                            {/* Cost: */}
                            <h2>Cost:</h2>
                            <h3>Linux</h3>
                            <p>Linux is completely free, because it is open-source and no-one owns it, So no-ones sells it and it becomes completely free to use.</p>
                            <br />
                            <h3>Windows</h3>
                            <p>Windows is expensive, it is owned by Microsoft. without Persolizaition you can use it for free, you can just do your work but you don't able to do custmizations.</p>

                            <br />
                            <br />
                            {/* Conclusion: */}
                            <h2>Conclusion:</h2>
                            <p>If you are a begginer (New in computers), and not familier with computer or programming go with Windows.</p>
                            <br />
                            <p>If you need high security, high performance, and working on a large amount of data, than go with Linux.</p>
                            <br />
                        </div>
                    </div>
                    <div className='gridItem'>3</div>
                </div>
            </div>
            <br />
            <br />
        </>
    )
}

export default page
