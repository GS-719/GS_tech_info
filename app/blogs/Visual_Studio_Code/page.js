import React from 'react'
import Banner from '@/app/Components/Banner';
import Note from '@/app/Components/Note';
import "../../styles/Blog.css";
import Link from "next/link";
import Auto_Complete from "../../../Img/VS_Code_the_ultimate_editor/Auto_Complete.png";
import Extensions_img from "../../../Img/VS_Code_the_ultimate_editor/Extensions.png";
import Head from 'next/head';
import { NextSeo } from 'next-seo';


// Tabnine
// https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode
// Es7
// https://marketplace.visualstudio.com/items?itemName=rodrigovallades.es7-react-js-snippets

const page = () => {
    return (
        <>
            <Head>
                <NextSeo
                    title="Visual Studio Code"
                    description="Visual Studio Code the ultimate code editor"
                    canonical="https://gs-tech-info.vercel.app/blogs/Visual_Studio_Code"
                    openGraph={{
                        url: 'https://gs-tech-info.vercel.app/blogs/Visual_Studio_Code',
                        title: 'Visual Studio Code',
                        description: "Visual Studio Code the ultimate code editor",
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
            {<Banner Title="Visual Studio Code The Ultimate Code/Text Editor" />}
            <div className='main'>
                <div className='gridContainer'>
                    <div className='gridItem'>1</div>
                    <div className='gridItem main_content'>
                        <div>
                            {<Note />}
                            <p>VS Code (Visual Studio Code) is the best Code/Text editor all the time. This is available for Windows, Linux, MacOS.</p>
                            <br />
                            <p>VS Code is a free, open-source, lightweight, and highly customizable code editor</p>
                            <p>There are a lot of Features in VS Code.</p>
                            <br />
                            <br />
                            <br />
                            <div>
                                <h2>Extensions</h2>
                                <br />
                                <h3>You are able to install Extensions in VS Code.</h3>
                                <br />
                                <p>Extensions helps you to add new or more functionality in VS Code, with these Extensions you are able to sky rocket your work.</p>
                                <p>For Example:</p>
                                <ul className="ul_tag_Privacy">
                                    <li className="li_tag_privacy"><Link href="https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner"><strong>Code Runner</strong></Link> is a Extension helps you to run almost all the programming languages in VS Code.</li>
                                    <li className="li_tag_privacy"><Link href="https://marketplace.visualstudio.com/items?itemName=ms-python.python" target='_blank'><strong>Python</strong></Link> is a Extension provides a functionalityto write python code into VS Code.</li>
                                    <li className="li_tag_privacy"><Link href="https://marketplace.visualstudio.com/items?itemName=rodrigovallades.es7-react-js-snippets" target='_blank'><strong>Es7</strong></Link> helps you to write javascript, javascript react, Typesecript, Typesecript react code. you also create a whole react Component by using this Extension.</li>
                                </ul>
                                <br />
                                <p><strong>To install or add more Extensions:</strong></p>
                                <ol className='paddingLeft'>
                                    <li className='li_tag_privacy'>Go to Extensions tab at the right side of the window.</li>
                                    <li className='li_tag_privacy'>Search for a Extension.</li>
                                    <li className='li_tag_privacy'>Than click on install.</li>
                                    <li className='li_tag_privacy'>Your Extension will be installed.</li>
                                </ol>
                                <img src={Extensions_img.src} alt="Extensions" className="IMG" />
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <h2>Auto Complete</h2>
                                <br />
                                <h3>Auto Complete is very useful feature of VS code.</h3>
                                <br />
                                <p>Auto Complete helps you to Complete the works.</p>
                                <p>you just need to type first some letters and hit enter.</p>
                                <br />
                                <img src={Auto_Complete.src} alt='Auto_Complete' className='IMG' />
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <h2>Terminal</h2>
                                <br />
                                <h3>VS Code have their own terminal.</h3>
                                <br />
                                <p>VS Code have their integreated terminal which runs on the root directory of you project.</p>
                                <p>You do not need any external terminal to run your files.</p>
                                <p>You can use terminal in multiply tabs.</p>
                                <p>You can split your terminal and use side by side.</p>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <h2>Hierachy</h2>
                                <br />
                                <h3>VS Code have their own Hierachy Panel</h3>
                                <p>You are able to create or edit file in Hierachy panel, You do not need to go in file explorer.</p>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <h2>AI Tools</h2>
                                <br />
                                <h3>You can use many AI tools in VS Code</h3>
                                <p>You can increase your productivity by using these AI tools in VS Code.</p>
                                <p>You can add or install AI Tools by install Extensions in your VS Code.</p>
                                <p>Some AI Tools:</p>
                                <ul className='ul_tag_Privacy'>
                                    <li className='li_tag_privacy'><strong>Tabnine AI</strong> It is a free AI Tool. It is very useful for beginners. You can install it from <Link href="https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode">Tabnine AI</Link>. It suggust you code according to your existing code. (if you created a new file you file is empty it suggust some code according to your file name or other opened file in you VS Code.) You just need to press tab from you keyboard on suggested code and your code will be implement. And if you have your own code to write you just ignore this code and write your own code.</li>
                                    <li className='li_tag_privacy'><strong>Black Box AI</strong> It is a free AI Tools which is used to generate code, you needs a internet Connection to use Black Box AI. Just write a prompt to generate Code. you can install it from <Link href="">Black Box AI</Link>. It is just like Chat Gpt but it is specialy designed for generating Code</li>
                                </ul>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <h2>Customization</h2>
                                <br />
                                <h3>The Visual Studio Code Provides a lot of Customization. You can change the whole editor by using these customization.</h3>
                                <ul className='ul_tag_Privacy'>
                                    <li className='li_tag_privacy'>You can change of add new keyboard shortcuts in Visual Studio Code.</li>
                                    <ol className='paddingLeft'>
                                        <li>Click on Settings icon on Bottom left Corner.</li>
                                        <li>Click on keyboard shortcuts</li>
                                        <li>Now can edit or create a keyboard shortcuts</li>
                                    </ol>
                                    <li className='li_tag_privacy'>You can add themes:</li>
                                    <ul className='ul_tag_Privacy'>
                                        <li>For icons:</li>
                                        <p><Link href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme" target='_blank'><strong>Material Icon Theme</strong></Link> is a Extension which provides a nice icons to your file according to file name or Extension</p>
                                        <br />
                                        <li>For Workspace:</li>
                                        <p><Link href="https://marketplace.visualstudio.com/items?itemName=CamilaMartinezBedoya.pro-hacker-theme"><strong>Pro Hacker Theme</strong></Link> is a Extension which gives you the feel like a hacker. It is a dark theme. </p>

                                        <br />
                                        <p>And by default there are many themes are available in Visual Studio Code.</p>
                                    </ul>
                                    <li className='li_tag_privacy'>You can install themes by Extension as many as you want.</li>
                                </ul>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <h2>Flexibility</h2>
                                <br />
                                <h3>VS Code provides Flexibility to you work and user experience.</h3>
                                <ul className='ul_tag_Privacy'>
                                    <li className='li_tag_privacy'>You can create or edit different-different types of files at the same time.</li>
                                    <li className='li_tag_privacy'>You are able to edit a lot of files</li>
                                    <li className='li_tag_privacy'>You can open multiple files side by side, anywhere you want and edit them.</li>
                                    <li className='li_tag_privacy'>You can open files form different-different directories (folders) in a same window.</li>
                                    <li className='li_tag_privacy'>You can open multiple windows in multiple directories (folders) at the same time.</li>
                                </ul>
                            </div>
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
