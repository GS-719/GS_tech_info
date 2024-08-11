import React from 'react';
import CodeBox from '@/app/Components/CodeBox';
import "../../styles/Blog.css";
import Banner from '@/app/Components/Banner';
import Note from '@/app/Components/Note';
import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

const page = () => {

    // Int
    const int = `
        a = 719        # "a" is a variable which contains "719" as an integer.

        b = -786       # "b" is a variable which contains "-786" as an interger.
        
        c, d = 15, 0   # "c" contains "15" and "d" contains "0".
    `

    // bool
    const bool_1 = `
        a = True
        b = False
    `

    // float
    const float = `
        a = 1.2 
        b = -8.9
        c = 0.0
    `

    // String
    const str = `
        a = 'Hello world'
        b = "Hello World"
        c = 'Hello" world'
        d = "Hello' World"
        e = '''Hello World
            this is a "multi-line" string'''
        f = """Hello World
            this is a 'multi-line' string"""
    `

    // List
    const List_1 = `
        a = ["ABC", 719, True, 12.95]
    `
    const List_2 = `
        a = ["ABC", [12, 854]]
    `
    const List_3 = `
        a = ["ABC", 719] # this list contains two elements first is "ABC" 
        as a string and second is 719 as a int.

        # you can access this data by using:
        # a[0] # which means you want to access the first 
        element of list contains by variable "a".

        # use print function
        print(a[0]) # this will print "ABC".
        print(a[1]) # this will print 719.
    `
    const List_4 = `
        a = ["ABC", [12, 854]]
        print(a[1][0]) # it will print 12.
        print(a[1][1]) # it will print 854.
    `

    // Tuple
    const tuple_1 = `
        a = (12, "ABC")
    `
    // Set
    const set_1 = `
        a = {719, "GS"}
    `

    return (
        <>
            <Head>
                <NextSeo
                    title="Datatypes in python"
                    description="What is Datatypes in python?"
                    canonical="https://gs-tech-info.vercel.app/blogs/Datatypes_in_python_part_1"
                    openGraph={{
                        url: 'https://gs-tech-info.vercel.app/blogs/Datatypes_in_python_part_1',
                        title: 'GS Tech Info',
                        description: 'The GS Tech Info provides you 100% true information about computers',
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
            {<Banner Title="DataTypes in Python Part 1" />}
            <div className='main'>
                <div className='gridContainer'>
                    <div className='gridItem'>1</div>
                    <div className='gridItem main_content'>
                        <div>
                            <br />
                            {<Note />}
                            <br />
                            <br />
                            <div>
                                <h1>Datatype in Python</h1>
                                <br />
                                <p>The different - different types of data are called datatypes in programming(python). There are many datatypes in python.</p>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <h2>Table Content.</h2>
                                <div>
                                    <ul className='ul_tag_Privacy'>
                                        <li className='li_tag_privacy'><Link href="#int">int (integer datatype)</Link></li>
                                        <li className='li_tag_privacy'><Link href="#float">float</Link></li>
                                        <li className='li_tag_privacy'><Link href="#str">str (String)</Link></li>
                                        <li className='li_tag_privacy'><Link href="#bool">bool (Boolean)</Link></li>
                                        <li className='li_tag_privacy'><Link href="#list">List</Link></li>
                                        <li className='li_tag_privacy'><Link href="#tuple">Tuple</Link></li>
                                        <li className='li_tag_privacy'><Link href="#set">Set</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id='int'>
                                <h2>int</h2>
                                <br />
                                <p>int is a datatype in python which is used to store numbers in a variable. A interger will be positive, negative or zero. python's int has no maximum or minimum value like other programming languages, means you can store extermely large or small interger. Example:</p>
                                <br />
                                {<CodeBox code={int} />}
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id='float'>
                                <h2>float</h2>
                                <br />
                                <p>float is a datatype in python which is used to store floating point numbers (decimal point numbers) in a variable. It is almost same as int but it can store numbers with decimal point. Example:</p>
                                <br />
                                {<CodeBox code={float} />}
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id='str'>
                                <h2>str</h2>
                                <br />
                                <p>str (string) is a datatype in python which is used to store strings in a variable. Means sting is datatype with can store anything including alphabets, numbers, characteres etc. A string is a immutable, means once a string is created it cannot be changed. when you are trying to change a string it will be create a new string in memory.</p>
                                <p>It represents a sequence of characters enclosed within either single quotes ('), double quotes ("), or triple quotes (''' or """).</p>
                                <br />
                                <p>Example:</p>
                                <br />
                                <ol className='ul_tag_Privacy'>
                                    <p>a = "Hello"</p>
                                    <br />
                                    <p>Where.</p>
                                    <li className='li_tag_privacy'>a is a variable (contains the string).</li>
                                    <li className='li_tag_privacy'>"Hello" is a string.</li>
                                </ol>
                                <p>Their are many way to create a string.</p>
                                <ul className='ul_tag_Privacy'>
                                    <li className='li_tag_privacy'>Single quates string:</li>
                                    <div>
                                        <p className='li_tag_privacy'>a = 'Hello World'</p>
                                        <p className='li_tag_privacy'>You can generate a string including double quates like this:</p>
                                        <p className='li_tag_privacy'>a = 'Hello" World'</p>
                                        <p className='li_tag_privacy'>if you want to add a single quate in a string than you need to create a string with double quates, otherwise this will through an error.</p>
                                    </div>
                                    <li className='li_tag_privacy'>Double quated string:</li>
                                    <div>
                                        <p className='li_tag_privacy'>a = "Hello World"</p>
                                        <p className='li_tag_privacy'>You can  generate a string including single quate like this:</p>
                                        <p className='li_tag_privacy'>a = "Hello' World"</p>
                                        <p className='li_tag_privacy'>if you want to add a double quate in a string than you need to create a string with single quates, otherwise this will through an error.</p>
                                    </div>
                                    <li className='li_tag_privacy'>Multi-line string:</li>
                                    <div>
                                        <p className='li_tag_privacy'>a = '''Hello world this is my string. Hello world this is my string. Hello world this is my string. Hello world this is my string. Hello world this is my string. Hello world this is my string. '''</p>
                                        <p className='li_tag_privacy'>In the above methods you cannot create a string in multiply lines.</p>
                                        <p className='li_tag_privacy'>The multi-line string is only allowed in triple quates no matter it is single to double.</p>
                                    </div>
                                </ul>
                                {<CodeBox code={str} />}
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id='bool'>
                                <h2>Bool</h2>
                                <br />
                                <p>bool is a datatype in python which is used to store truth value in a variable. The truth value is in the form of True or False.</p>
                                <br />
                                {<CodeBox code={bool_1} />}
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id='list'>
                                <h2>List</h2>
                                <br />
                                <p>list is a datatype in python which is used to store multiple types of data in a single variable. A list is <strong>ordered, mutable, and Heterogeneous.</strong>. Square brackets are used to create a list.</p>
                                <br />
                                {<CodeBox code={List_1} />}
                                <br />
                                <p>A list can contains another list called nested list.</p>
                                <br />
                                {<CodeBox code={List_2} />}
                                <br />
                                <p>you can access this list's data using indexing.</p>
                                <br />
                                <ul className='ul_tag_Privacy'>
                                    <li className='li_tag_privacy'><strong>Mutable</strong> a list is Mutable which means you can add, remove or change its elements.</li>
                                    <li className='li_tag_privacy'><strong>Heterogeneous</strong> a list is a Heterogeneous which means it can store different - different types of data in a single variable.</li>

                                    <li className='li_tag_privacy'><strong>Ordered</strong> a list is ordered means you can its elements by the indexing, the indexing is started from 0 and going so on as your list's elements.</li>
                                    {<CodeBox code={List_3} />}
                                    <br />
                                    <p>A list can contains another list called nested list.</p>
                                    <p>You can access these element by using indexing of indexing.</p>
                                    <br />
                                    {<CodeBox code={List_4} />}
                                </ul>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id="tuple">
                                <h2>Tuple</h2>
                                <br />
                                <p>Tuple is a datatype in python which is ordered, indexed, and immutable. it can store  different - different types of data, it is almost same as list but it is immutable and list is mutable.</p>
                                <p>Once a tuple is created you cannot modify it's elements such as add, remove, or change.</p>
                                <p>A tuple is enclosed with round brackes.</p>
                                <ul className='ul_tag_Privacy'>
                                    <li className='li_tag_privacy'><strong>Ordered</strong> a tuple is ordered, which means every element in a tuple is asigned within order.</li>
                                    <li className='li_tag_privacy'><strong>indexed</strong> a tuple is indexed, which means you can access its elements by indexing.</li>
                                    <li className='li_tag_privacy'><strong>immutable</strong> a tuple is immutable, which means you cannot modify (add, remove, or change) its elements after its creation.</li>
                                </ul>
                                <br />
                                <p>Example:</p>
                                {<CodeBox code={tuple_1} />}
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id='set'>
                                <h2>Set:</h2>
                                <br />
                                <p>A set is a datatype in python which is unordered, unchangeable, and unindexed. it can store different-different types of data, it is almost same as list or tuple, with minner differences.</p>
                                <p>A set is enclosed with curly-braceses.</p>
                                <br />
                                <ul className='ul_tag_Privacy'>
                                    <li className='li_tag_privacy'><strong>Unordered</strong> a set is a unordered, which means the elements in a set has no any asigned order</li>
                                    <li className='li_tag_privacy'><strong>Unchangeable</strong> a set is a unchangeable, which means you cannot change the elements of set after its creation.</li>
                                    <li className='li_tag_privacy'><strong>unindexed</strong> a set is a unindexed, which means indexing is not working in the case of set.</li>
                                </ul>
                                <br />
                                <p>Example:</p>
                                {<CodeBox code={set_1} />}
                            </div>

                            <br />
                            <br />
                        </div>
                    </div>
                    <div className='gridItem'>3</div>
                </div>
            </div>
        </>
    )
}

export default page
