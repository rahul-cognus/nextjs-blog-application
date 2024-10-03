
const Heading = ({icon,heading,para}) => {
    return(
        <div className=''>
            <h2 className='text-[#191A1F] text-3xl flex items-center gap-2'>
               {icon}  {heading}
            </h2>
            <p className='text-[#595D69] text-base'>{para}</p>
        </div>
    )
}

export default Heading