import { phoneNumberRegex } from "./contactUsFormSchema";

export const removeCharactersFromString = (str:string, charactersToRemove:string[]) => {
    const regexPattern = new RegExp(`[${charactersToRemove.join('')}]`, 'g');
    return str.replace(regexPattern, '');
  }

export const formatTimeDuration = (time: string)=>{

  if(time.indexOf("seconds") !== -1){
    return time.replace("seconds", "secs")
  }

  if(time.indexOf("minutes") !== -1){
    return time.replace("minutes", "mins")
  }

  if(time.indexOf("hours") !== -1){
    return time.replace("hours", "hrs")
  }

  return time
}


export const validatePhoneNumber = (phoneNumber: string):boolean =>{
  let result:RegExpMatchArray | null = null;
   if(phoneNumber){
     result = phoneNumber.match(phoneNumberRegex)
   }

   if(result){
     return true
   }

   return false
}