import Image from "next/image"


const PricingBanner = ()=>{

    return(
        <div className="relative mb-8">
            <div >
              <Image src="/assets/img/banner1.jpg" width={400} height={400} alt="about us banner" className="w-full h-[50vh] object-fill lg:object-cover lg:-bg-[bottom_100px]" />
            </div>
            <div className="absolute top-0 bg-black/40 text-white w-full h-full text-3xl flex justify-center items-center">
              Our Pricing
            </div>
        </div>
    )
}

export default PricingBanner