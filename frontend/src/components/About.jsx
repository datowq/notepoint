import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './About.css'
import 'animate.css';
import testPic from './Assets/notebg1.png';


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
                    Stats</h1>
                    <img src="https://i.pinimg.com/736x/de/58/98/de58983b7724aa1a5ccdbcec4826f3dc.jpg"></img>
                    <p>Learn more about your top songs, artists, albums, and genres!</p>
                </div>
                </div>

        <div className="animate__animated animate__fadeInUp animate__delay-2s">
                <div className="Sec">
                
                <h1>Playlists</h1>
                    <img src="https://media.istockphoto.com/id/1206797502/vector/african-american-man-or-guy-listening-music-sketch-vector-illustration-isolated.jpg?s=612x612&w=0&k=20&c=tcq8ytIJ-YzQ9P599lAEhJxG2Y6RbVeETyXxqAH3KQk="></img>
                    <p>Listen to custom playlists curated from your Spotify listening history!</p>
                </div>
            </div>
                <div className="animate__animated animate__fadeInUp animate__delay-2s">
                <div className="Sec">
                <h1>Share</h1> 
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/teenage-listening-to-music-from-smartphone-and-smiling-2948546-2447313.png"></img>
                    <p>Share your stats and playlists with others so they can learn more about you!</p>
                    </div>
                    </div>
                
            </div>
        </div>
        
    )
}


export default About