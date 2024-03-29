export default function Info({profile}) {
    return (
        <div className='flex items-center rounded-md justify-center py-4 mb-8'>
            {profile.images.length > 0 && (
                <img className='w-[8rem] h-[8rem] cursor-pointer mr-2 hover:opacity-80 rounded-full'
                src={profile.images[0].url} alt='Profile Picture'/>
            )}
            <div className='ml-2 font-dmsans dark:text-white'>
                <h3 className='text-2xl md:text-3xl lg:text-4xl'>
                    hello,
                </h3>
                <h1 className='font-montserrat text-4xl md:text-5xl lg:text-6xl'>
                    <span className='align-text-top'>
                        <span className='font-montserrat text-2xl mb-5 md:text-3xl lg:text-4xl'>@</span>
                    </span>    
                    {profile.display_name.toLowerCase()}
                </h1>

            </div>
        </div>
    )
}
