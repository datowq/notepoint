export default function SuccessBar({successMessage}) {

    return (
        <div className='bg-green-500 font-dmsans flex justify-center text-white py-2 w-full z-10'>
            {successMessage}
        </div>
    )
}