import { useState } from "react";
import { Link } from 'react-router-dom';

export default function HistoryStats({list, listType}) {

    const [date, setDate] = useState(new Date());
    const [type, setType] = useState(listType);

    const ds = "" + (date.getMonth() + 1) + date.getDate();
    return (
        <div className='dark:text-white font-dmsans rounded-md xl:w-1/4 lg:w-[30.5%] md:w-[1/4] sm:w-[70%] w-[80%]'>
            <div>
                {(listType === 'top tracks') ? (
                <div>
                    <div className='flex text-lg justify-center'>{listType}</div>
                    <div className='space-y-4 mb-12'>
                        {list.map((l, i) => (
                            <Link 
                            key={i} 
                            to={l.external_urls.spotify}
                            className='hover:bg-white hover:text-black border-black dark:border-white 
                            text-sm lg:text-md xl:text-lg flex items-center space-x-4 border p-4 rounded-md'
                            >
                                <span>{i+1}</span>
                                <img
                                className='min-w-[56px] min-h-[56px] max-h-14 rounded-md' 
                                src={l.album.images[0].url}
                                alt={l.name}
                                />
                                <span>{l.name.toLowerCase()}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                ) : ""}
                {(listType === 'top artists') ? (
                <div>
                    <div className='flex text-lg justify-center'>{listType}</div>
                    <div className='space-y-4 mb-12'>
                        {list.map((l, i) => (
                            <Link 
                            key={i} 
                            to={l.external_urls.spotify}
                            className='hover:bg-white hover:text-black border-black dark:border-white 
                            text-sm lg:text-md xl:text-lg flex items-center space-x-4 border p-4 rounded-md'
                            >
                                <span>{i+1}</span>
                                <img
                                className='min-w-[56px] min-h-[56px] max-h-14 rounded-md' 
                                src={l.images[0].url}
                                alt={l.name}
                                />
                                <span>{l.name.toLowerCase()}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                ) : ""}
                {(listType === 'recently played') ? (
                <div>
                    <div className='flex text-lg justify-center'>{listType}</div>
                    <div className='space-y-4 mb-12'>
                        {list.map((l, i) => (
                            <Link 
                            key={i} 
                            to={l.track.external_urls.spotify}
                            className='hover:bg-white hover:text-black border-black dark:border-white 
                            text-sm lg:text-md xl:text-lg flex items-center space-x-4 border p-4 rounded-md'
                            >
                                <span>{i+1}</span>
                                <img
                                className='min-w-[56px] min-h-[56px] max-h-14 rounded-md' 
                                src={l.track.album.images[0].url}
                                alt={l.track.name}
                                />
                                <span>{l.track.name.toLowerCase()}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                ) : ""}
            </div>
        </div>
    )
}
