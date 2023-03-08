import './info.css'

export default function Info({profile}) {
    return (
        <div className='info'>
            <img className='profilepic'
            src={profile.images[0].url} alt='Profile Picture'/>
            <p className='dark:text-white text-8xl md:text-9xl lg:text-10xl'>
                {profile.display_name}
            </p>
        </div>
    )
}
