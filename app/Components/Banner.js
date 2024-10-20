import React from 'react'
import "../styles/Banner.css";

const Banner = (props) => {
    return (
        <>
            <main className='Main_Banner'>
                <h1>{props.Title}</h1>
            </main>
        </>
    )
}

export default Banner
