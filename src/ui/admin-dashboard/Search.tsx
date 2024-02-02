import InputElement from "@/components/Input"
import { Search } from "lucide-react"


const SearchUi = ()=>{

    return(
      <div className="w-full">
         <div className="border-2 rounded-md flex justify-begin h-10">
            <div className="text-slate-600 flex items-center justify-center px-2 hover:cursor-pointer"> 
                <Search strokeWidth={1.5} size={18}/>
            </div>
            <div className="flex items-center justify-center">
               <InputElement className="ring-0 border-none p-0 min-w-[80%]" size={50} />
            </div>
         </div>
      </div>
    )
}

export default SearchUi