import Image from "next/image"


const ServicesBanner = ()=>{

    return(
        <div className="relative mb-8">
            <div >
              <Image src="/assets/services/services1.jpg" width={400} height={400} alt="about us banner" className="w-full h-[70vh] object-fill" />
            </div>
            <div className="absolute top-0 bg-black/50 text-white w-full h-full text-3xl flex justify-center items-center">
              Our Services
            </div>
        </div>
    )
}

export default ServicesBanner