import { BsHourglassTop } from "react-icons/bs"

const Heading = () => {
    return(
        <div className=''>
            <h2 className='text-[#191A1F] text-3xl flex items-center gap-2'>
               <BsHourglassTop />  {`Today's top highlights`}
            </h2>
            <p className='text-[#595D69] text-base'>Latest breaking news, pictures, videos, and special reports</p>
        </div>
    )
}

export default Heading