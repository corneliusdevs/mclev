import { CheckCircle, Send, Settings } from "lucide-react";

const FewWordsAboutUs = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col w-full justify-center items-center">
        <header className="text-2xl font-[600] text-black/90">A Few Words About Us</header>
        <div className="flex justify-center text-center text-slate-600 max-w-[70%] text-[14px]">
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
        </div>
      </div>
      <div className="flex w-full items-center flex-col my-10">
        <div className="p-6 rounded-full bg-homegray mb-4">
            <CheckCircle  className="w-12 h-12 text-green-600" strokeWidth={2.7} />
        </div>
        <div className="font-[600] text-black/80">
            Why Choose Us
        </div>
        <div className="flex justify-center text-center text-[14px] max-w-[70%]">
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
        </div>
      </div>
      <div className="flex w-full items-center flex-col my-10">
        <div className="p-6 rounded-full bg-grey-400 mb-4 bg-homegray">
            <Send  className="w-12 h-12 text-green-600" strokeWidth={2.2} />
        </div>
        <div className="font-[600] text-black/80">
            Our Mission
        </div>
        <div className="flex justify-center text-center text-[14px] max-w-[70%]">
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
        </div>
      </div>
      <div className="flex w-full items-center flex-col my-10">
        <div className="p-6 rounded-full bg-grey-400 mb-4 bg-homegray">
            <Settings  className="w-12 h-12 text-green-600" strokeWidth={2.2} />
        </div>
        <div className="font-[600] text-black/80">
            What We Do
        </div>
        <div className="flex justify-center text-center text-[14px] max-w-[70%]">
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
        </div>
      </div>
    </div>
  );
};

export default FewWordsAboutUs;
