import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/context';
import 'animate.css';
import testPic from './assets/notebg1.png';
import stats from './assets/stats3.png';
import share from './assets/share.png';
import snapshots from './assets/weez.png';

function About () {

    const { isLoggedIn } = useContext(AuthContext);
    
    return (
        
        <div className="font-dmsans dark:text-white">
             
            <div className="animate__animated animate__fadeIn">
                <div className="flex flex-row justify-between flex-wrap xl:gap-12 lg:gap-9 gap-6">
                    <div>
                        <h1 className="text-5xl max-w-md mt-6 pr-8 leading-normal">
                            discover your top artists and songs 
                        </h1> 
                        <div className="py-8">
                            {!isLoggedIn() && 
                                <Link to='/register' className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md' href='#'>
                                register
                                </Link>
                            }
                        </div>
                    </div>
                    <div className="gap-10">
                        <img src={testPic} alt="testPic" className='max-h-md max-w-sm'/>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-evenly space-between flex-row flex-wrap xl:gap-12 lg:gap-9 gap-6 pt-10 pb-60">
                <div className="animate__animated animate__fadeInUp animate__delay-2s my-20">
                    <div className="text-center w-64 h-64">
                        <h1 className='text-5xl'>stats</h1>
                        <img src={stats} alt="Stats" className='py-8'/>
                        <p>learn more about your top artists and songs on our profile page!</p>
                    </div>
                </div>
                <div className="animate__animated animate__fadeInUp animate__delay-2s my-20">
                    <div className="text-center w-64 h-64">
                        <h1 className='text-5xl'>snapshots</h1>
                        <img src={snapshots} alt="Snapshots" className='py-8'/>
                        <p>store snapshots of your stats to build up a listening history!</p>
                    </div>
                </div>
                <div className="animate__animated animate__fadeInUp animate__delay-2s my-20">
                    <div className="text-center w-64 h-64">
                        <h1 className='text-5xl'>discover</h1> 
                        <img src={share} alt="Search" className='py-8'/>
                        <p>search for new music on our discover page!</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}


export default About