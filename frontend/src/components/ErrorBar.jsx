function ErrorBar({errorMessage}) {

    return (
        <div className='bg-red-500 text-white py-2 px-3 rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2 w-fit z-10'>
            {errorMessage}
        </div>
    )
}

export default ErrorBar