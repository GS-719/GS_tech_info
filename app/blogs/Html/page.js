import React from 'react'
import "../../styles/Blog.css";
import CodeBox from '@/app/Components/CodeBox';
import Banner from "../../Components/Banner";
import Note from "../../Components/Note"
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import h1_tag_paired from '../../../Img/Html/h1_tag_paired.png';
import ul_tag from "../../../Img/Html/ul_tag.png";
import ol_tag from "../../../Img/Html/ol_tag.png";
import table_tag from "../../../Img/Html/table_tag.png";
import form_tag from "../../../Img/Html/form_tag.png";
import heading_tag from "../../../Img/Html/heading_tags.png";

const page = () => {
    const paired_tag = `    h1 to h6 <!-- Heading tags -->

    <h1>GS Tech Info</a>

    <div>
        ....
    </div>

    <p>Hello this is the GS Tech info</P>`;

    const Unpaired_tag = `  <br>\n  <hr>`;

    const heading = `<h1>Hello World</h1>
<h2>Hello World</h2>
<h3>Hello World</h3>
<h4>Hello World</h4>
<h5>Hello World</h5>
<h6>Hello World</h6>`;

    const form = `<h1>Login</h1>
<form>
    <input placeholder="Name" type="Name">
    <br>
    <br>
    <input placeholder="Email" type="email">
    <br>
    <br>
    <button>Login</button>
</form>`;

    const table_tag_e = `<table border>
<tr>
    <th>Name</th>
    <th>Class</th>
    <th>Roll No.</th>
</tr>
<tr>
    <td>GS</td>
    <td>10th</td>
    <td>5</ts>
</tr>
</table>`;

    const ol_li = `<h1>Hardware Components</h1>
<ol>
    <li>CPU</li>
    <li>Ram</li>
    <li>SSD</li>
    <li>Key-board</li>
<ol>`;

    const ul_li = `<h1>Hardware Components</h1>
<ul>
    <li>CPU</li>
    <li>Ram</li>
    <li>SSD</li>
    <li>Key-board</li>
<ul>`;

    const src_attribute = `<img src="img.png"/>         <!-- the image will be rendered -->`;

    const href_attribute = `<a href="https://gs-tech-info.vercel.app"/>GS Tech Info</a>
        <!-- Redirect the user on internet -->
Output:
    GS Tech Info
    
<a href="#id" />ID</a>
        <!-- Link a element or component in a page --> 
Output:
    ID`;

    const Unpaired_tag_1 = `    <p>This is a blog of Html (Hyper Text Markup Language)
Output:
    This is a blog of Html (Hyper Text Markup Language)

And after using <br> tag;

    <p>This is a blog of Html <br> (Hyper Text Markup Language)
Output:
    This is a blog of Html 
    (Hyper Text Markup Language)
`;
    return (
        <>
            {<Banner Title="HTML Beginner To Advance" />}
            <div className='main'>
                <div className='gridContainer'>
                    <div className='gridItem'>1</div>
                    <div className='gridItem main_content'>
                        <div>
                            <hr />
                            {<Note />}
                            <hr />
                            <p>Html refers to Hyper text markup language. It is used for building the structure of a web-page. It is mostly text based language.</p>
                            <br />
                            <h2>Tags in Html</h2>
                            <br />
                            <p>Tags define elements for a webpage like heading, paragraphs, links, forms, images, and more.</p>
                            <p>There are mainly two types of tag in Html</p>
                            <br /><hr />
                            <h3>Paired and Unpaired tags</h3>
                            <br />
                            <h3>Paired Tags</h3>
                            <p>The staring of a tag are writtened in angle brakets and the closing of the tag is forward slash in the staring of tag name.</p>
                            <p>They are always written in openning and closing tag</p>
                            <br />
                            <img src={h1_tag_paired.src} alt="Paired tag Example." className="IMG" />

                            <p>There are many other paired tags such as:</p>
                            <br />
                            {<CodeBox code={paired_tag} />}
                            <hr /><br /><br />
                            <h3>Unpaired tag</h3>
                            <br />
                            <p>Teh tag which is single, means there are no any closing tag and opening tag, there are jsut a single tag (without any pair).</p>
                            <p>For Example:</p>
                            {<CodeBox code={Unpaired_tag} />}
                            <p>There are many few unpaired tags</p>
                            <br />
                            <p>There are no any openning or closing tag, because these tags does not contains any content to render in the browser, they are able to change the output format for more clearty or readablity.</p>
                            <br />
                            <p>Example of the use of br tag</p>
                            {<CodeBox code={Unpaired_tag_1} />}
                            <p>This is the use of unpaired tags.</p>
                            <p>they will provide more readablity to your webpage.</p>
                            <br />
                            <p>The moost of the tags in Html is paired.</p>
                            <hr />
                            <br /><br /><br />
                            <h3>Important tags in Html</h3>
                            <br />
                            <ul className='ul_tag_Privacy'>
                                <li className='li_tag_privacy'>{"<div>"} tag is used to split the webpage's structure. you cannot see direct changes after using the div tag.</li>
                                <li className='li_tag_privacy'>{"<p>"} tag is used to write paragraph. (use always {"<p>"} tag teh most. avoid the using heading tag such as h1-h6). a new paragraphis always starts in a new line.</li>
                                <li className='li_tag_privacy'>{"<a>"} tag is used to create links, you can create links within a page or globally or link a page to another page.<br/>href is teh mose important attribute in htis tag, it is used to provide the address to link a component.<br/>{<CodeBox code={href_attribute}/>}</li>
                                <li className='li_tag_privacy'>{"<img>"} tag in used to insert images in a webpage.<br/>Teh src is teh attribute to provide imgage's address.<br/>Example:<br/>{<CodeBox code={src_attribute}/>}<strong>You need the <i>img.png</i> in your website's root directory.<br/>The <i>img.png</i> is just a file name.</strong></li>
                                <li className='li_tag_privacy'>{"ul"} tag is used to create a unordered list. which means this is a list wiht no numbring or indexing.<br/>{"<ol>"} tag is used to creae a ordered list. which means this is a list with numbring or indexing.<br/>{"<li>"} tag is used to create list-items. It is used in both {"<ul> and <ol>"} tags.<br/><br/><strong>Example: of ul (unordered list)</strong>{<CodeBox code={ul_li} />}<strong>Output:</strong><br/><img src={ul_tag.src} alt='Output example of ul tag'/><br/><strong>Example: of ol (ordered list)</strong><br/>{<CodeBox code={ol_li} />}<strong>Output:</strong><br/>{<img src={ol_tag.src} alt="Output example of ol tag" />}<br/>You can clearly see there is dot in Unordered list, And <br/>Numbers in Ordered list</li>
                                <li className='li_tag_privacy'>{"<table>"} tag is used to create table in Html, {"<th>, <tr> and <td>"} is the child tags of {"<table>"} tag.<br/>{"<th>"} refers to table heading. it is used to create column in table in Html.<br/>{"<tr>"} refers of table row. it is used to create table row.<br/>{"<td>"} refers to table data. it is used to insert data in rows of the table according to the column.<br/>For example:{<CodeBox code={table_tag_e}/>}<strong>Output:</strong><br/>{<img src={table_tag.src} alt="table tag output" />}</li>
                                <li className='li_tag_privacy'>{"<form>"} tag is used to create form such as login form, contact form etc.<br/>{"<input>"} tag is most important and most used tag in form tag. this is used for getting information from the user and use it as we need.<br/>{"<input>"} tag is unpaired tag. Your can use it as a child tag of {"<form>"} but this is not a child of {"<form>"} tag. you can use anywhere you want such as, to create search bar.... etc.<br/>{"<button>"} is a another most important tag in Html. it is used to create button in Html, you can use it as a child component But this is not a child component of {"<form>"} tag. you can use it anywhere you want like {"<input>"} tag.<br/><strong>For Example:</strong>{<CodeBox code={form} />}<strong>Output:</strong><br/>{<img src={form_tag.src} alt="form tag example" />}</li>
                                <li className='li_tag_privacy'><strong>heading tags</strong><br/>Heading tags are used to add heading in Html. There are six types of heading in Html. Every heading has different use and importance. {"<h1> <h2>.......<h6>"}<br/><storng>For Example:</storng>{<CodeBox code={heading} />}<strong>Output:</strong><br/>{<img src={heading_tag.src} alt="heading tags example"/>}</li>
                            </ul>
                            <hr/>
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
