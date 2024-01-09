import Image from 'next/image'

export default function Construction() {
  return (
    <div className="flex flex-col min-h-screen bg-greengray relative justify-center items-center">

      {/* background */}
      <div  className='absolute top-0 left-0 bg-construction w-[100%] h-[100vh] bg-no-repeat bg-center bg-[length:100%_100%] md:bg-[length:70%_100%] opacity-40'>

      </div>

      {/* logo */}
      <div className='absolute top-5 lg:left-5 rounded-full w-24 h-[300px]flex justify-center overflow-hidden'>
         <Image src={"/assets/mclev_logo_transparent.png"} alt="website under construction" width={500} height={500} className='object-fill opacity-100'/>
      </div> 
      
      {/* text */}
      <div className='text-white z-20 w-[100%] flex justify-center'>
        <span className='text-[1.5rem] font-bold text-center md:text-4xl'>THIS WEBSITE IS UNDER CONSTRUCTION</span>
      </div>
    </div>
  )
}
