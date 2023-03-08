import './info.css'

export default function Info() {
    return (
        <div className='info'>
            <img className='profilepic'
            src='/bird.jpg' alt='Profile Picture'/>
            <p className='dark:text-white text-8xl md:text-9xl lg:text-10xl'>
                username
            </p>
        </div>
    )
}
