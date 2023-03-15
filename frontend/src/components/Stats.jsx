import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Stats({list, listType}) {
    const [type, setType] = useState(listType);

    let source;
    if(listType === 'top tracks') {
        source = list[0].album.images[0].url;
    }
    else if(listType === 'top artists') {
        source = list[0].images[0].url;
    }
    else if(listType === 'recently played') {
        source = list[0].track.album.images[0].url;
    }

    return (
        <div className='dark:text-white font-dmsans rounded-md xl:w-1/4 lg:w-[30.5%] md:w-[1/4] sm:w-[70%] w-[80%]'>
            <div>
            {(listType === 'recently played') ? (
                <div className='font-dmsans mb-4'>
                    <div className='flex text-lg justify-center'>{listType}</div>
                    <Link 
                    to={list[0].track.external_urls.spotify}
                    className='relative text-center'
                    >
                        <img 
                        className='rounded-md' 
                        src={source} 
                        alt={list[0].track.name}
                        />
                        <div className='text-white absolute left-2 bottom-2 bg-black bg-opacity-40 px-2 py-0.5 rounded-md' >
                            {list[0].track.name.toLowerCase()}</div>
                    </Link>
                </div>) :
                (
                    <div className='font-dmsans mb-4'>
                        <div className='flex text-lg justify-center'>{listType}</div>
                        <Link 
                        to={list[0].external_urls.spotify}
                        className='relative text-center'
                        >
                            <img 
                            className='rounded-md' 
                            src={source} 
                            alt={list[0].name}
                            />
                            <div className='text-white absolute left-2 bottom-2 bg-black bg-opacity-40 px-2 py-0.5 rounded-md'>
                                {list[0].name.toLowerCase()}</div>
                        </Link>
                    </div>
                )}
                
                {(listType === 'top tracks') ? (
                <div className='space-y-4 mb-12'>
                    {list.slice(1).map((l, i) => (
                        <Link 
                        key={i} 
                        to={l.external_urls.spotify}
                        className='hover:bg-white hover:text-black border-black dark:border-white 
                        text-sm lg:text-md xl:text-lg flex items-center space-x-4 border p-4 rounded-md'
                        >
                            <span>{i+2}</span>
                            <img
                            className='min-w-[56px] min-h-[56px] max-h-14 rounded-md' 
                            src={l.album.images[0].url}
                            alt={l.name}
                            />
                            <span>{l.name.toLowerCase()}</span>
                        </Link>
                    ))}
                </div>) :
                ""}
                {(listType === 'top artists') ? (
                <div className='space-y-4 mb-12'>
                    {list.slice(1).map((l, i) => (
                        <Link 
                        key={i} 
                        to={l.external_urls.spotify}
                        className='hover:bg-white hover:text-black border-black dark:border-white 
                        text-sm lg:text-md xl:text-lg flex items-center space-x-4 border p-4 rounded-md'
                        >
                            <span>{i+2}</span>
                            <img
                            className='min-w-[56px] min-h-[56px] max-h-14 rounded-md' 
                            src={l.images[0].url}
                            alt={l.name}
                            />
                            <span>{l.name.toLowerCase()}</span>
                        </Link>
                    ))}
                </div>) :
                ""}
                {(listType === 'recently played') ? (
                <div className='space-y-4 mb-12'>
                    {list.slice(1).map((l, i) => (
                        <Link 
                        key={i} 
                        to={l.track.external_urls.spotify}
                        className='hover:bg-white hover:text-black border-black dark:border-white 
                        text-sm lg:text-md xl:text-lg flex items-center space-x-4 border p-4 rounded-md'
                        >
                            <span>{i+2}</span>
                            <img
                            className='min-w-[56px] min-h-[56px] max-h-14 rounded-md' 
                            src={l.track.album.images[0].url}
                            alt={l.track.name}
                            />
                            <span>{l.track.name.toLowerCase()}</span>
                        </Link>
                    ))}
                </div>) :
                ""}
            </div>
        </div>
    )
}
