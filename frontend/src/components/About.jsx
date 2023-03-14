import { Link } from 'react-router-dom';
import './About.css';
import 'animate.css';
import testPic from './Assets/notebg1.png';
import stats from './Assets/stats3.png';
import playlist from './Assets/weez.png';
import share from './Assets/share.png';

function About () {
    
    return (
        
        <div className="font-dmsans dark:text-white">
             
            <div className="animate__animated animate__fadeIn">
            <div className="flex justify-between  content-start flex-start gap-6">
                <div className=""><h1 className="text-7xl flex-1 mt-6 pr-16 leading-normal	">
                    Discover and share your top artists and songs
                </h1> <div className="pt-16">
            <Link to='/register' className='text-xl bg-gradient-to-r from-peach-200 to-peach-500 text-white px-10 py-6 rounded-md' href='#'>
                Register
            </Link>

            </div></div>
                <div className="gap-10"><img src={testPic} alt="testPic" className='max-h-md max-w-sm	'/></div>

                </div>
           
            </div>
            
        <div className="flex justify-between w-auto h-full gap-20 py-60">
            
        <div className="animate__animated animate__fadeInUp animate__delay-2s">
            <div className="p-0 m-0 text-center w-64 h-64">
                <h1 className='text-5xl'>
                    stats</h1>
                    <img src={stats} alt="Stats" className='py-8'/>
                    <p>learn more about your top songs, artists, albums, and genres!</p>
                </div>
                </div>

        <div className="animate__animated animate__fadeInUp animate__delay-2s ">
                <div className="p-0 m-0 text-center w-64 h-64">
                
                <h1 className='text-5xl'>playlists</h1>
                <img src={playlist} alt="playlists" className='py-8'/>
                    <p>listen to custom playlists curated from your Spotify listening history!</p>
                </div>
            </div>
                <div className="animate__animated animate__fadeInUp animate__delay-2s">
                <div className="p-0 m-0 text-center w-64 h-64">
                <h1 className='text-5xl'>share</h1> 
                <img src={share} alt="Share" className='py-8'/>
                    <p>share your stats and playlists with others so they can learn more about you!</p>
                    </div>
                    </div>
                
            </div>
        </div>
        
    )
}


export default About