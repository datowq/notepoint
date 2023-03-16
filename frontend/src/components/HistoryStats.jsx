import { useState } from "react";
import { Link } from 'react-router-dom';

export default function HistoryStats({list, listType}) {

    const [date, setDate] = useState(new Date());
    const [type, setType] = useState(listType);

    const ds = "" + (date.getMonth() + 1) + date.getDate();
    return (
        <div className='dark:text-white font-dmsans w-1/3 rounded-md mb-24'>
            <div>
                {(listType === 'top tracks') ? (
                <div>
                    <div className='flex text-lg justify-center'>{listType}</div>
                    <div className='space-y-4 mb-12'>
                        {list.map((l, i) => (
                            <Link 
                            key={l.id} 
                            to={l.external_urls.spotify}
                            className='hover:bg-white hover:text-black border-black dark:border-white flex items-center space-x-4 border p-4 rounded-md'
                            >
                                <span>{i+1}</span>
                                <img
                                className='max-w-14 max-h-14 rounded-md' 
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
                            key={l.id} 
                            to={l.external_urls.spotify}
                            className='hover:bg-white hover:text-black border-black dark:border-white flex items-center space-x-4 border p-4 rounded-md'
                            >
                                <span>{i+1}</span>
                                <img
                                className='max-w-14 max-h-14 rounded-md' 
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
                            key={l.track.id} 
                            to={l.track.external_urls.spotify}
                            className='hover:bg-white hover:text-black border-black dark:border-white flex items-center space-x-4 border p-4 rounded-md'
                            >
                                <span>{i+1}</span>
                                <img
                                className='max-w-14 max-h-14 rounded-md' 
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
