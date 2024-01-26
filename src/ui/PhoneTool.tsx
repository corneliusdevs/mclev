import { Phone } from "lucide-react"


const PhoneTool = ()=>{
    return(
        <div className="flex justify-center items-center rounded-full w-14 h-14 bg-secondarycol text-white shadow-md hover:cursor-pointer hover:scale-[1.15] transition-all"
        >
            <Phone className="transform scale-[1.2]"/>
        </div>
    )
}

export default PhoneTool