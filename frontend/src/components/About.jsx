import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './About.css'
import 'animate.css';
import testPic from './Assets/notebg1.png';
import stats from './Assets/stats3.png';
import playlist from './Assets/weez.png';
import share from './Assets/share.png';



function About () {
    
    return (
        
        <div className="dark:text-white">
             
            <div className="animate__animated animate__fadeIn">
            <div className="Sections">
                <div className="heading"><h1 className="bye">
                    Discover and share your top artists and songs
                </h1> <div className="regbutt">
            <Link to='/register' className='bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md' href='#'>
                Register
            </Link>

            </div></div>
                <div className="aboutimage"><img src={testPic} alt="testPic"/></div>

                </div>

           
            </div>
            
        <div className="Whole">
            
        <div className="animate__animated animate__fadeInUp animate__delay-2s">
            <div className="Sec">
                <h1>
                    stats</h1>
                    <img src={stats} alt="Stats"/>
                    <p>learn more about your top songs, artists, albums, and genres!</p>
                </div>
                </div>

        <div className="animate__animated animate__fadeInUp animate__delay-2s">
                <div className="Sec">
                
                <h1>playlists</h1>
                <img src={playlist} alt="playlists"/>
                    <p>listen to custom playlists curated from your Spotify listening history!</p>
                </div>
            </div>
                <div className="animate__animated animate__fadeInUp animate__delay-2s">
                <div className="Sec">
                <h1>share</h1> 
                <img src={share} alt="Share"/>
                    <p>share your stats and playlists with others so they can learn more about you!</p>
                    </div>
                    </div>
                
            </div>
        </div>
        
    )
}


export default About