//  this function is used by the admin dashbaord ui to search through arrays supplied to it

import { SearchUiPayload, SearchUiPayloadName } from "@/components/admin-dashboard/types"

export function filterSearchData(dataType:SearchUiPayloadName , dataToBeSearched:SearchUiPayload, searchTerm:string):SearchUiPayload {
    let results:SearchUiPayload = [];
    if(dataType === "feedbacks"){
        results = dataToBeSearched.filter((data, index)=>{
            return data?.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        })
    }else if(dataType === "bookings"){
        results = dataToBeSearched.filter((data, index)=>{
            return data?.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        })

        // search by service name if results is empty
        if(results.length === 0){
            results = dataToBeSearched.filter((data, index)=>{
                return data?.selectedService.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
            })
        }
    }else if(dataType === "adminChats"){
        results = dataToBeSearched.filter((data, index)=>{
            return data?.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        })
    }else{
        return dataToBeSearched
    }
    return results
}