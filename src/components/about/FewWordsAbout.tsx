import { CheckCircle, Send, Settings } from "lucide-react";

const FewWordsAboutUs = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col w-full justify-center items-center">
        <header className="text-2xl font-[600] text-black/90 text-center">A Few Words About Us</header>
        <div className="flex justify-center text-center text-slate-600 px-4 md:max-w-[70%] text-[14px]">
        Welcome to McLev Cleaning&#44; your trusted partner in creating cleaner and healthier environments across London&#46; Founded with a passion for meticulous cleaning and customer satisfaction&#44; we are dedicated to delivering exceptional service with every visit&#46;
        </div>
      </div>
      {/* our mission */}
      <div className="flex w-full items-center flex-col my-10">
        <div className="p-6 rounded-full bg-grey-400 mb-4 bg-homegray">
            <Send  className="w-12 h-12 text-green-600" strokeWidth={2.2} />
        </div>
        <div className="font-[600] text-black/80 text-xl">
            Our Mission
        </div>
        <div className="flex justify-center text-center text-[14px] px-4 md:max-w-[70%] text-slate-600">
        To exceed our customers&#39; expectations by providing reliable&#44; high&#45;quality cleaning services tailored to meet individual needs&#46;
        </div>
      </div>
      <div className="flex w-full items-center flex-col my-10">
        <div className="p-6 rounded-full bg-homegray mb-4">
            <CheckCircle  className="w-12 h-12 text-green-600" strokeWidth={2.7} />
        </div>
        <div className="font-[600] text-black/80 text-xl">
            Why Choose Us
        </div>
        <div className="flex justify-center text-center text-[14px] px-4 md:max-w-[70%]">
            <ul className="">
              <li className="text-slate-600 mt-2"><span className="block text-black tracking-wider">Professionalism</span> Our skilled team adheres to the highest standards of professionalism and integrity&#46;</li>
              <li className="text-slate-600 mt-2"><span className="text-black block tracking-wider">Expertise</span> With years of experience&#45; we handle every cleaning task with precision and care&#46;</li>
              <li className="text-slate-600 mt-2"><span className="text-black block tracking-wider">Quality Assurance</span> We use eco-friendly products and proven methods for safe and effective cleaning&#46;</li>
              <li className="text-gray-500 mt-2"><span className="text-black block tracking-wider">Customer Focus</span> Your satisfaction is our priority&#59; we personalize our services to ensure your needs are met&#46;</li>
              <li className="text-slate-600 mt-2"><span className="text-black block tracking-wider">Community Commitment</span> We support sustainability and environmental responsibility in all our practices&#46;</li>
            </ul> 
        </div>
      </div>
      {/* <div className="flex w-full items-center flex-col my-10">
        <div className="p-6 rounded-full bg-grey-400 mb-4 bg-homegray">
            <Settings  className="w-12 h-12 text-green-600" strokeWidth={2.2} />
        </div>
        <div className="font-[600] text-black/80 text-xl">
            What We Do
        </div>
        <div className="flex justify-center text-center text-[14px] px-4 md:max-w-[70%]">
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
            Lorem ipsum dolor sit amet 
        </div>
      </div> */}
    </div>
  );
};

export default FewWordsAboutUs;
