import Image from "next/image"


const AboutBanner = ()=>{

    return(
        <div className="relative mb-8">
            <div >
              <Image src="/assets/img/new8.jpg" width={400} height={400} quality={100} alt="about us banner" className="w-full h-[55vh] object-fill lg:object-cover lg:-bg-[bottom_100px]" />
            </div>
            <div className="absolute top-0 bg-black/40 text-white w-full h-full text-3xl flex justify-center items-center">
              About Us
            </div>
        </div>
    )
}

export default AboutBanner