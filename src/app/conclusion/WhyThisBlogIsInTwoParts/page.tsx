import React from 'react'
import "@/styles/Blog.css"
import Banner from '@/Components/Banner'

const page = () => {
    return (
        <>
            {<Banner Title="Why Are There Two Parts to This Blog Post?" />}
            <div className='Main'>
                <div className='gridContainer'>
                    <div className='gridItem'>1</div>
                    <div className='gridItem main_content'>
                        <div>
                            <br /><h1>Why Are There Two Parts to This Blog Post?</h1> <br />
                            <p>Actually, I have many responsibilities at the moment. I just finished my 10th standard exams, and now I’m preparing for the Computer Science Diploma (ICD) entrance exam, scheduled for Next Week.</p> <br />
                            <p>After this exam, I’ll begin writing the second part of this blog. I aim to complete and publish it within 10 days.</p> <br />
                            <p>I’m confident about this because I heard the term “Streaming PPR” for the very first time on April 25, 2025, during a Zoom session hosted by Vercel — < br /> and today, just 4 days later, I’m able to explain it with clarity, technical depth, and beginner-friendliness.</p> <br />
                            <p>At the end of the day, I’m just a 16-year-old developer with a lot going on — <br /> but even with exams, projects, and other work going on, I’m still focused on sharing useful knowledge with others.</p> <br />
                            <p>Once the exam is over, I’ll also return to another project that’s very big, very powerful, and almost complete. You’ll see it live soon.</p> <br />
                            <p>So thank you for reading — <br /> See you soon in Part 2! </p> <br />
                        </div>
                    </div>
                    <div className='gridItem'>2</div>
                </div>
            </div>
        </>
    )
}

export default page
