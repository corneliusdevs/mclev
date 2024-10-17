import { Button } from "@/components/ui/button";
import { whatsappPhoneNumber } from "@/helpers/siteInfo";
import { Phone, X } from "lucide-react";
import { useState } from "react";

const PhoneTool = () => {
  const [openContactDialog, setOpenContactDialog] = useState<boolean>(false);
  return (
    <div
      className={`flex justify-center items-center rounded-full hover:scale-[1.15] w-14 h-14 bg-secondarycol text-white shadow-md hover:cursor-pointer transition-all z-[100]`}
      onClick={() => {
        window.location.href = `tel:${whatsappPhoneNumber}`;
      }}
    >
      {/* {openContactDialog ? (
        <div className="relative">
          <div
            className="absolute right-[-2px] top-[-3px] text-white flex justify-end"
            onClick={() => {
              setOpenContactDialog((v) => false);
            }}
          >
            <X size={15} />{" "}
          </div>
          <div className="mt-1 w-full">
            <Button variant={"ghost"} className="underline py-0 px-2 text-[16px] hover:bg-secondarycol hover:text-white" 
             onClick={()=>{
                window.location.href = `tel:${whatsappPhoneNumber}`
             }}
            >
              {whatsappPhoneNumber}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="w-full flex justify-center items-center"
          onClick={() => {
            setOpenContactDialog((v) => true);
          }}
        >
          <Phone className="transform scale-[1.2]" />
        </div>
      )} */}

      <div
        className="w-full flex justify-center items-center"
      >
        <Phone className="transform scale-[1.2]" />
      </div>
    </div>
  );
};

export default PhoneTool;
