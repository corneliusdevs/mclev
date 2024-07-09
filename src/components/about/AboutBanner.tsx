import Image from "next/image"


const AboutBanner = ()=>{
    return(
        <div className="relative mb-8">
            <div >
              <Image src="/assets/banner/banner14.jpeg" width={400} height={470} quality={100} alt="about us banner" className="w-full h-[55vh] object-fill" />
            </div>
            <div className="absolute top-0 bg-black/55 text-white w-full h-full text-3xl flex justify-center items-center">
              About Us
            </div>
        </div>
    )
}

export default AboutBanner