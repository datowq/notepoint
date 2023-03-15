function ErrorBar({errorMessage}) {

    return (
        <div className='bg-red-500 font-dmsans flex justify-center text-white py-2 w-full z-10'>
            {errorMessage}
        </div>
    )
}

export default ErrorBar